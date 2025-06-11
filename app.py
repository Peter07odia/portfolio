import os
import logging
from flask import Flask
from flask_mail import Mail

# Configure logging for debugging
logging.basicConfig(level=logging.DEBUG)

try:
    from flask_sqlalchemy import SQLAlchemy
    from sqlalchemy.orm import DeclarativeBase
    
    # Create SQLAlchemy base class
    class Base(DeclarativeBase):
        pass
    
    # Initialize database
    db = SQLAlchemy(model_class=Base)
    DB_AVAILABLE = True
except ImportError as e:
    logging.warning(f"SQLAlchemy not available: {e}")
    db = None
    DB_AVAILABLE = False

# Create Flask app
app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "your-development-key-12345")

# Disable template caching
app.config["TEMPLATES_AUTO_RELOAD"] = True
app.jinja_env.auto_reload = True
app.config["SEND_FILE_MAX_AGE_DEFAULT"] = 0  # Prevent browser from caching static files

# Configure database only if SQLAlchemy is available
if DB_AVAILABLE:
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
    
    # Initialize database with app
    try:
        db.init_app(app)
    except Exception as e:
        logging.error(f"Database initialization failed: {e}")
        DB_AVAILABLE = False

# Configure Flask-Mail (optional, for contact form)
app.config["MAIL_SERVER"] = os.environ.get("MAIL_SERVER", "smtp.gmail.com")
app.config["MAIL_PORT"] = int(os.environ.get("MAIL_PORT", 587))
app.config["MAIL_USE_TLS"] = True
app.config["MAIL_USERNAME"] = os.environ.get("MAIL_USERNAME")
app.config["MAIL_PASSWORD"] = os.environ.get("MAIL_PASSWORD")
app.config["MAIL_DEFAULT_SENDER"] = os.environ.get("MAIL_DEFAULT_SENDER")

# Initialize extensions
try:
    mail = Mail(app)
except Exception as e:
    logging.warning(f"Mail initialization failed: {e}")
    mail = None

# Import routes after app is initialized to avoid circular imports
try:
    from routes import *  # noqa: E402, F401
except ImportError as e:
    logging.error(f"Failed to import routes: {e}")
    
    # Fallback route
    @app.route('/')
    def fallback_home():
        return """
        <h1>AI Founder Showcase</h1>
        <p>Application is loading...</p>
        <p>Some features may not be available yet.</p>
        """
