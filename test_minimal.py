from flask import Flask

app = Flask(__name__)

@app.route('/')
def home():
    return "Hello from AI Founder Showcase - Minimal Test!"

@app.route('/health')
def health():
    return {"status": "ok", "message": "Application is running"}

if __name__ == "__main__":
    app.run(debug=True) 