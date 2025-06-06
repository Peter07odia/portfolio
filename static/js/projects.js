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
                    <p>${bodies[style] || `Here's some information about ${topic}.`}</p>
                    <p>Best regards,<br>Your AI Content Generator</p>
                </div>
            </div>
        `;
    }
    
    // Capitalize first letter of string
    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}

/**
 * Setup project card interactions
 */
function setupProjectCards() {
    console.log('Setting up project cards...');
    const projectCards = document.querySelectorAll('.project-card');
    console.log('Found project cards:', projectCards.length);
    
    projectCards.forEach((card, index) => {
        console.log(`Setting up card ${index + 1}:`, card);
        
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
    });
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