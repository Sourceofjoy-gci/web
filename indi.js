// JavaScript for Independence Section Interactivity

document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to pillar items
    const pillarItems = document.querySelectorAll('.pillar-item');
    
    pillarItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            // Get associated pillar type
            const pillarType = this.getAttribute('data-pillar');
            
            // Trigger visual effect in the shield
            const shield = document.querySelector('.shield-inner');
            if (shield) {
                shield.classList.add(`highlight-${pillarType}`);
                
                // Add custom text based on pillar type
                const icon = shield.querySelector('i');
                const span = shield.querySelector('span');
                const originalText = span.textContent;
                const originalIcon = icon.className;
                
                if (pillarType === 'constitutional') {
                    icon.className = 'fas fa-book-open';
                    span.textContent = 'Constitutional Protection';
                } else if (pillarType === 'institutional') {
                    icon.className = 'fas fa-university';
                    span.textContent = 'Institutional Autonomy';
                } else if (pillarType === 'decisional') {
                    icon.className = 'fas fa-gavel';
                    span.textContent = 'Decisional Freedom';
                }
                
                // Store original content for restoration
                shield.setAttribute('data-original-text', originalText);
                shield.setAttribute('data-original-icon', originalIcon);
            }
        });
        
        item.addEventListener('mouseleave', function() {
            // Remove all highlight classes
            const shield = document.querySelector('.shield-inner');
            if (shield) {
                shield.classList.remove('highlight-constitutional', 'highlight-institutional', 'highlight-decisional');
                
                // Restore original content
                const originalText = shield.getAttribute('data-original-text');
                const originalIcon = shield.getAttribute('data-original-icon');
                
                if (originalText && originalIcon) {
                    shield.querySelector('span').textContent = originalText;
                    shield.querySelector('i').className = originalIcon;
                }
            }
        });
    });
    
    // Add interactive scales of justice
    const scalesContainer = document.querySelector('.scales-container');
    
    if (scalesContainer) {
        // Animate scales slightly
        function animateScales() {
            const scalesBeam = document.querySelector('.scales-beam');
            const tiltAmount = 2; // degrees
            const duration = 3000; // milliseconds
            
            let tiltDirection = 1;
            
            function tilt() {
                scalesBeam.style.transform = `translateX(-50%) rotate(${tiltAmount * tiltDirection}deg)`;
                tiltDirection *= -1;
                setTimeout(tilt, duration);
            }
            
            // Start animation
            setTimeout(tilt, duration);
        }
        
        // Initialize scales animation
        animateScales();
    }
    
    // Add intersection observer for scroll animations
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Get delay attribute if exists
                const delay = entry.target.getAttribute('data-delay') || 0;
                
                // Apply animation with delay
                setTimeout(() => {
                    entry.target.classList.add('animated');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, delay);
                
                // Unobserve after animation is applied
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });
    
    // Set initial state and observe elements
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(element);
    });
    
    // Add CSS for highlight effects (since these are added dynamically)
    const style = document.createElement('style');
    style.textContent = `
        .shield-inner.highlight-constitutional {
            background: linear-gradient(135deg, rgba(59, 130, 246, 0.4) 0%, rgba(14, 165, 233, 0.6) 100%);
            box-shadow: 0 0 30px rgba(59, 130, 246, 0.5);
        }
        
        .shield-inner.highlight-institutional {
            background: linear-gradient(135deg, rgba(99, 102, 241, 0.4) 0%, rgba(79, 70, 229, 0.6) 100%);
            box-shadow: 0 0 30px rgba(99, 102, 241, 0.5);
        }
        
        .shield-inner.highlight-decisional {
            background: linear-gradient(135deg, rgba(16, 185, 129, 0.4) 0%, rgba(5, 150, 105, 0.6) 100%);
            box-shadow: 0 0 30px rgba(16, 185, 129, 0.5);
        }
    `;
    document.head.appendChild(style);
});