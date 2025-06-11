def get_projects():
    """
    Returns a list of AI projects to be showcased on the portfolio.
    Each project has:
    - id: Unique identifier for the project
    - title: Project name
    - category: Type of AI project
    - description: Brief explanation
    - tech_stack: Technologies used
    - highlights: Key features or accomplishments
    - interactive: Whether this project has an interactive demo component
    - demo_type: Type of demo if interactive is True
    - images: Primary and carousel images for the project
    """
    projects = [
        {
            "id": "homify-mvp",
            "title": "🏠 Homify MVP - AI-Powered Room Visualization App",
            "category": "AI Mobile Application",
            "description": "A React Native mobile app that transforms room photos using AI-powered two-stage processing. Users take photos and generate styled room transformations with interactive before/after comparison.",
            "tech_stack": ["React Native", "TypeScript", "Expo", "Supabase", "OpenAI DALL-E 2", "n8n"],
            "highlights": [
                "Two-stage AI processing: empty room generation + styled transformations",
                "8 design styles with mobile-first experience and native camera integration"
            ],
            "interactive": False,
            "demo_type": "mobile",
            "images": {
                "primary": "/static/images/homify-screens/homify-home.png",
                "mobile_carousel": [
                    "/static/images/homify-screens/homify-home.png",
                    "/static/images/homify-screens/homify-upload.png",
                    "/static/images/homify-screens/homify-styles.png",
                    "/static/images/homify-screens/homify-processing.png",
                    "/static/images/homify-screens/homify-results.png"
                ]
            },
            "github_url": "https://github.com/Peter07odia/homify-mvp"
        },
        {
            "id": "e-commerce-fitting-room",
            "title": "E-Commerce Virtual Fitting Room",
            "category": "AI Product Design",
            "description": "AI-powered virtual fitting room for e-commerce that allows customers to visualize clothing on their body type without physical try-ons, reducing returns and increasing conversion rates.",
            "tech_stack": ["Python", "React", "AWS", "OpenAI API", "Computer Vision", "Kling API"],
            "highlights": [
                "Realistic garment visualization on different body types",
                "Size recommendation based on user measurements with e-commerce integration"
            ],
            "interactive": False,
            "demo_type": "carousel",
            "images": {
                "primary": "/static/images/project-carousel/try-before-buy.png",
                "carousel": [
                    "/static/images/project-carousel/try-before-buy.png",
                    "/static/images/project-carousel/virtual-models.png",
                    "/static/images/project-carousel/body-scan.png",
                    "/static/images/project-carousel/style-selection.png",
                    "/static/images/project-carousel/signup.png"
                ]
            },
            "github_url": "https://github.com/Peter07odia/colors-of-life"
        },
        {
            "id": "smart-gold-choices",
            "title": "Smart Gold Choices - Digital Marketing Ecosystem",
            "category": "Financial Services & Marketing Automation",
            "description": "A full-stack financial services platform with AI-powered content creation and lead generation automation, featuring responsive design and multi-platform social media automation for gold IRA services.",
            "tech_stack": [
                "HTML5/CSS3/JavaScript",
                "Node.js/Vercel Functions",
                "Firebase Firestore",
                "n8n Automation",
                "OpenAI GPT-4"
            ],
            "highlights": [
                "Automated content pipeline with real-time gold market analysis and GPT-4 generation",
                "Multi-platform social media publishing with human approval workflows"
            ],
            "interactive": False,
            "demo_type": "website",
            "images": {
                "primary": "/static/images/smart-gold-screenshots/smart-gold-homepage.png",
                "carousel": [
                    "/static/images/smart-gold-screenshots/smart-gold-homepage.png",
                    "/static/images/smart-gold-workflows/n8n-automation-workflow.png", 
                    "/static/images/smart-gold-workflows/workflow-executions.png",
                    "/static/images/smart-gold-screenshots/lead-capture-modal.png"
                ]
            },
            "website_url": "https://www.smartgoldchoices.com",
            "github_url": "https://github.com/Peter07odia/Smartgoldchoices"
        },
        {
            "id": "nvidia-vss-safety-analytics",
            "title": "AI-Powered Safety Analytics Engine",
            "category": "Video Analytics & Summarization",
            "description": "A system using NVIDIA's Video Search & Summarization (VSS) Agent to scan live CCTV, drone, and body-cam feeds for safety-critical events and auto-compose incident reports for EHS teams.",
            "tech_stack": [
                "NVIDIA VSS API",
                "Python (FastAPI)",
                "Docker & NVIDIA Container Runtime",
                "PostgreSQL + TimescaleDB",
                "OpenAI GPT"
            ],
            "highlights": [
                "Real-time detection of slips, PPE violations, near-misses, and restricted-area breaches",
                "Natural-language video search and automatic incident report generation"
            ],
            "interactive": True,
            "demo_type": "generator",
            "images": {
                "primary": "placeholder",
                "carousel": []
            },
            "github_url": "https://github.com/Peter07odia/video-search-and-summarization"
        }
    ]
    
    return projects
