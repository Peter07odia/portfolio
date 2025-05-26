// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Feather Icons
    feather.replace();
    
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Initialize project carousels
    initializeProjectCarousels();
    
    // Initialize Homify mobile carousel
    setupHomifyCarousel();
    
    // Navigation menu toggle for mobile
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const navItems = navLinks.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
    
    // Header scroll effect
    const header = document.querySelector('.site-header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Account for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Handle flash message dismissal
    const flashMessages = document.querySelectorAll('.flash-message');
    flashMessages.forEach(message => {
        // Auto-dismiss after 5 seconds
        setTimeout(() => {
            message.remove();
        }, 5000);
    });
    
    // Initialize particles for hero section
    initializeParticles();
    
    // Initialize typing effect
    initializeTypingEffect();
    
    // Initialize modal functionality
    initializeModals();
    
    // Auto-focus input in chat demo
    const chatInputField = document.getElementById('chat-input-field');
    const chatModal = document.getElementById('project-demo-modal');
    
    if (chatModal && chatInputField) {
        chatModal.addEventListener('transitionend', function() {
            if (this.classList.contains('active')) {
                const activeDemoContent = this.querySelector('.demo-content.active');
                if (activeDemoContent && activeDemoContent.id === 'chat-demo') {
                    chatInputField.focus();
                }
            }
        });
    }
});

// Initialize particle effects
function initializeParticles() {
    const particlesSvg = document.querySelector('.particles');
    if (!particlesSvg) return;
    
    const numParticles = 50;
    const svgNS = "http://www.w3.org/2000/svg";
    
    for (let i = 0; i < numParticles; i++) {
        const size = Math.random() * 3 + 1;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const opacity = Math.random() * 0.5 + 0.1;
        
        const circle = document.createElementNS(svgNS, "circle");
        circle.setAttribute("cx", `${x}%`);
        circle.setAttribute("cy", `${y}%`);
        circle.setAttribute("r", size);
        
        // Randomly choose between blue and purple
        const color = Math.random() > 0.5 ? "#7000FF" : "#00F5FF";
        circle.setAttribute("fill", color);
        circle.setAttribute("opacity", opacity);
        
        // Add animation attributes
        const animateX = document.createElementNS(svgNS, "animate");
        animateX.setAttribute("attributeName", "cx");
        animateX.setAttribute("values", `${x}%; ${x + (Math.random() * 10 - 5)}%; ${x}%`);
        animateX.setAttribute("dur", `${Math.random() * 5 + 3}s`);
        animateX.setAttribute("repeatCount", "indefinite");
        
        const animateY = document.createElementNS(svgNS, "animate");
        animateY.setAttribute("attributeName", "cy");
        animateY.setAttribute("values", `${y}%; ${y + (Math.random() * 10 - 5)}%; ${y}%`);
        animateY.setAttribute("dur", `${Math.random() * 5 + 3}s`);
        animateY.setAttribute("repeatCount", "indefinite");
        
        const animateOpacity = document.createElementNS(svgNS, "animate");
        animateOpacity.setAttribute("attributeName", "opacity");
        animateOpacity.setAttribute("values", `${opacity}; ${opacity - 0.1}; ${opacity}`);
        animateOpacity.setAttribute("dur", `${Math.random() * 3 + 2}s`);
        animateOpacity.setAttribute("repeatCount", "indefinite");
        
        circle.appendChild(animateX);
        circle.appendChild(animateY);
        circle.appendChild(animateOpacity);
        
        particlesSvg.appendChild(circle);
    }
}

// Initialize typing effect
function initializeTypingEffect() {
    const typingElement = document.querySelector('.typing-effect');
    if (!typingElement) return;
    
    const phrases = [
        "Building the future of AI...",
        "Creating intelligent systems...",
        "Developing autonomous agents...",
        "Fine-tuning language models...",
        "Exploring AI possibilities..."
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 1500; // Pause at end of phrase
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pause before starting new phrase
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Start the typing effect
    setTimeout(type, 1000);
}

// Initialize project carousels
function initializeProjectCarousels() {
    // Find all project carousels on the page
    const projectCarousels = document.querySelectorAll('.project-carousel .carousel-slide');
    
    projectCarousels.forEach(carousel => {
        const images = carousel.querySelectorAll('.carousel-image');
        if (images.length < 2) return; // Skip if there's only one or no images
        
        let currentIndex = 0;
        let slideInterval;
        
        // Function to show a specific slide
        function showSlide(index) {
            // Hide all images
            images.forEach(img => {
                img.classList.remove('active');
            });
            
            // Show current image
            images[index].classList.add('active');
        }
        
        // Auto-slide function
        function autoSlide() {
            currentIndex = (currentIndex + 1) % images.length;
            showSlide(currentIndex);
        }
        
        // Start auto-sliding
        slideInterval = setInterval(autoSlide, 3000); // Change slide every 3 seconds
        
        // Pause auto-slide on hover
        carousel.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        // Resume auto-slide on mouse leave
        carousel.addEventListener('mouseleave', () => {
            slideInterval = setInterval(autoSlide, 3000);
        });
        
        // Log that we've initialized this carousel
        console.log('Initialized project carousel with ID:', carousel.id);
    });
}

// Initialize modal functionality
function initializeModals() {
    const modal = document.getElementById('project-demo-modal');
    if (!modal) return;
    
    const closeModalBtn = modal.querySelector('.close-modal');
    const openDemoBtns = document.querySelectorAll('.open-demo');
    
    // Open modal with specific demo content
    openDemoBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project-id');
            const demoType = this.getAttribute('data-demo-type');
            
            // Set modal title based on project
            const projectTitleEl = document.querySelector(`.project-card[data-project-id="${projectId}"] .project-title`);
            const demoTitle = document.getElementById('demo-title');
            
            if (projectTitleEl && demoTitle) {
                demoTitle.textContent = `${projectTitleEl.textContent} Demo`;
            }
            
            // Show appropriate demo content
            const demoContents = modal.querySelectorAll('.demo-content');
            demoContents.forEach(content => {
                content.classList.remove('active');
            });
            
            const activeDemo = document.getElementById(`${demoType}-demo`);
            if (activeDemo) {
                activeDemo.classList.add('active');
            }
            
            // Show modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });
    
    // Close modal
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function() {
            modal.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        });
    }
    
    // Close modal when clicking outside content
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        }
    });
    
    // Close modal with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        }
    });
}
