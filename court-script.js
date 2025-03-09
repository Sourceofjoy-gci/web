// Court Pages JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    // Division tabs functionality
    const divisionTabs = document.querySelectorAll('.division-tab');
    const divisionContents = document.querySelectorAll('.division-content');
    
    divisionTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs and contents
            divisionTabs.forEach(t => t.classList.remove('active'));
            divisionContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Get the division data attribute
            const division = this.getAttribute('data-division');
            
            // Show corresponding content
            document.getElementById(`${division}-content`).classList.add('active');
        });
    });
    
    // FAQ accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        // Set initial height to 0
        answer.style.maxHeight = '0px';
        
        question.addEventListener('click', function() {
            // Toggle active class on the item
            item.classList.toggle('active');
            
            // Toggle the answer visibility
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = '0px';
            }
            
            // Close other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = '0px';
                }
            });
        });
    });
    
    // Animate on scroll functionality
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const intersectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const delay = element.getAttribute('data-delay') || 0;
                
                setTimeout(() => {
                    element.classList.add('animated');
                }, delay);
                
                observer.unobserve(element);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        intersectionObserver.observe(element);
    });
    
    // Process steps timeline animation
    const timelineSteps = document.querySelectorAll('.process-step');
    
    function animateTimeline() {
        timelineSteps.forEach((step, index) => {
            setTimeout(() => {
                step.style.opacity = '0';
                step.style.transform = 'translateX(-20px)';
                
                setTimeout(() => {
                    step.style.opacity = '1';
                    step.style.transform = 'translateX(0)';
                    step.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                }, 50);
            }, index * 200);
        });
    }
    
    // Add interactive hover effects to resource and info cards
    const resourceCards = document.querySelectorAll('.resource-card');
    const infoCards = document.querySelectorAll('.info-card');
    
    resourceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.resource-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.resource-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0)';
            }
        });
    });
    
    infoCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.info-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.info-icon');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });
    
    // Court stats counter animation
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateStats() {
        statNumbers.forEach(stat => {
            const targetValue = parseInt(stat.textContent);
            let currentValue = 0;
            const duration = 2000; // 2 seconds
            const interval = 50; // update every 50ms
            const increment = targetValue / (duration / interval);
            
            // Preserve the "+" sign if it exists
            const hasPlus = stat.textContent.includes('+');
            
            function updateCounter() {
                currentValue += increment;
                if (currentValue >= targetValue) {
                    currentValue = targetValue;
                    clearInterval(counter);
                }
                
                stat.textContent = Math.floor(currentValue) + (hasPlus ? '+' : '');
            }
            
            const counter = setInterval(updateCounter, interval);
        });
    }
    
    // Initialize animations when elements come into view
    const courtIntro = document.querySelector('.court-intro');
    if (courtIntro) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(courtIntro);
    }
    
    const timelineContainer = document.querySelector('.process-timeline');
    if (timelineContainer) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateTimeline();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(timelineContainer);
    }
    
    // Judge card interactions
    const judgeCards = document.querySelectorAll('.judge-card');
    
    judgeCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add a subtle glow effect to the image
            const image = this.querySelector('.judge-image');
            if (image) {
                image.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.3)';
                image.style.transition = 'box-shadow 0.3s ease';
            }
            
            // Highlight the expertise tags
            const tags = this.querySelectorAll('.expertise-tag');
            tags.forEach(tag => {
                tag.style.background = 'rgba(59, 130, 246, 0.2)';
                tag.style.transition = 'background 0.3s ease';
            });
        });
        
        card.addEventListener('mouseleave', function() {
            // Remove the glow effect
            const image = this.querySelector('.judge-image');
            if (image) {
                image.style.boxShadow = 'none';
            }
            
            // Reset the expertise tags
            const tags = this.querySelectorAll('.expertise-tag');
            tags.forEach(tag => {
                tag.style.background = 'rgba(59, 130, 246, 0.1)';
            });
        });
    });
});

