#!/bin/bash

# Set environment variables for local development
export DATABASE_URL="postgresql://localhost/aifounder_showcase"
export SESSION_SECRET="your-local-development-secret-key"
export FLASK_ENV="development"
export FLASK_DEBUG="True"

# Optional mail configuration (comment out if not using)
# export MAIL_SERVER="smtp.gmail.com"
# export MAIL_PORT="587"
# export MAIL_USERNAME="your-email@gmail.com"
# export MAIL_PASSWORD="your-app-password"
# export MAIL_DEFAULT_SENDER="your-email@gmail.com"

# Add PostgreSQL to PATH
export PATH="/opt/homebrew/opt/postgresql@16/bin:$PATH"

echo "Starting AI Founder Showcase application..."
echo "Database URL: $DATABASE_URL"
echo "Debug mode: $FLASK_DEBUG"

# Activate virtual environment and run the application
source .venv/bin/activate
python main.py 