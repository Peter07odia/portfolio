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
            "id": "ai-agent-assistant",
            "title": "AI Agent Assistant",
            "category": "AI Agent",
            "description": "An autonomous AI agent that assists with complex tasks by breaking them down into manageable steps. The agent can research, synthesize information, and execute tasks with minimal human supervision.",
            "tech_stack": ["Python", "LangChain", "OpenAI API", "Pinecone", "FastAPI"],
            "highlights": [
                "Context-aware task planning and execution",
                "Memory and knowledge management",
                "Autonomous decision-making with human feedback loops",
                "Multi-modal interactions (text, voice, image)"
            ],
            "interactive": True,
            "demo_type": "chat",
            "image_class": "agent-image"
        },
        {
            "id": "llm-fine-tuning",
            "title": "Domain-Specific LLM Adaptation",
            "category": "Language Model",
            "description": "A specialized system for adapting large language models to domain-specific tasks with minimal training data through efficient fine-tuning techniques and prompt engineering.",
            "tech_stack": ["PyTorch", "HuggingFace Transformers", "PEFT", "LoRA", "QLoRA"],
            "highlights": [
                "Parameter-efficient fine-tuning methods",
                "Domain adaptation with < 1000 examples",
                "Advanced prompt engineering framework",
                "95% performance of full fine-tuning at 1% of the cost"
            ],
            "interactive": False,
            "image_class": "llm-image"
        },
        {
            "id": "content-generator",
            "title": "AI Content Studio",
            "category": "Content Generation",
            "description": "An end-to-end solution for creating, editing, and optimizing content across multiple formats using AI. Generates blog posts, social media content, and marketing copy with brand voice consistency.",
            "tech_stack": ["Next.js", "OpenAI API", "Vercel AI SDK", "Tailwind CSS", "PostgreSQL"],
            "highlights": [
                "Consistent brand voice across all generated content",
                "Multi-format content generation (text, images, snippets)",
                "SEO optimization built into generation process",
                "Content performance analytics and improvement suggestions"
            ],
            "interactive": True,
            "demo_type": "generator",
            "image_class": "content-image"
        },
        {
            "id": "conversational-assistant",
            "title": "Specialized Customer Support Bot",
            "category": "Chatbot",
            "description": "An advanced conversational AI that provides technical support for SaaS products. Features context retention, personalized responses, and seamless human handoff capabilities.",
            "tech_stack": ["Python", "Rasa", "TensorFlow", "MongoDB", "WebSockets"],
            "highlights": [
                "Long-context memory for multi-turn conversations",
                "Intent classification with 97% accuracy",
                "Sentiment analysis for customer satisfaction monitoring",
                "Automated escalation protocols to human support"
            ],
            "interactive": True,
            "demo_type": "chat",
            "image_class": "chatbot-image"
        }
    ]
    
    return projects
