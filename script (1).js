// ================================
// ROYAL PORTFOLIO - JAVASCRIPT
// Created by HAMZA
// ================================

// ===== LOADING SCREEN =====
document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    const loadingProgress = document.querySelector('.loading-progress');
    const loadingPercentage = document.querySelector('.loading-percentage');
    
    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                document.body.style.overflow = 'visible';
            }, 800);
        }
        loadingProgress.style.width = `${progress}%`;
        loadingPercentage.textContent = `${Math.floor(progress)}%`;
    }, 100);
});

// ===== CURSOR EFFECTS =====
const cursorDot = document.getElementById('cursorDot');
const cursorOutline = document.getElementById('cursorOutline');

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;
    
    if (cursorDot && cursorOutline) {
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
        cursorOutline.style.left = `${cursorX}px`;
        cursorOutline.style.top = `${cursorY}px`;
    }
    
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Cursor hover effects
document.querySelectorAll('a, button, .project-card, .skill-category').forEach(el => {
    el.addEventListener('mouseenter', () => {
        if (cursorOutline) {
            cursorOutline.style.width = '60px';
            cursorOutline.style.height = '60px';
            cursorOutline.style.borderColor = 'var(--royal-gold)';
        }
    });
    
    el.addEventListener('mouseleave', () => {
        if (cursorOutline) {
            cursorOutline.style.width = '40px';
            cursorOutline.style.height = '40px';
            cursorOutline.style.borderColor = 'var(--royal-gold)';
        }
    });
});

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ===== MOBILE MENU TOGGLE =====
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

// Close menu when clicking nav links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// ===== PARTICLE SYSTEM =====
const canvas = document.getElementById('particleCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > canvas.width || this.x < 0) {
                this.speedX = -this.speedX;
            }
            if (this.y > canvas.height || this.y < 0) {
                this.speedY = -this.speedY;
            }
        }
        
        draw() {
            ctx.fillStyle = `rgba(255, 215, 0, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    const particles = [];
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
            
            // Connect particles
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.strokeStyle = `rgba(255, 215, 0, ${0.2 - distance / 500})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ===== TYPED TEXT EFFECT =====
const typedText = document.querySelector('.typed-text');
if (typedText) {
    const texts = [
        'Full-Stack Developer crafting digital masterpieces',
        'Architect of innovative web solutions',
        'Passionate about cutting-edge technology',
        'Transforming ideas into reality'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeText() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typedText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(typeText, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(typeText, 500);
        } else {
            setTimeout(typeText, isDeleting ? 50 : 100);
        }
    }
    
    typeText();
}

// ===== COUNTER ANIMATION =====
const statNumbers = document.querySelectorAll('.stat-number');

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

statNumbers.forEach(stat => {
    counterObserver.observe(stat);
});

// ===== SKILL BARS ANIMATION =====
const skillItems = document.querySelectorAll('.skill-item');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            skillObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

skillItems.forEach(skill => {
    skillObserver.observe(skill);
});

// ===== PROJECT FILTER =====
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category').includes(filter)) {
                card.classList.remove('hide');
                setTimeout(() => {
                    card.style.animation = 'fadeInUp 0.6s ease forwards';
                }, 100);
            } else {
                card.classList.add('hide');
            }
        });
    });
});

// ===== SCROLL REVEAL ANIMATION =====
const revealElements = document.querySelectorAll('.about-grid, .skill-category, .project-card, .timeline-item, .contact-grid');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px'
});

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    revealObserver.observe(el);
});

// ===== THEME TOGGLE =====
const themeToggle = document.getElementById('themeToggle');
const sunIcon = document.querySelector('.sun-icon');
const moonIcon = document.querySelector('.moon-icon');

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        
        if (document.body.classList.contains('light-theme')) {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        } else {
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        }
    });
}

// ===== BACK TO TOP BUTTON =====
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== FORM SUBMISSION =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Show success message
        alert(`Thank you, ${name}! Your message has been received. I'll get back to you soon at ${email}.`);
        
        // Reset form
        contactForm.reset();
    });
}

// ===== FLOATING ANIMATION FOR HERO ELEMENTS =====
const floatingElements = document.querySelectorAll('.code-block, .tech-orb');

floatingElements.forEach((el, index) => {
    const randomDelay = Math.random() * 2;
    const randomDuration = 4 + Math.random() * 2;
    
    el.style.animation = `float ${randomDuration}s ease-in-out ${randomDelay}s infinite`;
});

// ===== PARALLAX EFFECT =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const lightBeams = document.querySelectorAll('.light-beam');
    
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = `${1 - scrolled / 500}`;
    }
    
    lightBeams.forEach((beam, index) => {
        beam.style.transform = `translateY(${scrolled * (0.3 + index * 0.1)}px)`;
    });
});

// ===== DYNAMIC BACKGROUND PARTICLES =====
function createBackgroundParticles() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const particleContainer = document.createElement('div');
        particleContainer.className = 'bg-particles';
        particleContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            pointer-events: none;
            z-index: 0;
        `;
        
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 2}px;
                height: ${Math.random() * 4 + 2}px;
                background: rgba(255, 215, 0, ${Math.random() * 0.3 + 0.1});
                border-radius: 50%;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation: particleFloat ${Math.random() * 10 + 10}s linear infinite;
                animation-delay: ${Math.random() * 5}s;
            `;
            particleContainer.appendChild(particle);
        }
        
        section.style.position = 'relative';
        section.insertBefore(particleContainer, section.firstChild);
    });
}

