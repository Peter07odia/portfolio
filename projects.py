def get_projects():
    """
    Returns a list of AI projects to be showcased on the portfolio.
    Each project has:
    - id: Unique identifier for the project
    - title: Project name
    - category: Type of AI project
    - description: Detailed explanation
    - tech_stack: Technologies used
    - highlights: Key features or accomplishments
    - interactive: Whether this project has an interactive demo component
    - demo_type: Type of demo if interactive is True
    """
    projects = [
        {
            "id": "homify-mvp",
            "title": "🏠 Homify MVP - AI-Powered Room Visualization App",
            "category": "AI Mobile Application",
            "description": "A React Native mobile application that transforms room photos using AI-powered two-stage processing. Users can take photos of their rooms and generate both empty room visualizations and styled room transformations with interactive before/after comparison.",
            "tech_stack": ["React Native", "TypeScript", "Expo", "Supabase", "OpenAI DALL-E 2", "n8n", "expo-camera"],
            "highlights": [
                "Two-stage AI processing: empty room generation + styled transformations",
                "8 design styles (Minimal, Modern, Bohemian, Scandinavian, etc.)",
                "Mobile-first experience with native camera integration",
                "Interactive before/after comparison slider with haptic feedback",
                "Real-time workflow automation via n8n",
                "Full-stack architecture: Mobile App → Supabase → n8n → OpenAI DALL-E 2",
                "Target market similar to Home AI (5M+ downloads, 4.6 rating)"
            ],
            "interactive": False,
            "demo_type": "mobile",
            "image_class": "mobile-app-image"
        },
        {
            "id": "e-commerce-fitting-room",
            "title": "E-Commerce Virtual Fitting Room",
            "category": "AI Product Design",
            "description": "AI-powered virtual fitting room application for e-commerce that allows customers to visualize clothing items on their body type without physical try-ons.",
            "tech_stack": ["Python", "React", "AWS", "OpenAI API", "Computer Vision", "Kling API"],
            "highlights": [
                "Realistic garment visualization on different body types",
                "Size recommendation based on user measurements",
                "Integration with e-commerce platforms",
                "Enhanced shopping experience with reduced returns"
            ],
            "interactive": False,
            "demo_type": "carousel",
            "image_class": "ecommerce-image",
            "carousel_images": [
                "colors_features.png",
                "colors_catalog.png",
                "colors_body_scan.png",
                "colors_style_selection.png",
                "colors_app_signup.png"
            ],
            "benefits": [
                "Reduce return rates by up to 40% with accurate virtual try-ons",
                "Increase conversion rates by 25% with personalized fitting",
                "Enhance customer satisfaction with confidence in sizing",
                "Save costs on physical inventory and returns processing",
                "Collect valuable customer data for future product development"
            ],
            "partnership": "We're open to partnerships with fashion retailers, e-commerce platforms, and technology companies. Contact us to explore collaboration opportunities for implementing this technology in your business."
        },
        {
            "id": "smart-gold-choices",
            "title": "Smart Gold Choices - Comprehensive Digital Marketing Ecosystem",
            "category": "Financial Services & Marketing Automation",
            "description": "A full-stack financial services platform with integrated AI-powered content creation and lead generation automation, featuring responsive web design, serverless backend, and multi-platform social media automation for gold IRA investment services.",
            "tech_stack": [
                "HTML5/CSS3/JavaScript",
                "Node.js/Vercel Functions",
                "Firebase Firestore",
                "n8n Automation",
                "OpenAI GPT-4",
                "Perplexity AI",
                "Jina Deep Research",
                "Telegram API",
                "Slack Integration",
                "Progressive Web App"
            ],
            "highlights": [
                "Automated content pipeline with real-time gold market analysis and GPT-4 content generation",
                "Multi-platform social media publishing (LinkedIn, Facebook, X/Twitter) with human approval workflows",
                "AI blog generation system with Telegram triggers and WordPress publishing",
                "Advanced lead capture with Firebase backend and real-time analytics",
                "Progressive Web App with offline capabilities and service worker implementation",
                "Multi-modal AI processing: voice transcription, image analysis, and intelligent content routing",
                "Human-in-the-loop approval system via Slack with content regeneration options"
            ],
            "interactive": False,
            "demo_type": "carousel",
            "image_class": "fintech-image",
            "website_url": "https://www.smartgoldchoices.com",
            "carousel_images": [
                "/static/images/smart-gold-screenshots/website-homepage.png",
                "/static/images/smart-gold-screenshots/n8n-blog-workflow.png", 
                "/static/images/smart-gold-screenshots/workflow-execution.png"
            ]
        },
        {
            "id": "nvidia-vss-safety-analytics",
            "title": "AI-Powered Safety Analytics Engine",
            "category": "Video Analytics & Summarization",
            "description": "A system that taps NVIDIA's Video Search & Summarization (VSS) Agent to scan live CCTV, drone, and body-cam feeds for safety-critical events, deliver natural-language search across archives, and auto-compose concise incident reports for EHS (Environment, Health & Safety) teams.",
            "tech_stack": [
                "NVIDIA VSS API",
                "Python (FastAPI micro-services)",
                "Docker & NVIDIA Container Runtime",
                "Kafka / MQTT (real-time message bus)",
                "PostgreSQL + TimescaleDB (event store)",
                "OpenAI GPT (narrative incident summaries)",
                "Grafana / Prometheus (metrics & alerting)"
            ],
            "highlights": [
                "Real-time detection of slips, PPE violations, near-misses, and restricted-area breaches",
                "Natural-language video search (e.g., worker without hard hat on Line 3 yesterday 14:00-16:00)",
                "Automatic clip trimming and storyboard generation for rapid review",
                "Daily digest reports with risk scoring and remediation suggestions powered by GPT",
                "Scalable edge-to-cloud deployment: run VSS inference at the edge, push only indexed metadata upstream",
                "Role-based dashboard for safety managers, enabling trend charts and regulatory audit exports"
            ],
            "interactive": True,
            "demo_type": "generator",
            "image_class": "api-image"
        },

    ]
    
    return projects
