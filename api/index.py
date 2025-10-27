import sys
import os
from pathlib import Path

# Add parent directory to sys.path so we can import from root
parent_dir = str(Path(__file__).parent.parent)
sys.path.insert(0, parent_dir)

# Change working directory to project root so relative paths work
os.chdir(parent_dir)

# Import the Flask app - Vercel will automatically detect and wrap it with WSGI
from app import app
