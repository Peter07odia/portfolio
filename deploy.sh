#!/bin/bash

# AI Founder Showcase - Deployment Script
# This script helps deploy your portfolio to GitHub and Vercel

echo "🚀 AI Founder Showcase Deployment Script"
echo "========================================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📝 Initializing Git repository..."
    git init
    echo "✅ Git repository initialized"
fi

# Add all files to git
echo "📦 Adding files to Git..."
git add .

# Commit changes
echo "💾 Committing changes..."
read -p "Enter commit message (or press Enter for default): " commit_message
if [ -z "$commit_message" ]; then
    commit_message="Update AI Founder Showcase portfolio"
fi
git commit -m "$commit_message"

# Check if remote origin exists
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "🔗 Setting up GitHub remote..."
    read -p "Enter your GitHub repository URL (e.g., https://github.com/Peter07odia/AiFounderShowcase.git): " repo_url
    git remote add origin "$repo_url"
    echo "✅ GitHub remote added"
fi

# Push to GitHub
echo "⬆️ Pushing to GitHub..."
git branch -M main
git push -u origin main

echo "✅ Successfully pushed to GitHub!"
echo ""
echo "🌐 Next Steps for Vercel Deployment:"
echo "1. Go to https://vercel.com"
echo "2. Sign in with your GitHub account"
echo "3. Click 'New Project'"
echo "4. Import your repository: $(git remote get-url origin)"
echo "5. Configure environment variables:"
echo "   - DATABASE_URL"
echo "   - SESSION_SECRET"
echo "   - MAIL_SERVER, MAIL_USERNAME, MAIL_PASSWORD"
echo "6. Deploy!"
echo ""
echo "📋 Your GitHub repositories:"
echo "• Homify MVP: https://github.com/Peter07odia/homify-mvp"
echo "• Smart Gold Choices: https://github.com/Peter07odia/Smartgoldchoices"
echo "• Colors of Life: https://github.com/Peter07odia/colors-of-life"
echo "• Video Search & Summarization: https://github.com/Peter07odia/video-search-and-summarization"
echo ""
echo "🎉 Deployment preparation complete!" 