// Add particle float animation
const style = document.createElement('style');
style.textContent = `
    @keyframes particleFloat {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-1000px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

createBackgroundParticles();

// ===== GLOWING EFFECT ON HOVER =====
const glowElements = document.querySelectorAll('.royal-btn, .project-card, .contact-card, .skill-category');

glowElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        el.style.setProperty('--mouse-x', `${x}px`);
        el.style.setProperty('--mouse-y', `${y}px`);
    });
});

// ===== TIMELINE ANIMATION =====
const timelineItems = document.querySelectorAll('.timeline-item');

const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }, index * 200);
            timelineObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2
});

timelineItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-50px)';
    item.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    timelineObserver.observe(item);
});

// ===== 3D TILT EFFECT FOR PROJECT CARDS =====
const projectCardsArray = document.querySelectorAll('.project-card');

projectCardsArray.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===== ROYAL SHIMMER EFFECT =====
function createShimmerEffect() {
    const shimmerElements = document.querySelectorAll('.gold-gradient, .royal-shimmer');
    
    shimmerElements.forEach(el => {
        setInterval(() => {
            el.style.filter = 'brightness(1.2) drop-shadow(0 0 20px rgba(255, 215, 0, 0.8))';
            setTimeout(() => {
                el.style.filter = 'brightness(1) drop-shadow(0 0 10px rgba(255, 215, 0, 0.5))';
            }, 300);
        }, 3000);
    });
}

createShimmerEffect();

// ===== SECTION ENTRANCE ANIMATION =====
const sectionHeaders = document.querySelectorAll('.section-header');

const headerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Animate section number
            const sectionNumber = entry.target.querySelector('.section-number');
            if (sectionNumber) {
                sectionNumber.style.animation = 'fadeInScale 0.6s ease forwards';
            }
            
            // Animate title
            const sectionTitle = entry.target.querySelector('.section-title');
            if (sectionTitle) {
                sectionTitle.style.animation = 'slideInLeft 0.8s ease forwards';
                sectionTitle.style.animationDelay = '0.2s';
            }
            
            // Animate underline
            const underline = entry.target.querySelector('.title-underline');
            if (underline) {
                underline.style.animation = 'scaleX 0.8s ease forwards';
                underline.style.animationDelay = '0.4s';
            }
            
            headerObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.3
});

sectionHeaders.forEach(header => {
    header.style.opacity = '0';
    header.style.transform = 'translateY(30px)';
    header.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    headerObserver.observe(header);
});

// Add scale animation
const scaleStyle = document.createElement('style');
scaleStyle.textContent = `
    @keyframes scaleX {
        from {
            transform: scaleX(0);
        }
        to {
            transform: scaleX(1);
        }
    }
`;
document.head.appendChild(scaleStyle);

// ===== MOUSE TRAIL EFFECT =====
const trail = [];
const trailLength = 20;

document.addEventListener('mousemove', (e) => {
    trail.push({
        x: e.clientX,
        y: e.clientY,
        timestamp: Date.now()
    });
    
    if (trail.length > trailLength) {
        trail.shift();
    }
});

// ===== CUSTOM CONTEXT MENU (RIGHT CLICK) =====
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    // You can add custom context menu here if needed
});

// ===== EASTER EGG - KONAMI CODE =====
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode.splice(-konamiSequence.length - 1, konamiCode.length - konamiSequence.length);
    
    if (konamiCode.join('').includes(konamiSequence.join(''))) {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    document.body.style.animation = 'rainbow 2s linear infinite';
    setTimeout(() => {
        document.body.style.animation = '';
        alert('🎉 You found the secret! You are a true code master! 👑');
    }, 2000);
}

// Add rainbow animation
const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(rainbowStyle);

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce function for scroll events
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Throttle function for resize events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Apply debounce to scroll-heavy functions
window.addEventListener('scroll', debounce(() => {
    // Optimized scroll functions here
}));

// ===== LAZY LOADING IMAGES =====
const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// ===== CONSOLE MESSAGE =====
console.log('%c👑 HAMZA - Digital Architect 👑', 'font-size: 20px; font-weight: bold; color: #ffd700; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);');
console.log('%cWelcome to my royal portfolio! 🚀', 'font-size: 14px; color: #ffed4e;');
console.log('%cInterested in working together? Let\'s connect!', 'font-size: 12px; color: #a0aec0;');
console.log('%cEmail: muhammadmardanhamza@gmail.com', 'font-size: 12px; color: #ffd700;');
console.log('%cWhatsApp: +92 324 9901234', 'font-size: 12px; color: #ffd700;');

// ===== FINAL INITIALIZATION =====
console.log('%c✨ Portfolio Initialized Successfully! ✨', 'font-size: 16px; font-weight: bold; color: #ffd700; background: #0a0e27; padding: 10px;');
