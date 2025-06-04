from flask import Flask

app = Flask(__name__)

@app.route('/')
def home():
    return "Hello from AI Founder Showcase - Minimal Test!"

@app.route('/health')
def health():
    return {"status": "ok", "message": "Application is running"}

# For Vercel, the app variable needs to be available at module level
# No handler function needed 