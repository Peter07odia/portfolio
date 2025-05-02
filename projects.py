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
            "title": "Fashion Tech Virtual Try-On",
            "category": "AI Product Design",
            "description": "AI-powered virtual fitting room application for e-commerce that allows customers to visualize clothing items on their body type without physical try-ons.",
            "tech_stack": ["Python", "React", "AWS", "OpenAI API", "Computer Vision", "Kling AI"],
            "highlights": [
                "Realistic garment visualization on different body types",
                "Size recommendation based on user measurements",
                "Integration with e-commerce platforms",
                "Enhanced shopping experience with style Feed"
            ],
            "interactive": True,
            "demo_type": "generator",
            "image_class": "ecommerce-image"
        },
        {
            "id": "AI-Agents",
            "title": "Automated Media Workflow System",
            "category": "Agentic WorkFlow",
            "description": "A comprehensive Agent system for Generating, refining, and distributing high Quality Content to various social media platforms using Automation and Agents framework Like n8n, and AI models including GPT-1-image, and Kling AI to generate consistent brand-aligned visual content.",
            "tech_stack": ["GPT-1-image API", "LLMs", "JINA DeepSearch", "Kling AI", "n8n"],
            "highlights": [
                "Template-based prompt generation for brand consistency",
                "High Quality content generation on Autopilot",
                "Human in the loop feedback connection with Slack",
                "Batch processing for marketing campaigns"
            ],
            "interactive": False,
            "image_class": "prompt-image"
        },
        {
          "id": "nvidia-vss-safety-analytics",
          "title": "AI‑Powered Safety Analytics Engine",
          "category": "Video Analytics & Summarization",
          "description": "A system that taps NVIDIA’s Video Search & Summarization (VSS) Agent to scan live CCTV, drone, and body‑cam feeds for safety‑critical events, deliver natural‑language search across archives, and auto‑compose concise incident reports for EHS (Environment, Health & Safety) teams.",
          "tech_stack": [
            "NVIDIA VSS API",
            "Python (FastAPI micro‑services)",
            "Docker & NVIDIA Container Runtime",
            "Kafka / MQTT (real‑time message bus)",
            "PostgreSQL + TimescaleDB (event store)",
            "OpenAI GPT (narrative incident summaries)",
            "Grafana / Prometheus (metrics & alerting)"
          ],
          "highlights": [
            "Real‑time detection of slips, PPE violations, near‑misses, and restricted‑area breaches",
            "Natural‑language video search (e.g., “worker without hard hat on Line 3 yesterday 14:00‑16:00”)",
            "Automatic clip trimming and storyboard generation for rapid review",
            "Daily digest reports with risk scoring and remediation suggestions powered by GPT",
            "Scalable edge‑to‑cloud deployment: run VSS inference at the edge, push only indexed metadata upstream",
            "Role‑based dashboard for safety managers, enabling trend charts and regulatory audit exports"
          ]
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
