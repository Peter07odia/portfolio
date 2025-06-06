// Projects.js - Handles all project-related interactivity

document.addEventListener('DOMContentLoaded', function() {
    // Setup chat demo functionality
    setupChatDemo();
    
    // Setup content generator demo
    setupContentGeneratorDemo();
    
    // Setup project card interactions
    setupProjectCards();
});

/**
 * Setup interactive chat demo for AI agent and chatbot projects
 */
function setupChatDemo() {
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input-field');
    const sendBtn = document.getElementById('send-message-btn');
    
    if (!chatMessages || !chatInput || !sendBtn) return;
    
    // Project-specific welcome messages
    const welcomeMessages = {
        'ai-agent-assistant': "Hello! I'm your AI Agent Assistant. I can help you break down complex tasks into manageable steps. What would you like help with today?",
        'conversational-assistant': "Welcome to the Customer Support Bot. I'm here to help with any technical questions about our SaaS products. How can I assist you today?"
    };
    
    // Track which project demo is currently active
    let activeProjectId = '';
    
    // Listen for demo modal opening
    document.querySelectorAll('.open-demo').forEach(btn => {
        if (btn.getAttribute('data-demo-type') === 'chat') {
            btn.addEventListener('click', function() {
                activeProjectId = this.getAttribute('data-project-id');
                
                // Clear previous chat
                while (chatMessages.firstChild) {
                    chatMessages.removeChild(chatMessages.firstChild);
                }
                
                // Add system message
                addMessage('system', 'Welcome to the interactive demo. This is a simulation of the AI assistant.');
                
                // Add project-specific welcome message
                if (welcomeMessages[activeProjectId]) {
                    setTimeout(() => {
                        addMessage('ai', welcomeMessages[activeProjectId]);
                    }, 500);
                }
            });
        }
    });
    
    // Handle sending messages
    function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;
        
        // Add user message to chat
        addMessage('user', message);
        
        // Clear input
        chatInput.value = '';
        
        // Simulate AI thinking with typing indicator
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'message ai typing-indicator';
        typingIndicator.innerHTML = '<span></span><span></span><span></span>';
        chatMessages.appendChild(typingIndicator);
        
        // Auto-scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Generate response based on active project
        setTimeout(() => {
            // Remove typing indicator
            chatMessages.removeChild(typingIndicator);
            
            let response;
            
            if (activeProjectId === 'ai-agent-assistant') {
                response = generateAgentResponse(message);
            } else if (activeProjectId === 'conversational-assistant') {
                response = generateChatbotResponse(message);
            } else {
                response = "I'm not sure how to respond to that. This is a demo with limited functionality.";
            }
            
            // Add AI response
            addMessage('ai', response);
        }, 1500);
    }
    
    // Send message when send button is clicked
    sendBtn.addEventListener('click', sendMessage);
    
    // Send message when Enter key is pressed
    chatInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Add a message to the chat
    function addMessage(type, text) {
        const messageEl = document.createElement('div');
        messageEl.className = `message ${type}`;
        messageEl.innerHTML = `<p>${text}</p>`;
        chatMessages.appendChild(messageEl);
        
        // Auto-scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Generate AI Agent Assistant response
    function generateAgentResponse(userMessage) {
        const lowerMsg = userMessage.toLowerCase();
        
        // Detect common intents
        if (lowerMsg.includes('help') && lowerMsg.includes('research')) {
            return "I'd be happy to help with research. I'll break this down into steps:<br><br>1. Define the research question<br>2. Identify relevant sources<br>3. Collect and analyze information<br>4. Synthesize findings<br>5. Present conclusions<br><br>What specific topic are you researching?";
        } 
        else if (lowerMsg.includes('plan') || lowerMsg.includes('schedule') || lowerMsg.includes('organize')) {
            return "I can help you plan and organize your tasks. Let me break this down:<br><br>1. Identify all required tasks<br>2. Prioritize based on deadlines and importance<br>3. Estimate time needed for each task<br>4. Allocate resources and schedule<br>5. Set up checkpoints to track progress<br><br>What's the main goal you're trying to achieve?";
        }
        else if (lowerMsg.includes('analyze') || lowerMsg.includes('data')) {
            return "For data analysis, I recommend this approach:<br><br>1. Clarify the questions you want to answer<br>2. Collect and clean the relevant data<br>3. Apply appropriate statistical methods<br>4. Visualize results for better understanding<br>5. Interpret findings and draw conclusions<br><br>What kind of data are you working with?";
        }
        else if (lowerMsg.includes('how') && lowerMsg.includes('work')) {
            return "As an AI Agent Assistant, I work by breaking down complex tasks into manageable steps. I can help with research, planning, analysis, and more. I use context awareness to understand your goals and adapt my approach accordingly. What specific capability would you like to explore?";
        }
        else {
            return "I understand you need assistance with \"" + userMessage + "\". To help effectively, I'll need to break this down into manageable steps. Could you provide more details about what you're trying to accomplish? I can then create a customized plan for you.";
        }
    }
    
    // Generate Customer Support Bot response
    function generateChatbotResponse(userMessage) {
        const lowerMsg = userMessage.toLowerCase();
        
        // Detect common support queries
        if (lowerMsg.includes('password') || lowerMsg.includes('reset') || lowerMsg.includes('forgot')) {
            return "I can help you reset your password. Please follow these steps:<br><br>1. Go to the login page<br>2. Click on \"Forgot Password\"<br>3. Enter your email address<br>4. Check your email for reset instructions<br>5. Create a new secure password<br><br>Is there anything else you need help with?";
        } 
        else if (lowerMsg.includes('billing') || lowerMsg.includes('payment') || lowerMsg.includes('invoice')) {
            return "For billing inquiries, you can:<br><br>1. Access your billing dashboard from your account settings<br>2. View all past invoices and payment history<br>3. Update payment methods if needed<br>4. Set up automatic payments<br><br>Would you like me to connect you with our billing department for specific questions?";
        }
        else if (lowerMsg.includes('feature') || lowerMsg.includes('how to') || lowerMsg.includes('use')) {
            return "I'd be happy to help you learn how to use our features. Our product includes:<br><br>• Automated workflows<br>• Data visualization tools<br>• Team collaboration spaces<br>• Custom integrations<br><br>Which specific feature would you like to learn more about?";
        }
        else if (lowerMsg.includes('bug') || lowerMsg.includes('issue') || lowerMsg.includes('not working')) {
            return "I'm sorry to hear you're experiencing an issue. Let me help troubleshoot:<br><br>1. Could you describe exactly what's happening?<br>2. What browser and device are you using?<br>3. Have you tried clearing your cache?<br><br>If the problem persists, I can escalate this to our technical support team.";
        }
        else {
            return "Thank you for your question. Based on my understanding, you're asking about \"" + userMessage + "\". I'll do my best to assist, but may need additional information. Could you provide more details so I can better help you?";
        }
    }
}

