/**
 * ROG STRIX G17 2023 - SCROLL ANIMATIONS
 */

// Intersection Observer for reveal animations
class ScrollReveal {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.init();
    }
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animate(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, this.observerOptions);
        
        // Observe elements
        document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
            observer.observe(el);
        });
        
        // Stagger animations for grids
        this.initStaggerAnimations();
    }
    
    animate(element) {
        element.classList.add('active');
        
        // Add specific animations based on class
        if (element.classList.contains('perf-card')) {
            this.animateCard(element);
        } else if (element.classList.contains('spec-item')) {
            this.animateSpec(element);
        }
    }
    
    animateCard(card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100);
    }
    
    animateSpec(spec) {
        spec.style.transform = 'scale(0.8)';
        spec.style.opacity = '0';
        
        setTimeout(() => {
            spec.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
            spec.style.transform = 'scale(1)';
            spec.style.opacity = '1';
        }, 100);
    }
    
    initStaggerAnimations() {
        const grids = document.querySelectorAll('.performance-grid, .rtx-grid, .audio-grid, .design-grid');
        
        grids.forEach(grid => {
            const items = grid.children;
            
            const gridObserver = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    Array.from(items).forEach((item, index) => {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(30px)';
                        
                        setTimeout(() => {
                            item.style.transition = 'all 0.6s ease-out';
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                    
                    gridObserver.unobserve(grid);
                }
            }, { threshold: 0.2 });
            
            gridObserver.observe(grid);
        });
    }
}

// Parallax Effect
class ParallaxEffect {
    constructor() {
        this.elements = document.querySelectorAll('.parallax-element');
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => this.update());
        window.addEventListener('resize', () => this.update());
    }
    
    update() {
        const scrolled = window.pageYOffset;
        
        this.elements.forEach(el => {
            const speed = el.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            el.style.transform = `translateY(${yPos}px)`;
        });
    }
}

// Text Scramble Effect
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }
    
    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        
        this.queue = [];
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }
    
    update() {
        let output = '';
        let complete = 0;
        
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="dud">${char}</span>`;
            } else {
                output += from;
            }
        }
        
        this.el.innerHTML = output;
        
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
    
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

// Magnetic Button Effect
class MagneticButton {
    constructor(button) {
        this.button = button;
        this.boundingRect = button.getBoundingClientRect();
        this.init();
    }
    
    init() {
        this.button.addEventListener('mousemove', (e) => this.move(e));
        this.button.addEventListener('mouseleave', () => this.reset());
        window.addEventListener('resize', () => {
            this.boundingRect = this.button.getBoundingClientRect();
        });
    }
    
    move(e) {
        const x = e.clientX - this.boundingRect.left - this.boundingRect.width / 2;
        const y = e.clientY - this.boundingRect.top - this.boundingRect.height / 2;
        
        this.button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    }
    
    reset() {
        this.button.style.transform = 'translate(0, 0)';
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Scroll reveal
    new ScrollReveal();
    
    // Parallax
    new ParallaxEffect();
    
    // Magnetic buttons
    document.querySelectorAll('.btn-primary, .btn-outline').forEach(btn => {
        new MagneticButton(btn);
    });
    
    // Text scramble for hero title
    const heroTitle = document.querySelector('.glitch');
    if (heroTitle) {
        const fx = new TextScramble(heroTitle);
        
        setTimeout(() => {
            fx.setText('Raise your Game');
        }, 1000);
    }
    
    // Section reveal animations
    initSectionAnimations();
});

// Section-specific animations
function initSectionAnimations() {
    // Performance section counter
    const perfSection = document.querySelector('.performance');
    if (perfSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animatePerfCards();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(perfSection);
    }
}

function animatePerfCards() {
    const cards = document.querySelectorAll('.perf-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('animate-in');
        }, index * 200);
    });
}

// Smooth parallax for hero laptop
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateHeroParallax();
            ticking = false;
        });
        ticking = true;
    }
});

function updateHeroParallax() {
    const scrolled = window.pageYOffset;
    const laptop = document.getElementById('heroLaptop');
    
    if (laptop) {
        const rotation = scrolled * 0.02;
        const translateY = scrolled * 0.3;
        laptop.style.transform = `translateY(${translateY}px) rotateX(${5 + rotation}deg)`;
    }
}

// Glitch effect randomization
setInterval(() => {
    const glitch = document.querySelector('.glitch');
    if (glitch && Math.random() > 0.95) {
        glitch.style.animation = 'none';
        glitch.offsetHeight; // Trigger reflow
        glitch.style.animation = 'glitch 0.3s';
    }
}, 3000);