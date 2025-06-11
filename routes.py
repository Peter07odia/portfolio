from flask import render_template, request, jsonify, flash, redirect, url_for, session
from app import app, mail, db
from flask_mail import Message
from projects import get_projects
from models import Contact, Project, TechStack, Highlight, Visitor
import os
import json
from datetime import datetime

def ensure_db_tables():
    """Ensure database tables are created"""
    try:
        with app.app_context():
            db.create_all()
    except Exception as e:
        app.logger.error(f"Database initialization error: {e}")

@app.route("/")
def index():
    """Render the home page with all sections"""
    # Ensure database tables exist
    ensure_db_tables()
    
    # Track visitor (optional, with error handling)
    try:
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
    except Exception as e:
        app.logger.error(f"Error tracking visitor: {e}")
    
    # Get fresh project data from the file (to ensure latest changes are shown)
    fresh_projects = get_projects()
    
    try:
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
                # Get the original project data to fetch new properties not in the database yet
                original_project = None
                for proj in fresh_projects:
                    if proj['id'] == project.project_id:
                        original_project = proj
                        break
                
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
                
                # Add additional properties from original projects if they exist
                if original_project:
                    if 'images' in original_project:
                        project_dict['images'] = original_project['images']
                    if 'carousel_images' in original_project:
                        project_dict['carousel_images'] = original_project['carousel_images']
                    if 'benefits' in original_project:
                        project_dict['benefits'] = original_project['benefits']
                    if 'partnership' in original_project:
                        project_dict['partnership'] = original_project['partnership']
                    if 'github_url' in original_project:
                        project_dict['github_url'] = original_project['github_url']
                    if 'website_url' in original_project:
                        project_dict['website_url'] = original_project['website_url']
                
                projects.append(project_dict)
        else:
            # If no projects in DB, use the static list
            projects = fresh_projects
    except Exception as e:
        app.logger.error(f"Database error, falling back to static projects: {e}")
        # If database operations fail, just use the static projects
        projects = fresh_projects
    
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

@app.route("/api/projects")
def api_projects():
    """API endpoint to get all projects with their data"""
    # Get project data from file
    projects_data = get_projects()
    return jsonify(projects_data)


