from app import app

# For Vercel, we need to expose the app as 'app'
# This is the entry point that Vercel will use
if __name__ == "__main__":
    app.run(debug=True) 