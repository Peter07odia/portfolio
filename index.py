from app import app

# This is the entry point for Vercel
def handler(request):
    return app(request.environ, request.start_response)

# For Vercel, we need to expose the app
application = app

if __name__ == "__main__":
    app.run(debug=True) 