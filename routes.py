from flask import render_template, request, jsonify, flash, redirect, url_for, session
from app import app, mail, db
from flask_mail import Message
from projects import get_projects
from models import Contact, Project, TechStack, Highlight, Visitor, GalleryImage
from werkzeug.utils import secure_filename
import os
import json
from datetime import datetime

@app.route("/")
def index():
    """Render the home page with all sections"""
    # Track visitor (optional)
    if request.headers.get('X-Forwarded-For'):
        visitor_ip = request.headers.get('X-Forwarded-For').split(',')[0].strip()
    else:
        visitor_ip = request.remote_addr
    
    visitor = Visitor(
        ip_address=visitor_ip,
        user_agent=request.user_agent.string,
        page_visited='home'
    )
    db.session.add(visitor)
    db.session.commit()
    
    # Get fresh project data from the file (to ensure latest changes are shown)
    fresh_projects = get_projects()
    
    # Delete existing projects in the database to force refresh
    Project.query.delete()
    db.session.commit()
    
    # Save fresh projects to database
    for proj in fresh_projects:
        new_project = Project(
            project_id=proj['id'],
            title=proj['title'],
            category=proj['category'],
            description=proj['description'],
            interactive=proj['interactive'],
            demo_type=proj.get('demo_type'),
            image_class=proj.get('image_class')
        )
        
        # Add tech stack
        for tech in proj['tech_stack']:
            new_project.tech_stack.append(TechStack(name=tech))
        
        # Add highlights
        for highlight in proj['highlights']:
            new_project.highlights.append(Highlight(text=highlight))
        
        db.session.add(new_project)
    
    db.session.commit()
    
    # Now fetch the updated projects from database
    db_projects = Project.query.all()
    
    if db_projects:
        projects = []
        for project in db_projects:
            project_dict = {
                'id': project.project_id,
                'title': project.title,
                'category': project.category,
                'description': project.description,
                'interactive': project.interactive,
                'demo_type': project.demo_type,
                'image_class': project.image_class,
                'tech_stack': [tech.name for tech in project.tech_stack],
                'highlights': [highlight.text for highlight in project.highlights]
            }
            projects.append(project_dict)
    else:
        # If no projects in DB, use the static list and save to DB for future use
        projects = get_projects()
        
        # Save projects to database
        for proj in projects:
            # Check if project already exists to avoid duplicates
            existing = Project.query.filter_by(project_id=proj['id']).first()
            if not existing:
                new_project = Project(
                    project_id=proj['id'],
                    title=proj['title'],
                    category=proj['category'],
                    description=proj['description'],
                    interactive=proj['interactive'],
                    demo_type=proj.get('demo_type'),
                    image_class=proj.get('image_class')
                )
                
                # Add tech stack
                for tech in proj['tech_stack']:
                    new_project.tech_stack.append(TechStack(name=tech))
                
                # Add highlights
                for highlight in proj['highlights']:
                    new_project.highlights.append(Highlight(text=highlight))
                
                db.session.add(new_project)
        
        db.session.commit()
    
    return render_template("index.html", projects=projects)

@app.route("/send-message", methods=["POST"])
def send_message():
    """Handle contact form submission"""
    if request.method == "POST":
        name = request.form.get("name")
        email = request.form.get("email")
        message = request.form.get("message")
        
        if not all([name, email, message]):
            flash("Please fill out all fields", "error")
            return redirect(url_for("index", _anchor="contact"))
        
        # Save contact to database
        new_contact = Contact(name=name, email=email, message=message)
        db.session.add(new_contact)
        db.session.commit()
        
        try:
            msg = Message(
                subject=f"Portfolio Contact: {name}",
                recipients=[app.config["MAIL_DEFAULT_SENDER"]],
                body=f"Name: {name}\nEmail: {email}\n\nMessage:\n{message}",
                sender=email
            )
            mail.send(msg)
            flash("Your message has been sent successfully!", "success")
        except Exception as e:
            app.logger.error(f"Error sending email: {e}")
            flash("Your message was saved, but there was an error sending the email notification.", "warning")
        
        return redirect(url_for("index", _anchor="contact"))

@app.route("/admin/messages")
def admin_messages():
    """Admin interface to view contact messages"""
    # This would typically have authentication
    contacts = Contact.query.order_by(Contact.created_at.desc()).all()
    return render_template("admin/messages.html", contacts=contacts)

@app.route("/admin/stats")
def admin_stats():
    """Admin interface to view site statistics"""
    # This would typically have authentication
    visitor_count = Visitor.query.count()
    contact_count = Contact.query.count()
    
    # Count visitors by date
    # This is a simplified example - in production you'd want more advanced analytics
    visitors_by_date = db.session.query(
        db.func.date(Visitor.visit_date).label('date'),
        db.func.count().label('count')
    ).group_by('date').order_by('date').all()
    
    return render_template(
        "admin/stats.html", 
        visitor_count=visitor_count, 
        contact_count=contact_count,
        visitors_by_date=visitors_by_date
    )

@app.route("/gallery")
def gallery():
    """Render the AI image gallery page"""
    # Track visitor
    if request.headers.get('X-Forwarded-For'):
        visitor_ip = request.headers.get('X-Forwarded-For').split(',')[0].strip()
    else:
        visitor_ip = request.remote_addr
    
    visitor = Visitor(
        ip_address=visitor_ip,
        user_agent=request.user_agent.string,
        page_visited='gallery'
    )
    db.session.add(visitor)
    db.session.commit()
    
    # Get gallery images from database
    gallery_images = GalleryImage.query.order_by(GalleryImage.created_at.desc()).all()
    
    # Get unique categories for filter buttons
    categories = db.session.query(GalleryImage.category).distinct().all()
    categories = [category[0] for category in categories]
    
    return render_template("gallery.html", gallery_images=gallery_images, categories=categories)

