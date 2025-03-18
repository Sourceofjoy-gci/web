// Industrial Court of Appeal specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // FAQ accordion functionality - handles both existing and industrial FAQs
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            // Toggle current FAQ item
            this.setAttribute('aria-expanded', !isExpanded);
            answer.setAttribute('aria-hidden', isExpanded);
            
            // Handle max-height for smooth animation
            if (isExpanded) {
                answer.style.maxHeight = null;
            } else {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
            
            // Toggle icon 
            const icon = this.querySelector('.question-toggle i');
            if (icon) {
                if (isExpanded) {
                    icon.classList.remove('fa-minus');
                    icon.classList.add('fa-plus');
                } else {
                    icon.classList.remove('fa-plus');
                    icon.classList.add('fa-minus');
                }
            }
            
            // Optional: close other FAQs
            const allFaqItems = document.querySelectorAll('.faq-item');
            allFaqItems.forEach(item => {
                const thisQuestion = item.querySelector('.faq-question');
                const thisAnswer = item.querySelector('.faq-answer');
                const thisIcon = item.querySelector('.question-toggle i');
                
                // Skip the current item
                if (thisQuestion === this) return;
                
                // Close other items
                thisQuestion.setAttribute('aria-expanded', 'false');
                thisAnswer.setAttribute('aria-hidden', 'true');
                thisAnswer.style.maxHeight = null;
                
                // Reset other icons
                if (thisIcon) {
                    thisIcon.classList.remove('fa-minus');
                    thisIcon.classList.add('fa-plus');
                }
            });
        });
    });
    
    // Enhanced scroll animation with stagger effect
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    const animateOnScroll = function() {
        animateElements.forEach((element, index) => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            let delay = element.dataset.delay || 0;
            
            // Add stagger effect for contact items
            if (element.closest('.contact-details')) {
                delay = index * 100; // Stagger each contact item
            }
            
            // Add animation class when element is in viewport
            if (elementPosition < windowHeight - 100) {
                setTimeout(() => {
                    element.classList.add('animated');
                    
                    // Special animation for contact map
                    if (element.classList.contains('contact-map')) {
                        element.style.transform = 'scale(1)';
                        element.style.opacity = '1';
                    }
                }, parseInt(delay));
            }
        });
    };
    
    // Add hover effects for contact items
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.contact-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.contact-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0)';
            }
        });
    });
    
    // Smooth scroll for contact button
    const contactBtn = document.querySelector('.contact-btn');
    if (contactBtn) {
        contactBtn.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    }
    
    // Initial check and then on scroll with debounce
    let scrollTimeout;
    const debouncedAnimateOnScroll = function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(animateOnScroll, 10);
    };
    
    animateOnScroll();
    window.addEventListener('scroll', debouncedAnimateOnScroll);
});