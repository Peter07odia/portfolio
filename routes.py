from flask import render_template, request, jsonify, flash, redirect, url_for
from app import app, mail
from flask_mail import Message
from projects import get_projects

@app.route("/")
def index():
    """Render the home page with all sections"""
    projects = get_projects()
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
            flash("There was an error sending your message. Please try again later.", "error")
        
        return redirect(url_for("index", _anchor="contact"))