/**
 * Setup interactive content generator demo
 */
function setupContentGeneratorDemo() {
    const generateBtn = document.getElementById('generate-content-btn');
    const contentOutput = document.getElementById('generated-content');
    const contentType = document.getElementById('content-type');
    const contentTopic = document.getElementById('content-topic');
    const contentStyle = document.getElementById('content-style');
    
    if (!generateBtn || !contentOutput || !contentType || !contentTopic || !contentStyle) return;
    
    generateBtn.addEventListener('click', function() {
        const type = contentType.value;
        const topic = contentTopic.value.trim();
        const style = contentStyle.value;
        
        if (!topic) {
            contentOutput.innerHTML = '<p class="error">Please enter a topic to generate content.</p>';
            return;
        }
        
        // Show loading state
        contentOutput.innerHTML = '<p class="loading">Generating content...</p>';
        
        // Simulate generation delay
        setTimeout(() => {
            const generatedContent = generateContent(type, topic, style);
            contentOutput.innerHTML = generatedContent;
        }, 2000);
    });
    
    // Generate different content based on type, topic and style
    function generateContent(type, topic, style) {
        let content = '';
        
        // Generate different content based on type
        switch (type) {
            case 'blog':
                content = generateBlogPost(topic, style);
                break;
            case 'social':
                content = generateSocialPost(topic, style);
                break;
            case 'email':
                content = generateEmail(topic, style);
                break;
            default:
                content = '<p>Content type not supported.</p>';
        }
        
        return content;
    }
    
    // Generate blog post content
    function generateBlogPost(topic, style) {
        const titles = {
            'professional': `The Complete Guide to ${capitalize(topic)}: Best Practices for 2025`,
            'casual': `Let's Talk About ${capitalize(topic)}: What You Need to Know`,
            'enthusiastic': `${capitalize(topic)} is Revolutionizing the Industry! Here's Why It Matters`,
            'informative': `Understanding ${capitalize(topic)}: A Comprehensive Analysis`
        };
        
        const intros = {
            'professional': `In today's rapidly evolving landscape, ${topic} has become increasingly important for organizations seeking to maintain a competitive edge. This article explores the key aspects of ${topic} and provides actionable insights for implementation.`,
            'casual': `Hey there! Ever wondered about ${topic}? It's been on my mind lately, and I thought we could explore it together. Let's dive into what makes ${topic} so interesting.`,
            'enthusiastic': `Wow! ${capitalize(topic)} is changing EVERYTHING! 🚀 If you haven't been paying attention to this game-changing development, you're missing out on something truly revolutionary!`,
            'informative': `${capitalize(topic)} represents a significant development in its field. This article aims to provide a balanced and thorough examination of ${topic}, its applications, and implications.`
        };
        
        // Create the blog structure
        return `
            <h2>${titles[style] || `The Guide to ${capitalize(topic)}`}</h2>
            <p>${intros[style] || `An introduction to ${topic}.`}</p>
            <h3>Key Points to Consider</h3>
            <ul>
                <li>Understanding the fundamentals of ${topic}</li>
                <li>How ${topic} impacts current industry standards</li>
                <li>Implementing ${topic} effectively in your strategy</li>
                <li>Measuring the success of your ${topic} initiatives</li>
            </ul>
            <p>This is a simulated preview of a full blog post about ${topic} in a ${style} tone.</p>
        `;
    }
    
    // Generate social media post content
    function generateSocialPost(topic, style) {
        const posts = {
            'professional': `New insights on #${topic.replace(/\s+/g, '')}: Our research indicates that implementing strategic approaches to ${topic} can yield significant organizational benefits. Learn more in our latest white paper (link in bio). #Innovation #Strategy`,
            'casual': `Just thinking about ${topic} today... 💭 Anyone else find this fascinating? Drop your thoughts in the comments! #${topic.replace(/\s+/g, '')} #JustCurious`,
            'enthusiastic': `🔥 GAME CHANGER ALERT! 🔥\n\n${capitalize(topic)} is absolutely TRANSFORMING how we think about everything! I'm so excited to share these incredible insights! 🚀\n\n#${topic.replace(/\s+/g, '')} #MindBlown #NextLevel`,
            'informative': `Did you know? Key facts about ${topic}:\n• It affects 70% of industry processes\n• Early adoption leads to 40% efficiency gains\n• Implementation requires careful planning\n\nLearn more at our upcoming webinar. #${topic.replace(/\s+/g, '')} #FactBased`
        };
        
        return `<div class="social-post">${posts[style] || `A post about ${topic}.`}</div>`;
    }
    
    // Generate email content
    function generateEmail(topic, style) {
        const subjects = {
            'professional': `Strategic Implementation of ${capitalize(topic)} - New Opportunities`,
            'casual': `Let's chat about ${topic} - Your thoughts?`,
            'enthusiastic': `🚀 Revolutionary insights about ${capitalize(topic)} you can't afford to miss!`,
            'informative': `Analysis: ${capitalize(topic)} and Its Impact on Industry Standards`
        };
        
        const greetings = {
            'professional': `Dear Valued Partner,`,
            'casual': `Hey there,`,
            'enthusiastic': `Hello amazing team!`,
            'informative': `Good day,`
        };
        
        const bodies = {
            'professional': `I am reaching out to discuss the strategic implementation of ${topic} within your organization. Our research suggests that companies implementing structured ${topic} strategies have seen notable improvements in operational efficiency and market positioning.`,
            'casual': `I've been thinking about ${topic} lately and wanted to get your take on it. It seems like there's a lot of interesting angles we could explore together.`,
            'enthusiastic': `I'm BEYOND EXCITED to share these game-changing insights about ${topic} with you! This is absolutely transforming how forward-thinking companies are approaching their strategies!`,
            'informative': `This communication aims to provide you with a comprehensive analysis of ${topic} and its implications for standard industry practices. The data suggests several key considerations that merit attention.`
        };
        
        // Create the email structure
        return `
            <div class="email-preview">
                <div class="email-header">
                    <p><strong>Subject:</strong> ${subjects[style] || `Information about ${topic}`}</p>
                </div>
                <div class="email-body">
                    <p>${greetings[style] || `Hello,`}</p>
                    <p>${bodies[style] || `This is an email about ${topic}.`}</p>
                    <p>I've prepared a detailed overview that I believe will be valuable for your strategic planning. Would you be available for a brief discussion next week to explore how these insights might apply to your specific situation?</p>
                    <p>Looking forward to your response.</p>
                    <p>Best regards,<br>AI Content Studio</p>
                </div>
            </div>
        `;
    }
    
    // Helper function to capitalize first letter of each word
    function capitalize(str) {
        return str.replace(/\b\w/g, char => char.toUpperCase());
    }
}

