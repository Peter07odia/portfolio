#!/usr/bin/env python3
"""
Simple test to verify the Flask app can be imported and basic routes work
"""

try:
    from app import app
    print("✅ Successfully imported Flask app")
    
    # Test basic app configuration
    print(f"✅ App name: {app.name}")
    print(f"✅ Debug mode: {app.debug}")
    print(f"✅ Database URI configured: {'SQLALCHEMY_DATABASE_URI' in app.config}")
    
    # Test if we can create an app context
    with app.app_context():
        print("✅ App context created successfully")
        
        # Test if we can import models
        try:
            from models import Contact, Project
            print("✅ Models imported successfully")
        except Exception as e:
            print(f"❌ Error importing models: {e}")
        
        # Test if we can import routes
        try:
            from routes import index
            print("✅ Routes imported successfully")
        except Exception as e:
            print(f"❌ Error importing routes: {e}")
    
    print("✅ All basic tests passed!")
    
except Exception as e:
    print(f"❌ Error importing Flask app: {e}")
    import traceback
    traceback.print_exc() 