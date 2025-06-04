from app import app

# This is required for Vercel deployment
# The app variable needs to be exposed at module level
# For local development
if __name__ == "__main__":
    app.run(debug=True) 