/**
 * Setup mobile phone carousel for Homify project
 */
function setupHomifyCarousel() {
    const carousel = document.getElementById('homify-carousel');
    if (!carousel) return;

    const slides = carousel.querySelectorAll('.phone-screen-slide');
    const prevBtn = document.getElementById('homify-prev');
    const nextBtn = document.getElementById('homify-next');
    
    if (slides.length === 0) return;

    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // Add event listeners for navigation buttons
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }

    console.log('Homify mobile carousel initialized with', slides.length, 'slides');
}

/**
 * Setup project card interactions
 */
function setupProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    const modal = document.getElementById('project-demo-modal');
    const demoTitle = document.getElementById('demo-title');
    let carouselInterval;
    
    projectCards.forEach(card => {
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
            this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.15)';
        });
        
        // Handle "View Details" button click to show project details
        const detailsBtn = card.querySelector('.details-btn');
        if (detailsBtn) {
            detailsBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Get project ID
                const projectId = card.getAttribute('data-project-id');
                
                // Open details modal instead of demo modal
                const detailsModal = document.getElementById('project-details-modal');
                if (!detailsModal) return;
                
                // Find this project in the data
                fetch('/api/projects')
                    .then(response => response.json())
                    .then(projects => {
                        const project = projects.find(p => p.id === projectId);
                        if (!project) return;
                        
                        // Set modal title
                        const detailsTitle = document.getElementById('details-title');
                        if (detailsTitle) {
                            detailsTitle.textContent = project.title;
                        }
                        
                        // Create detailed content for Smart Gold Choices
                        if (projectId === 'smart-gold-choices') {
                            const detailsContent = document.getElementById('project-details-content');
                            detailsContent.innerHTML = `
                                <div class="project-details-header">
                                    <h4>${project.title}</h4>
                                    <p>${project.description}</p>
                                    <div class="project-website">
                                        <a href="https://www.smartgoldchoices.com" target="_blank" class="primary-btn">
                                            <i data-feather="external-link"></i>
                                            Visit Live Website
                                        </a>
                                    </div>
                                </div>
                                
                                <div class="project-details-section">
                                    <h5>Technology Architecture</h5>
                                    <div class="tech-stack-grid">
                                        ${project.tech_stack.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
                                    </div>
                                </div>
                                
                                <div class="project-details-section">
                                    <h5>Key Features & Capabilities</h5>
                                    <ul>
                                        ${project.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
                                    </ul>
                                </div>
                                
                                <div class="project-details-section">
                                    <h5>n8n Automation Workflows</h5>
                                    <div class="workflow-showcase">
                                        <div class="workflow-item">
                                            <h6>Social Media Automation Pipeline</h6>
                                            <div class="workflow-description">
                                                <p>Automated content creation and multi-platform publishing with human approval workflows.</p>
                                                <ul>
                                                    <li>Real-time gold market analysis with Jina Deep Research</li>
                                                    <li>GPT-4 powered content generation for LinkedIn, Facebook, X/Twitter</li>
                                                    <li>Automated image generation with brand consistency</li>
                                                    <li>Slack-based approval system with regeneration options</li>
                                                    <li>Cross-platform publishing with engagement tracking</li>
                                                </ul>
                                            </div>
                                        </div>
                                        
                                        <div class="workflow-item">
                                            <h6>Blog Content Automation System</h6>
                                            <div class="workflow-description">
                                                <p>Telegram-triggered multi-modal content processing with automated WordPress publishing.</p>
                                                <ul>
                                                    <li>Voice transcription and image analysis via OpenAI APIs</li>
                                                    <li>Perplexity AI integration for market research and SEO optimization</li>
                                                    <li>Automated WordPress publishing with metadata and featured images</li>
                                                    <li>Multi-modal input processing (voice, image, text)</li>
                                                    <li>Intelligent content routing and formatting</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="project-details-section">
                                    <h5>Technical Implementation</h5>
                                    <div class="implementation-grid">
                                        <div class="implementation-item">
                                            <h6>Frontend & Web Platform</h6>
                                            <ul>
                                                <li>Responsive financial services website with mobile-first design</li>
                                                <li>Progressive Web App with service worker caching</li>
                                                <li>Multi-page architecture with advanced form validation</li>
                                                <li>Exit intent popups and lead capture optimization</li>
                                            </ul>
                                        </div>
                                        
                                        <div class="implementation-item">
                                            <h6>Backend Infrastructure</h6>
                                            <ul>
                                                <li>Serverless Vercel Functions for API endpoints</li>
                                                <li>Firebase Firestore for real-time lead data storage</li>
                                                <li>Environment variable management for secure credentials</li>
                                                <li>CORS configuration and API key authentication</li>
                                            </ul>
                                        </div>
                                        
                                        <div class="implementation-item">
                                            <h6>AI Integration Stack</h6>
                                            <ul>
                                                <li>OpenAI GPT-4o for content generation and image analysis</li>
                                                <li>Perplexity AI for real-time market research</li>
                                                <li>Jina Deep Research for comprehensive market analysis</li>
                                                <li>Multi-modal processing with intelligent content routing</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="project-details-section">
                                    <h5>Business Impact & Metrics</h5>
                                    <div class="metrics-grid">
                                        <div class="metric-item">
                                            <span class="metric-number">12hr</span>
                                            <span class="metric-label">Automated Content Cycles</span>
                                        </div>
                                        <div class="metric-item">
                                            <span class="metric-number">4</span>
                                            <span class="metric-label">Publishing Platforms</span>
                                        </div>
                                        <div class="metric-item">
                                            <span class="metric-number">Multi-Modal</span>
                                            <span class="metric-label">AI Processing</span>
                                        </div>
                                        <div class="metric-item">
                                            <span class="metric-number">Real-Time</span>
                                            <span class="metric-label">Lead Analytics</span>
                                        </div>
                                    </div>
                                </div>
                            `;
                        } else {
                            // Default details for other projects
                            const detailsContent = document.getElementById('project-details-content');
                            detailsContent.innerHTML = `
                                <div class="project-details-header">
                                    <h4>${project.title}</h4>
                                    <p>${project.description}</p>
                                </div>
                                
                                <div class="project-details-section">
                                    <h5>Technology Stack</h5>
                                    <div class="tech-stack-grid">
                                        ${project.tech_stack.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
                                    </div>
                                </div>
                                
                                <div class="project-details-section">
                                    <h5>Key Features</h5>
                                    <ul>
                                        ${project.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
                                    </ul>
                                </div>
                                
                                ${project.benefits ? `
                                <div class="project-details-section">
                                    <h5>Business Benefits</h5>
                                    <ul>
                                        ${project.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
                                    </ul>
                                </div>
                                ` : ''}
                                
                                ${project.partnership ? `
                                <div class="project-details-section">
                                    <h5>Partnership Opportunities</h5>
                                    <p>${project.partnership}</p>
                                </div>
                                ` : ''}
                            `;
                        }
                        
                        // Show the details modal
                        detailsModal.classList.add('active');
                        document.body.style.overflow = 'hidden';
                        
                        // Re-initialize feather icons for the new content
                        if (typeof feather !== 'undefined') {
                            feather.replace();
                        }
                    })
                    .catch(error => {
                        console.error('Error loading project details:', error);
                    });
            });
        }
    });
    
    // Setup carousel functionality
    function setupCarousel(images, autoSlideOnly = false) {
        const carouselSlide = document.getElementById('carousel-slide');
        const carouselIndicators = document.getElementById('carousel-indicators');
        const prevBtn = document.getElementById('carousel-prev');
        const nextBtn = document.getElementById('carousel-next');
        let currentIndex = 0;
        
        // Hide navigation buttons for auto-slide only carousels
        if (autoSlideOnly && prevBtn && nextBtn) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
            carouselIndicators.style.display = 'none';
        } else if (prevBtn && nextBtn) {
            prevBtn.style.display = 'flex';
            nextBtn.style.display = 'flex';
            carouselIndicators.style.display = 'flex';
        }
        
        // Clear previous images and indicators
        carouselSlide.innerHTML = '';
        carouselIndicators.innerHTML = '';
        
        // Add images to carousel - ensure they appear
        images.forEach((image, index) => {
            const img = document.createElement('img');
            // Check if the image path includes a full path (like /static/images/...)
            img.src = image.startsWith('/') ? image : `/static/images/ai-gallery/${image}`;
            img.alt = `Project image ${index + 1}`;
            img.className = index === 0 ? 'carousel-image active' : 'carousel-image';
            img.style.maxWidth = '100%';
            img.style.height = 'auto';
            img.style.objectFit = 'contain'; // Ensure image maintains aspect ratio
            img.onerror = () => {
                console.error(`Failed to load image: ${image}`);
                // Try to show a fallback or provide visual feedback
                img.style.background = '#333';
                img.style.display = 'flex';
                img.style.alignItems = 'center';
                img.style.justifyContent = 'center';
                img.style.minHeight = '300px';
            };
            img.onload = () => {
                console.log(`Successfully loaded image: ${image}`);
            };
            carouselSlide.appendChild(img);
            
            // Add indicator
            const indicator = document.createElement('span');
            indicator.className = index === 0 ? 'carousel-indicator active' : 'carousel-indicator';
            indicator.addEventListener('click', () => {
                showSlide(index);
            });
            carouselIndicators.appendChild(indicator);
        });
        
        // Function to show a specific slide
        function showSlide(index) {
            const carouselImages = carouselSlide.querySelectorAll('.carousel-image');
            const indicators = carouselIndicators.querySelectorAll('.carousel-indicator');
            
            // Hide all images and deactivate indicators
            carouselImages.forEach(img => img.classList.remove('active'));
            indicators.forEach(ind => ind.classList.remove('active'));
            
            // Show current image and activate indicator
            carouselImages[index].classList.add('active');
            indicators[index].classList.add('active');
            
            currentIndex = index;
        }
        
        // Next button click
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % images.length;
                showSlide(currentIndex);
            });
        }
        
        // Previous button click
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + images.length) % images.length;
                showSlide(currentIndex);
            });
        }
        
        // Auto-slide function
        function autoSlide() {
            currentIndex = (currentIndex + 1) % images.length;
            showSlide(currentIndex);
        }
        
        // Clear any existing interval
        if (carouselInterval) {
            clearInterval(carouselInterval);
        }
        
        // Determine the interval speed based on autoSlideOnly
        const slideInterval = autoSlideOnly ? 3500 : 5000; // Faster for autoSlideOnly
        
        // Start auto-sliding
        carouselInterval = setInterval(autoSlide, slideInterval);
        
        // Pause auto-slide on hover (only if not autoSlideOnly)
        if (!autoSlideOnly) {
            carouselSlide.addEventListener('mouseenter', () => {
                clearInterval(carouselInterval);
            });
            
            // Resume auto-slide on mouse leave
            carouselSlide.addEventListener('mouseleave', () => {
                carouselInterval = setInterval(autoSlide, slideInterval);
            });
        }
        
        // Stop auto-slide when modal is closed
        const closeBtn = modal.querySelector('.close-modal');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                clearInterval(carouselInterval);
            });
        }
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                clearInterval(carouselInterval);
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                clearInterval(carouselInterval);
            }
        });
    }
}

// Add staggered animation to project cards on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add staggered delay based on index
            setTimeout(() => {
                entry.target.classList.add('appear');
            }, index * 100);
            
            // Unobserve after animation is added
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

// Observe each project card
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        observer.observe(card);
    });
});