@app.route("/admin/gallery", methods=["GET", "POST"])
def admin_gallery():
    """Admin interface to manage gallery images"""
    # This would typically have authentication
    if request.method == "POST":
        # Simple validation
        title = request.form.get("title")
        category = request.form.get("category")
        
        if not title or not category or 'image' not in request.files:
            flash("Please fill out all fields and select an image", "error")
            return redirect(url_for("admin_gallery"))
        
        image_file = request.files['image']
        if image_file.filename == '':
            flash("No image selected", "error")
            return redirect(url_for("admin_gallery"))
        
        if image_file:
            # Save the file
            filename = secure_filename(image_file.filename)
            # Ensure unique filename by adding timestamp
            filename = f"{int(datetime.utcnow().timestamp())}_{filename}"
            image_file.save(os.path.join(app.static_folder, 'images/ai-gallery', filename))
            
            # Create new gallery image record
            new_image = GalleryImage(
                filename=filename,
                title=title,
                description=request.form.get("description"),
                category=category,
                tool=request.form.get("tool")
            )
            
            db.session.add(new_image)
            db.session.commit()
            
            flash("Image added to gallery successfully", "success")
            return redirect(url_for("admin_gallery"))
    
    # Get gallery images for display
    gallery_images = GalleryImage.query.order_by(GalleryImage.created_at.desc()).all()
    
    return render_template("admin/gallery.html", gallery_images=gallery_images)

@app.route("/admin/gallery/delete/<int:image_id>", methods=["POST"])
def delete_gallery_image(image_id):
    """Delete a gallery image"""
    # This would typically have authentication
    image = GalleryImage.query.get_or_404(image_id)
    
    try:
        # Delete the image file from the filesystem
        file_path = os.path.join(app.static_folder, 'images/ai-gallery', image.filename)
        if os.path.exists(file_path):
            os.remove(file_path)
        
        # Delete the database record
        db.session.delete(image)
        db.session.commit()
        
        flash("Image deleted successfully", "success")
    except Exception as e:
        app.logger.error(f"Error deleting image: {e}")
        flash("An error occurred while deleting the image", "error")
    
    return redirect(url_for("admin_gallery"))

@app.route("/admin/gallery/bulk-import", methods=["GET", "POST"])
def bulk_import_gallery_images():
    """Bulk import multiple images to gallery"""
    # This would typically have authentication
    if request.method == "POST":
        # Check if any files were provided
        if 'images' not in request.files:
            flash("Please select images to upload", "error")
            return redirect(url_for("bulk_import_gallery_images"))
        
        files = request.files.getlist('images')
        
        # Check if any files were selected
        if not files or files[0].filename == '':
            flash("No images selected", "error")
            return redirect(url_for("bulk_import_gallery_images"))
        
        # Save files to temporary folder for categorization
        temp_files = []
        
        for file in files:
            if file and file.filename != '':
                # Save the file
                filename = secure_filename(file.filename)
                # Ensure unique filename by adding timestamp
                timestamp = int(datetime.utcnow().timestamp())
                unique_filename = f"{timestamp}_{filename}"
                file_path = os.path.join(app.static_folder, 'images/ai-gallery', unique_filename)
                file.save(file_path)
                temp_files.append({
                    'original_name': filename,
                    'unique_name': unique_filename,
                    'path': file_path
                })
        
        if not temp_files:
            flash("No valid images were found in your selection", "error")
            return redirect(url_for("bulk_import_gallery_images"))
            
        # Store temp files in session for categorization step
        session_files = [{
            'original_name': f['original_name'],
            'unique_name': f['unique_name']
        } for f in temp_files]
        
        session['temp_files'] = session_files
        
        return redirect(url_for("categorize_gallery_images"))
    
    return render_template("admin/bulk_import.html")

@app.route("/admin/gallery/categorize", methods=["GET", "POST"])
def categorize_gallery_images():
    """Categorize bulk imported images"""
    # This would typically have authentication
    if 'temp_files' not in session or not session['temp_files']:
        flash("No images found for categorization", "error")
        return redirect(url_for("bulk_import_gallery_images"))
    
    if request.method == "POST":
        # Process categorization form
        successfully_imported = 0
        
        for file_data in session['temp_files']:
            unique_name = file_data['unique_name']
            title = request.form.get(f"title_{unique_name}", "")
            category = request.form.get(f"category_{unique_name}", "")
            description = request.form.get(f"description_{unique_name}", "")
            tool = request.form.get(f"tool_{unique_name}", "")
            
            if title and category:  # Required fields
                # Create new gallery image record
                new_image = GalleryImage(
                    filename=unique_name,
                    title=title,
                    description=description,
                    category=category,
                    tool=tool
                )
                
                db.session.add(new_image)
                successfully_imported += 1
        
        if successfully_imported > 0:
            db.session.commit()
            flash(f"{successfully_imported} images were successfully added to the gallery", "success")
        else:
            flash("No images were imported - please provide at least title and category for each image", "error")
            
        # Clear the session data
        session.pop('temp_files', None)
        
        return redirect(url_for("admin_gallery"))
    
    # Get the temp files from session
    temp_files = session['temp_files']
    
    return render_template("admin/categorize.html", files=temp_files)
