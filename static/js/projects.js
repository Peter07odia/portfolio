/**
 * Projects Section JavaScript - Mobile-First Responsive Design
 * Handles carousels and project interactions (demo functionality removed)
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Projects JavaScript loaded');
    
    // Initialize all project components
    initializeCarousels();
    initializeMobileCarousels();
    initializeProjectCards();
    
    // Initialize feather icons
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
});

/**
 * Initialize standard project carousels
 */
function initializeCarousels() {
    const carousels = document.querySelectorAll('.project-carousel');
    
    carousels.forEach(carousel => {
        const slides = carousel.querySelectorAll('.carousel-slide');
        const prevBtn = carousel.querySelector('.carousel-nav.prev');
        const nextBtn = carousel.querySelector('.carousel-nav.next');
        
        if (slides.length <= 1) return; // Skip if only one slide
        
        let currentSlide = 0;
        const totalSlides = slides.length;
        
        // Show specific slide
        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
        }
        
        // Next slide
        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            showSlide(currentSlide);
        }
        
        // Previous slide
        function prevSlide() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            showSlide(currentSlide);
        }
        
        // Event listeners
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        
        // Auto-play functionality (optional)
        let autoplayInterval;
        
        function startAutoplay() {
            autoplayInterval = setInterval(nextSlide, 5000);
        }
        
        function stopAutoplay() {
            clearInterval(autoplayInterval);
        }
        
        // Start autoplay and pause on hover
        startAutoplay();
        carousel.addEventListener('mouseenter', stopAutoplay);
        carousel.addEventListener('mouseleave', startAutoplay);
        
        // Touch/swipe support for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        carousel.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        carousel.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    nextSlide(); // Swipe left - next slide
                } else {
                    prevSlide(); // Swipe right - previous slide
                }
            }
        }
        
        console.log(`Initialized carousel with ${totalSlides} slides`);
    });
}

/**
 * Initialize mobile app carousels (phone frames)
 */
function initializeMobileCarousels() {
    const mobileCarousels = document.querySelectorAll('.mobile-app-showcase');
    
    mobileCarousels.forEach(showcase => {
        const slides = showcase.querySelectorAll('.phone-screen-slide');
        const prevBtn = showcase.querySelector('.mobile-nav-btn.prev');
        const nextBtn = showcase.querySelector('.mobile-nav-btn.next');
        
        if (slides.length <= 1) return; // Skip if only one slide
        
        let currentSlide = 0;
        const totalSlides = slides.length;
        
        // Show specific slide
        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
        }
        
        // Next slide
        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            showSlide(currentSlide);
        }
        
        // Previous slide
        function prevSlide() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            showSlide(currentSlide);
        }
        
        // Event listeners
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        
        // Auto-play for mobile screens
        let autoplayInterval = setInterval(nextSlide, 4000);
        
        // Pause autoplay on interaction
        showcase.addEventListener('click', () => {
            clearInterval(autoplayInterval);
            autoplayInterval = setInterval(nextSlide, 4000);
        });
        
        console.log(`Initialized mobile carousel with ${totalSlides} screens`);
    });
}

/**
 * Initialize project cards with hover effects and interactions
 */
function initializeProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Add hover effect for better interactivity
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        // Handle external links
        const externalLinks = card.querySelectorAll('a[href^="http"]');
        externalLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Analytics tracking could be added here
                console.log(`External link clicked: ${this.href}`);
            });
        });
    });
    
    console.log(`Initialized ${projectCards.length} project cards`);
}

// Utility function for smooth scrolling to sections
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Export functions for potential external use
window.ProjectsModule = {
    initializeCarousels,
    initializeMobileCarousels,
    initializeProjectCards,
    scrollToSection
};