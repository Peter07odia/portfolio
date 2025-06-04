from app import app

# This is the entry point for Vercel's serverless functions
# Vercel will call this function for each request
def handler(event, context):
    return app

# For local development
if __name__ == "__main__":
    app.run(debug=True) 