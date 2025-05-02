// Intersection Observer - Handles scroll-based animations

document.addEventListener('DOMContentLoaded', function() {
    // Initialize intersection observers for various animation effects
    initFadeInObserver();
    initSectionTransitions();
    initParallaxEffects();
    initCounterAnimation();
});

/**
 * Initialize fade-in animation for elements with 'fade-in' class
 */
function initFadeInObserver() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    if (fadeElements.length === 0) return;
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                // Unobserve after animation is triggered
                fadeObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Slight offset to trigger before fully in viewport
    });
    
    // Observe each fade element
    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });
}

/**
 * Add section transition effects
 */
function initSectionTransitions() {
    const sections = document.querySelectorAll('section');
    
    if (sections.length === 0) return;
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Highlight the corresponding nav item
                highlightNavItem(entry.target.id);
                
                // Animate section headers when they come into view
                const header = entry.target.querySelector('.section-header');
                if (header) {
                    header.style.opacity = '1';
                    header.style.transform = 'translateY(0)';
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '-100px 0px -100px 0px'
    });
    
    // Setup sections for animation
    sections.forEach(section => {
        // Set initial styles if not the hero section
        if (section.id !== 'hero') {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        }
        
        // Setup section headers
        const header = section.querySelector('.section-header');
        if (header) {
            header.style.opacity = '0';
            header.style.transform = 'translateY(20px)';
            header.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        }
        
        sectionObserver.observe(section);
    });
}

/**
 * Highlight active navigation item based on current section
 */
function highlightNavItem(sectionId) {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        // Get the href attribute and extract the ID
        const href = item.getAttribute('href');
        if (!href) return;
        
        const targetId = href.substring(1); // Remove the # character
        
        if (targetId === sectionId) {
            // Add active class or style
            item.classList.add('active');
            item.style.color = 'var(--color-blue)';
        } else {
            // Remove active class or style
            item.classList.remove('active');
            item.style.color = '';
        }
    });
}

/**
 * Add parallax scrolling effects to specified elements
 */
function initParallaxEffects() {
    // Elements that should have parallax effect
    const parallaxElements = [
        { selector: '.hero-visual', speed: 0.1 },
        { selector: '.shape', speed: 0.05 },
        { selector: '.project-visual', speed: 0.03 }
    ];
    
    // Set up smooth parallax effect on scroll
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        parallaxElements.forEach(item => {
            const elements = document.querySelectorAll(item.selector);
            
            elements.forEach(element => {
                // Calculate the parallax offset
                const offset = scrollY * item.speed;
                
                // Apply transform
                element.style.transform = `translateY(${offset}px)`;
            });
        });
    });
}

/**
 * Animate the statistic numbers when they come into view
 */
function initCounterAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length === 0) return;
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const value = target.textContent;
                
                // Extract the number part
                let number;
                if (value.includes('+')) {
                    number = parseInt(value.replace('+', ''));
                    animateCounter(target, 0, number, true);
                } else if (value.includes('M+')) {
                    number = parseFloat(value.replace('M+', ''));
                    animateCounter(target, 0, number, false, 'M+');
                } else {
                    number = parseInt(value);
                    animateCounter(target, 0, number, false);
                }
                
                // Unobserve after animation starts
                counterObserver.unobserve(target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    // Observe each stat number
    statNumbers.forEach(stat => {
        counterObserver.observe(stat);
    });
}

/**
 * Animate a counter from start to end
 * @param {HTMLElement} element - The element to update
 * @param {number} start - Starting value
 * @param {number} end - Ending value
 * @param {boolean} hasPlus - Whether to add a + sign at the end
 * @param {string} suffix - Optional suffix (like M+)
 */
function animateCounter(element, start, end, hasPlus = false, suffix = '') {
    // Determine if we're counting a decimal number
    const isDecimal = !Number.isInteger(end);
    
    // Calculate animation duration and step
    const duration = 2000; // 2 seconds
    const stepTime = 20; // Update every 20ms
    const totalSteps = duration / stepTime;
    const stepValue = (end - start) / totalSteps;
    
    let currentValue = start;
    let currentStep = 0;
    
    // Animation interval
    const interval = setInterval(() => {
        currentStep++;
        currentValue += stepValue;
        
        // Ensure we don't exceed the target due to floating point issues
        if (currentStep >= totalSteps) {
            currentValue = end;
            clearInterval(interval);
        }
        
        // Format the display value
        let displayValue;
        if (isDecimal) {
            // For decimal numbers, show one decimal place
            displayValue = currentValue.toFixed(1);
        } else {
            // For integers, round to the nearest integer
            displayValue = Math.round(currentValue);
        }
        
        // Add + sign or suffix if needed
        if (hasPlus) {
            element.textContent = `${displayValue}+`;
        } else if (suffix) {
            element.textContent = `${displayValue}${suffix}`;
        } else {
            element.textContent = displayValue;
        }
    }, stepTime);
}

/**
 * Initialize scroll indicators
 */
document.addEventListener('DOMContentLoaded', function() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        // Fade out scroll indicator on scroll
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.transform = 'translate(-50%, 20px)';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.transform = 'translate(-50%, 0)';
            }
        });
    }
    
    // Create reading progress indicator
    createProgressIndicator();
});

/**
 * Create a reading progress indicator at the top of the page
 */
function createProgressIndicator() {
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.style.position = 'fixed';
    progressBar.style.top = '0';
    progressBar.style.left = '0';
    progressBar.style.height = '3px';
    progressBar.style.width = '0%';
    progressBar.style.backgroundColor = 'var(--color-blue)';
    progressBar.style.zIndex = '9999';
    progressBar.style.transition = 'width 0.1s ease';
    
    document.body.appendChild(progressBar);
    
    // Update progress bar width on scroll
    window.addEventListener('scroll', function() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrollPosition = window.scrollY;
        
        const progress = (scrollPosition / documentHeight) * 100;
        progressBar.style.width = `${progress}%`;
    });
}
