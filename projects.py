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
            "interactive": True,
            "demo_type": "generator",
            "image_class": "ecommerce-image"
        },
        {
          "id": "content-creating-agent-workflow",
          "title": "Automated Content Agent Pipeline",
          "category": "Workflow Automation",
          "description": "An end‑to‑end n8n workflow that pulls ideas, auto‑generates multimedia content with AI, routes assets to the right platform, and logs performance data for continuous optimization.",
          "tech_stack": [
            "n8n",
            "OpenAI API (text & image endpoints)",
            "Kling AI (video generation)",
            "PiAPI (image→video stitching)",
            "Google Sheets & Drive",
            "JINA AI (Deep Research Agent)",
            "Vercel Serverless Functions",
            "Firebase Firestore (asset/metric store)"
          ],
          "highlights": [
            "Central Idea Queue → triggers AI copywriting & image prompts automatically",
            "Conditional branches for TikTok, Instagram, X, LinkedIn formatting",
            "Webhook‑based Midjourney & PiAPI calls with retry logic and timeout guards",
            "Filename & folder conventions for robust asset management in Drive",
            "Real‑time KPI logging (impressions, CTR) back to Firestore and Sheets",
            "Slack/Discord alerts when a post or render fails, with auto‑re‑queue option",
            "Automated posting to LinkedIn, Instagram, TikTok, and X"
          ],
          "interactive": False,
          "image_class": "workflow-image"
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
        {
            "id": "lead-generation-pipeline",
            "title": "AI-Powered Lead Generation System",
            "category": "Data Automation",
            "description": "An automated pipeline for lead scraping, validation, and enrichment that leverages AI to identify and qualify potential business prospects across various platforms.",
            "tech_stack": ["Python", "SQL", "AWS", "Google Sheets API", "Make.com"],
            "highlights": [
                "Intelligent lead qualification based on multiple criteria",
                "Automated data cleaning and normalization",
                "Email verification and contact information enrichment",
                "CRM integration and campaign tagging"
            ],
            "interactive": False,
            "image_class": "data-image"
        }
    ]
    
    return projects
