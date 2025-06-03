# AI Founder Showcase Portfolio

> A comprehensive portfolio showcasing AI-powered projects and innovations

![Python](https://img.shields.io/badge/Python-3.9+-blue.svg)
![Flask](https://img.shields.io/badge/Flask-3.0.0-green.svg)
![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black.svg)

## 🚀 Featured Projects

### 1. [Homify MVP - AI-Powered Room Visualization](https://github.com/Peter07odia/homify-mvp)
- **Tech Stack**: React Native, TypeScript, Expo, Supabase, OpenAI DALL-E 2
- **Features**: Two-stage AI processing, 8 design styles, mobile-first experience
- **Highlights**: Interactive before/after comparison, real-time workflow automation

### 2. [Smart Gold Choices - Digital Marketing Ecosystem](https://github.com/Peter07odia/Smartgoldchoices)
- **Tech Stack**: Node.js, Firebase, n8n Automation, OpenAI GPT-4
- **Features**: Automated content pipeline, multi-platform social media publishing
- **Website**: [smartgoldchoices.com](https://www.smartgoldchoices.com)

### 3. [Colors of Life - Virtual Fitting Room](https://github.com/Peter07odia/colors-of-life)
- **Tech Stack**: Python, React, AWS, OpenAI API, Computer Vision
- **Features**: Realistic garment visualization, size recommendations
- **Benefits**: Reduce return rates by 40%, increase conversions by 25%

### 4. [Video Search & Summarization](https://github.com/Peter07odia/video-search-and-summarization)
- **Tech Stack**: NVIDIA VSS API, Python FastAPI, Docker, PostgreSQL
- **Features**: Real-time safety analytics, natural-language video search
- **Use Case**: EHS teams, safety monitoring, incident reporting

## 🛠️ Tech Stack

**Backend**
- **Flask**: Web framework
- **SQLAlchemy**: Database ORM
- **PostgreSQL**: Database
- **Flask-Mail**: Email functionality

**Frontend**
- **HTML5/CSS3**: Modern web standards
- **JavaScript**: Interactive functionality
- **Responsive Design**: Mobile-first approach

**Deployment**
- **Vercel**: Serverless deployment
- **GitHub**: Version control and CI/CD

## 🚀 Quick Start

### Local Development

```bash
# Clone the repository
git clone https://github.com/Peter07odia/AiFounderShowcase.git
cd AiFounderShowcase

# Create virtual environment
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set environment variables
cp .env.example .env
# Edit .env with your configuration

# Run the application
python app.py
```

### Environment Variables

Create a `.env` file with the following variables:

```env
DATABASE_URL=your_postgresql_database_url
SESSION_SECRET=your_session_secret_key
MAIL_SERVER=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your_email@gmail.com
MAIL_PASSWORD=your_app_password
MAIL_DEFAULT_SENDER=your_email@gmail.com
```

## 🌐 Deployment

### Deploy to Vercel

1. **Connect to GitHub**
   ```bash
   # Push to GitHub
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure environment variables
   - Deploy automatically

3. **Environment Variables in Vercel**
   - Add all variables from your `.env` file
   - Ensure `DATABASE_URL` points to your production database

### Deploy to Other Platforms

**Heroku**
```bash
# Install Heroku CLI and login
heroku create your-app-name
heroku config:set DATABASE_URL=your_db_url
git push heroku main
```

**Railway**
```bash
# Install Railway CLI
railway login
railway init
railway up
```

## 📁 Project Structure

```
AiFounderShowcase/
├── app.py                 # Flask application entry point
├── routes.py              # URL routes and view functions
├── models.py              # Database models
├── projects.py            # Project data and configuration
├── templates/             # HTML templates
│   ├── layout.html        # Base template
│   ├── index.html         # Homepage
│   └── gallery.html       # Project gallery
├── static/                # Static assets (CSS, JS, images)
├── requirements.txt       # Python dependencies
├── vercel.json           # Vercel deployment configuration
└── README.md             # Project documentation
```

## 🎨 Features

- ✅ **Responsive Design**: Works on all devices
- ✅ **Project Showcase**: Interactive project galleries
- ✅ **GitHub Integration**: Direct links to repositories
- ✅ **Contact Form**: Email functionality
- ✅ **SEO Optimized**: Meta tags and structured data
- ✅ **Fast Loading**: Optimized assets and caching

## 🔗 Live Demo

Visit the live portfolio: [Your Vercel URL]

## 📱 Mobile Responsive

The portfolio is fully responsive and optimized for:
- 📱 Mobile devices (320px+)
- 📱 Tablets (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large screens (1440px+)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact

**Peter Odia**
- GitHub: [@Peter07odia](https://github.com/Peter07odia)
- Email: [your-email@example.com]
- LinkedIn: [Your LinkedIn Profile]

---

**Built with ❤️ using Flask, Python, and modern web technologies** 