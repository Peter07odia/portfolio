import os
import logging
from flask import Flask
from flask_mail import Mail
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase

# Configure logging for debugging
logging.basicConfig(level=logging.DEBUG)

# Create SQLAlchemy base class
class Base(DeclarativeBase):
    pass

# Initialize database
db = SQLAlchemy(model_class=Base)

# Create Flask app
app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "your-development-key")
# Disable template caching
app.config["TEMPLATES_AUTO_RELOAD"] = True
app.jinja_env.auto_reload = True
app.config["SEND_FILE_MAX_AGE_DEFAULT"] = 0  # Prevent browser from caching static files

# Configure database
database_url = os.environ.get("DATABASE_URL")
if database_url:
    # SQLAlchemy expects postgresql:// instead of postgres:// in connection strings
    if database_url.startswith("postgres://"):
        database_url = database_url.replace("postgres://", "postgresql://", 1)
    app.config["SQLALCHEMY_DATABASE_URI"] = database_url
    app.config["SQLALCHEMY_ENGINE_OPTIONS"] = {
        "pool_recycle": 300,
        "pool_pre_ping": True,
    }
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
else:
    # Default to SQLite for production if no DATABASE_URL is provided
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///portfolio.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Configure Flask-Mail (optional, for contact form)
app.config["MAIL_SERVER"] = os.environ.get("MAIL_SERVER", "smtp.gmail.com")
app.config["MAIL_PORT"] = int(os.environ.get("MAIL_PORT", 587))
app.config["MAIL_USE_TLS"] = True
app.config["MAIL_USERNAME"] = os.environ.get("MAIL_USERNAME")
app.config["MAIL_PASSWORD"] = os.environ.get("MAIL_PASSWORD")
app.config["MAIL_DEFAULT_SENDER"] = os.environ.get("MAIL_DEFAULT_SENDER")

# Initialize extensions
db.init_app(app)
mail = Mail(app)

# Import routes after app is initialized to avoid circular imports
from routes import *  # noqa: E402, F401
