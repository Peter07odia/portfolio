from flask import Flask

# Create a minimal Flask app
app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello from AI Founder Showcase! 🚀"

@app.route("/health")
def health():
    return {"status": "healthy", "message": "Flask app is running successfully"}

if __name__ == "__main__":
    app.run(debug=True) 