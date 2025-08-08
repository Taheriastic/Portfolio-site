// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    const heroButtons = document.querySelectorAll('.hero-buttons a[href^="#"]');
    
    // Combine all internal links
    const allInternalLinks = [...navLinks, ...heroButtons];
    
    allInternalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed nav
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add active state to navigation links based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a');

    function highlightNavigation() {
        let current = '';
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition <= sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    }

    // Listen for scroll events to update navigation
    let scrollTimer;
    window.addEventListener('scroll', function() {
        // Debounce scroll events for better performance
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(highlightNavigation, 10);
    });

    // Enhanced scroll-based animations for cards and elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered animation delay
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.classList.add('animate-in');
                }, index * 100);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.experience-card, .interest-card, .minerva-content');
    
    animatedElements.forEach(element => {
        // Set initial state
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        
        observer.observe(element);
    });

    // Enhanced hover effects for cards with bright theme interactions
    const experienceCards = document.querySelectorAll('.experience-card');
    const interestCards = document.querySelectorAll('.interest-card');
    
    [...experienceCards, ...interestCards].forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 102, 255, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 8px 25px rgba(0, 102, 255, 0.1)';
        });
    });

    // Enhanced Minerva section interaction
    const minervaContent = document.querySelector('.minerva-content');
    if (minervaContent) {
        minervaContent.addEventListener('mouseenter', function() {
            const logoWrapper = this.querySelector('.minerva-logo-wrapper');
            const logo = this.querySelector('.minerva-logo');
            if (logoWrapper && logo) {
                logoWrapper.style.transform = 'scale(1.1) rotate(5deg)';
                logoWrapper.style.boxShadow = '0 20px 40px rgba(139, 92, 246, 0.3)';
                logo.style.transform = 'rotate(-5deg)';
            }
        });
        
        minervaContent.addEventListener('mouseleave', function() {
            const logoWrapper = this.querySelector('.minerva-logo-wrapper');
            const logo = this.querySelector('.minerva-logo');
            if (logoWrapper && logo) {
                logoWrapper.style.transform = 'scale(1) rotate(0deg)';
                logoWrapper.style.boxShadow = '0 12px 30px rgba(139, 92, 246, 0.2)';
                logo.style.transform = 'rotate(0deg)';
            }
        });
    }

    // Add transitions for Minerva elements
    const minervaLogoWrapper = document.querySelector('.minerva-logo-wrapper');
    const minervaLogo = document.querySelector('.minerva-logo');
    if (minervaLogoWrapper) {
        minervaLogoWrapper.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
    }
    if (minervaLogo) {
        minervaLogo.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
    }

    // Enhanced profile image interaction
    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
        profileImage.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.05) rotate(2deg)';
            this.style.boxShadow = '0 30px 60px rgba(0, 102, 255, 0.3)';
        });
        
        profileImage.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1) rotate(0deg)';
            this.style.boxShadow = '0 20px 40px rgba(0, 102, 255, 0.2)';
        });
    }

    // Enhanced click-to-copy functionality for email with bright theme
    const emailLink = document.querySelector('a[href^="mailto:"]');
    if (emailLink) {
        emailLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            const email = this.getAttribute('href').replace('mailto:', '');
            
            // Try to copy to clipboard
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(email).then(function() {
                    showBrightNotification('Email copied to clipboard! ✨', 'success');
                }).catch(function() {
                    // Fallback: open default email client
                    window.location.href = `mailto:${email}`;
                });
            } else {
                // Fallback for older browsers
                window.location.href = `mailto:${email}`;
            }
        });
    }

    // Enhanced notification function with bright theme styling
    function showBrightNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.textContent = message;
        
        let backgroundColor, borderColor;
        switch(type) {
            case 'success':
                backgroundColor = 'linear-gradient(135deg, #4285f4 0%, #0066ff 100%)';
                borderColor = '#0066ff';
                break;
            case 'warning':
                backgroundColor = 'linear-gradient(135deg, #ff6b35 0%, #ec4899 100%)';
                borderColor = '#ff6b35';
                break;
            default:
                backgroundColor = 'linear-gradient(135deg, #14b8a6 0%, #8b5cf6 100%)';
                borderColor = '#14b8a6';
        }
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${backgroundColor};
            color: white;
            padding: 16px 24px;
            border-radius: 12px;
            font-weight: 600;
            font-size: 14px;
            z-index: 10000;
            box-shadow: 0 15px 30px rgba(0, 102, 255, 0.3);
            border: 2px solid ${borderColor};
            transform: translateX(120%) scale(0.8);
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            backdrop-filter: blur(10px);
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0) scale(1)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(120%) scale(0.8)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 400);
        }, 3000);
    }

    // Enhanced keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && e.target.matches('a, button')) {
            e.target.click();
        }
        
        // Add keyboard shortcuts for navigation
        if (e.altKey) {
            switch(e.key) {
                case '1':
                    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
                    break;
                case '2':
                    document.querySelector('#experience')?.scrollIntoView({ behavior: 'smooth' });
                    break;
                case '3':
                    document.querySelector('#interests')?.scrollIntoView({ behavior: 'smooth' });
                    break;
                case '4':
                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                    break;
            }
        }
    });

    // Preload images for better performance - updated with correct file names
    const images = [
        'Me.jpg',
        'Mt_Fuji_Hike.jpg',
        'MartialArts.jpg',
        'Football_Game_1.jpg'
    ];

    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });

    // Enhanced loading state management
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Enhanced profile image fade-in effect
        if (profileImage) {
            profileImage.style.opacity = '0';
            profileImage.style.transform = 'translateY(20px) scale(0.9)';
            profileImage.style.transition = 'all 1s cubic-bezier(0.16, 1, 0.3, 1)';
            setTimeout(() => {
                profileImage.style.opacity = '1';
                profileImage.style.transform = 'translateY(0) scale(1)';
            }, 500);
        }

        // Trigger welcome animation
        showBrightNotification('Welcome to my portfolio! ✨', 'success');
    });

    // Initialize navigation highlighting
    highlightNavigation();

    // Enhanced scroll-to-top functionality with bright theme
    let scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background: linear-gradient(135deg, #4285f4 0%, #0066ff 100%);
        color: white;
        border: 2px solid rgba(255, 255, 255, 0.2);
        font-size: 20px;
        font-weight: bold;
        cursor: pointer;
        opacity: 0;
        transform: scale(0) rotate(180deg);
        transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        z-index: 1000;
        box-shadow: 0 12px 25px rgba(0, 102, 255, 0.4);
        backdrop-filter: blur(10px);
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide scroll to top button with enhanced animation
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.transform = 'scale(1) rotate(0deg)';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.transform = 'scale(0) rotate(180deg)';
        }
    });
    
    // Enhanced scroll to top functionality
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        showBrightNotification('Back to the top! 🚀', 'info');
    });

    // Enhanced hover effects for scroll-to-top button
    scrollToTopBtn.addEventListener('mouseenter', function() {
        this.style.background = 'linear-gradient(135deg, #0052cc 0%, #003d99 100%)';
        this.style.transform = 'scale(1.15) rotate(-5deg)';
        this.style.boxShadow = '0 20px 40px rgba(0, 102, 255, 0.5)';
    });
    
    scrollToTopBtn.addEventListener('mouseleave', function() {
        this.style.background = 'linear-gradient(135deg, #4285f4 0%, #0066ff 100%)';
        this.style.transform = 'scale(1) rotate(0deg)';
        this.style.boxShadow = '0 12px 25px rgba(0, 102, 255, 0.4)';
    });

    // Enhanced parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.3;
            const backgroundParallax = scrolled * 0.1;
            
            hero.style.transform = `translateY(${parallax}px)`;
            
            // Animate background elements
            const heroBackground = hero.querySelector('::before');
            if (heroBackground) {
                hero.style.backgroundPosition = `center ${backgroundParallax}px`;
            }
        });
    }

    // Add button click animations with bright theme
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                top: ${y}px;
                left: ${x}px;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add ripple animation keyframes
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);

    // Enhanced image loading effects
    const images_elements = document.querySelectorAll('img');
    images_elements.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
            this.style.transform = 'scale(1)';
        });
        
        // Set initial loading state
        img.style.opacity = '0';
        img.style.transform = 'scale(0.95)';
        img.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    });

    // Add dynamic gradient animation to hero background
    let gradientPosition = 0;
    setInterval(() => {
        gradientPosition += 0.5;
        if (hero) {
            hero.style.backgroundPosition = `${gradientPosition}px center`;
        }
    }, 50);

    // Performance optimization: lazy loading enhanced
    function enhancedLazyLoadImages() {
        const images = document.querySelectorAll('img[src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.style.opacity = '1';
                    img.style.transform = 'scale(1)';
                    observer.unobserve(img);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });
        
        images.forEach(img => {
            img.style.opacity = '0';
            img.style.transform = 'scale(0.9)';
            img.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
            imageObserver.observe(img);
        });
    }

    // Initialize enhanced lazy loading
    enhancedLazyLoadImages();
});

// Utility functions for enhanced interactions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Enhanced performance monitoring
if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
            
            if (loadTime > 3000) {
                console.log('Performance optimization may be needed');
            }
        }, 0);
    });
}

// Add accessibility enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Add skip link for keyboard navigation
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #4285f4;
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10001;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content ID
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.id = 'main-content';
    }
});