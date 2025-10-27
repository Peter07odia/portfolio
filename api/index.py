import sys
from pathlib import Path

# Add parent directory to path to import app
sys.path.insert(0, str(Path(__file__).parent.parent))

# Import the Flask app from the root directory
from app import app

# Export the app for Vercel
# Vercel will automatically wrap the WSGI app
app = app
