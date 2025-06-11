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
    projects = get_projects()
    
    # Optional: Try to sync with database for analytics, but don't let it affect display
    try:
        # Delete existing projects in the database to force refresh
        Project.query.delete()
        db.session.commit()
        
        # Save fresh projects to database for analytics
        for proj in projects:
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
    except Exception as e:
        app.logger.error(f"Database sync error (continuing with display): {e}")
        # Continue anyway - database sync is optional
    
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


