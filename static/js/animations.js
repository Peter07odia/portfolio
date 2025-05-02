// Handle animations when elements are scrolled into view
document.addEventListener('DOMContentLoaded', function() {
    // Add animation to hero title on load
    setTimeout(() => {
        animateHeroTitle();
    }, 500);

    // Add wave animation to hero shapes
    animateShapes();

    // Add animation to tech items in hero section
    animateTechStack();
});

// Animate hero title on page load
function animateHeroTitle() {
    const title = document.querySelector('.animated-title');
    if (!title) return;
    
    const lines = title.querySelectorAll('.line');
    lines.forEach((line, index) => {
        // Get the text and wrap each letter in a span
        const text = line.textContent;
        let wrappedText = '';
        
        for (let i = 0; i < text.length; i++) {
            // If this is a space, don't wrap it
            if (text[i] === ' ') {
                wrappedText += ' ';
            } else {
                // For spans with 'highlight' class, maintain that class
                if (line.querySelector('.highlight') && text[i] === line.querySelector('.highlight').textContent[0]) {
                    // This is the start of a highlighted section
                    const highlightText = line.querySelector('.highlight').textContent;
                    wrappedText += `<span class="letter highlight">${highlightText}</span>`;
                    // Skip ahead
                    i += highlightText.length - 1;
                } else {
                    wrappedText += `<span class="letter">${text[i]}</span>`;
                }
            }
        }
        
        line.innerHTML = wrappedText;
        
        // Animate each letter with a delay
        const letters = line.querySelectorAll('.letter');
        letters.forEach((letter, letterIndex) => {
            letter.style.display = 'inline-block';
            letter.style.opacity = '0';
            letter.style.transform = 'translateY(20px)';
            letter.style.transition = `opacity 0.5s ease, transform 0.5s ease`;
            letter.style.transitionDelay = `${index * 0.3 + letterIndex * 0.03}s`;
            
            setTimeout(() => {
                letter.style.opacity = '1';
                letter.style.transform = 'translateY(0)';
            }, 100);
        });
    });
}

// Add wave animation to hero shapes
function animateShapes() {
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
        shape.style.animationDelay = `${index * 0.5}s`;
    });
}

// Animate tech stack items
function animateTechStack() {
    const techItems = document.querySelectorAll('.tech-item');
    techItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(10px)';
        item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        item.style.transitionDelay = `${1.5 + index * 0.1}s`;
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 100);
    });
}

// Create matrix rain effect in the background of specific elements
function createMatrixRain(elementId) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const canvas = document.createElement('canvas');
    canvas.className = 'matrix-canvas';
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.1';
    
    element.style.position = 'relative';
    element.insertBefore(canvas, element.firstChild);
    
    const ctx = canvas.getContext('2d');
    
    // Make canvas same size as container
    function resizeCanvas() {
        canvas.width = element.offsetWidth;
        canvas.height = element.offsetHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Matrix rain characters
    const characters = '01';
    const fontSize = 10;
    const columns = canvas.width / fontSize;
    
    // Array to track y position of each column
    const drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * canvas.height / fontSize);
    }
    
    // Drawing the characters
    function draw() {
        // Semi-transparent black to create fade effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00F5FF';
        ctx.font = `${fontSize}px monospace`;
        
        // Loop over drops
        for (let i = 0; i < drops.length; i++) {
            // Random character
            const text = characters.charAt(Math.floor(Math.random() * characters.length));
            
            // x = i * fontSize, y = drops[i] * fontSize
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            // Send drop to top after it reaches bottom
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            
            // Increment y coordinate
            drops[i]++;
        }
    }
    
    setInterval(draw, 33);
}

// Create glowing particle effect
function createGlowingParticles(elementId) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    particlesContainer.style.position = 'absolute';
    particlesContainer.style.top = '0';
    particlesContainer.style.left = '0';
    particlesContainer.style.width = '100%';
    particlesContainer.style.height = '100%';
    particlesContainer.style.overflow = 'hidden';
    particlesContainer.style.zIndex = '-1';
    
    element.style.position = 'relative';
    element.insertBefore(particlesContainer, element.firstChild);
    
    // Create particles
    const numParticles = 20;
    
    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.className = 'glowing-particle';
        
        // Random size between 5px and 15px
        const size = Math.random() * 10 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Style
        particle.style.position = 'absolute';
        particle.style.borderRadius = '50%';
        
        // Random color between blue and purple
        const hue = Math.random() > 0.5 ? '271' : '183'; // Purple or Cyan
        particle.style.backgroundColor = `hsla(${hue}, 100%, 50%, 0.2)`;
        particle.style.boxShadow = `0 0 ${size}px hsla(${hue}, 100%, 50%, 0.5)`;
        
        // Random animation duration
        const duration = Math.random() * 5 + 5;
        particle.style.animation = `float ${duration}s infinite alternate ease-in-out`;
        
        // Random animation delay
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        particlesContainer.appendChild(particle);
    }
}
