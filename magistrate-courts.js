// magistrate-courts.js

document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality for jurisdiction section
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding tab pane
            const tabId = this.getAttribute('data-tab');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
    
    // Location map and tabs functionality
    const locationTabs = document.querySelectorAll('.location-tab');
    const locationInfos = document.querySelectorAll('.location-info');
    const mapMarkers = document.querySelectorAll('.map-marker');
    
    // Function to activate a location
    const activateLocation = (locationId) => {
        // Deactivate all locations
        locationTabs.forEach(tab => tab.classList.remove('active'));
        locationInfos.forEach(info => info.classList.remove('active'));
        mapMarkers.forEach(marker => marker.classList.remove('active'));
        
        // Activate selected location
        document.querySelector(`.location-tab[data-location="${locationId}"]`).classList.add('active');
        document.getElementById(`${locationId}-info`).classList.add('active');
        document.querySelector(`.map-marker[data-location="${locationId}"]`).classList.add('active');
    };
    
    // Add click events to location tabs
    locationTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const locationId = this.getAttribute('data-location');
            activateLocation(locationId);
        });
    });
    
    // Add click events to map markers
    mapMarkers.forEach(marker => {
        marker.addEventListener('click', function() {
            const locationId = this.getAttribute('data-location');
            activateLocation(locationId);
        });
    });
    
    // Make court positions interactive
    const courtPositions = document.querySelectorAll('.principal-position, .senior-position, .magistrate-position');
    
    courtPositions.forEach(position => {
        position.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.magistrate-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(360deg)';
            }
        });
        
        position.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.magistrate-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0)';
            }
        });
    });
    
    // Make appeal steps interactive
    const appealSteps = document.querySelectorAll('.appeal-step');
    
    appealSteps.forEach(step => {
        step.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
            this.style.boxShadow = 'var(--shadow-elevation)';
            
            const icon = this.querySelector('.step-icon');
            if (icon) {
                if (this.classList.contains('final')) {
                    icon.style.background = 'var(--accent-teal)';
                    icon.style.color = 'var(--dark-primary)';
                } else {
                    icon.style.background = 'var(--accent-blue)';
                    icon.style.color = 'var(--text-primary)';
                }
                icon.style.transform = 'rotate(360deg)';
            }
        });
        
        step.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.boxShadow = 'none';
            
            const icon = this.querySelector('.step-icon');
            if (icon) {
                icon.style.background = 'var(--dark-accent)';
                icon.style.color = this.classList.contains('final') ? 
                    'var(--accent-teal)' : 'var(--accent-blue)';
                icon.style.transform = 'rotate(0)';
            }
        });
    });
    
    // Make jurisdiction level items interactive
    const magistrateLevels = document.querySelectorAll('.magistrate-level');
    
    magistrateLevels.forEach(level => {
        level.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
            this.style.boxShadow = 'var(--shadow-elevation)';
            
            const icon = this.querySelector('.level-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1)';
            }
        });
        
        level.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.boxShadow = 'none';
            
            const icon = this.querySelector('.level-icon');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });
    
    // Make case items and limitation items interactive
    const caseItems = document.querySelectorAll('.case-item');
    const limitationItems = document.querySelectorAll('.limitation-item');
    
    caseItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = 'var(--shadow-elevation)';
            
            const icon = this.querySelector('.case-icon');
            if (icon) {
                icon.style.background = 'var(--accent-blue)';
                icon.style.color = 'var(--text-primary)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
            
            const icon = this.querySelector('.case-icon');
            if (icon) {
                icon.style.background = 'var(--dark-primary)';
                icon.style.color = 'var(--accent-blue)';
            }
        });
    });
    
    limitationItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = 'var(--shadow-elevation)';
            
            const icon = this.querySelector('.limitation-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
            
            const icon = this.querySelector('.limitation-icon');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });
    
    // Make aspect items interactive
    const aspectItems = document.querySelectorAll('.aspect');
    
    aspectItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = 'var(--shadow-elevation)';
            
            const icon = this.querySelector('.aspect-icon');
            if (icon) {
                icon.style.background = 'var(--accent-blue)';
                icon.style.color = 'var(--text-primary)';
                icon.style.transform = 'rotate(360deg)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
            
            const icon = this.querySelector('.aspect-icon');
            if (icon) {
                icon.style.background = 'var(--dark-accent)';
                icon.style.color = 'var(--accent-blue)';
                icon.style.transform = 'rotate(0)';
            }
        });
    });
    
    // FAQ accordion functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            // Close all questions
            faqQuestions.forEach(q => {
                q.setAttribute('aria-expanded', 'false');
                q.nextElementSibling.setAttribute('aria-hidden', 'true');
                
                // Reset toggle icon
                const toggle = q.querySelector('.question-toggle');
                if (toggle) toggle.style.transform = 'rotate(0deg)';
            });
            
            // If the clicked question wasn't expanded, expand it
            if (!isExpanded) {
                this.setAttribute('aria-expanded', 'true');
                this.nextElementSibling.setAttribute('aria-hidden', 'false');
                
                // Rotate toggle icon
                const toggle = this.querySelector('.question-toggle');
                if (toggle) toggle.style.transform = 'rotate(45deg)';
            }
        });
    });
    
    // Initialize the first FAQ item as open
    if (faqQuestions.length > 0) {
        faqQuestions[0].setAttribute('aria-expanded', 'true');
        faqQuestions[0].nextElementSibling.setAttribute('aria-hidden', 'false');
        
        // Rotate toggle icon for first question
        const firstToggle = faqQuestions[0].querySelector('.question-toggle');
        if (firstToggle) firstToggle.style.transform = 'rotate(45deg)';
    }
    
    // Animation on scroll
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    const animateOnScroll = function() {
        animateElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            const delay = element.dataset.delay || 0;
            
            if (elementPosition < windowHeight - 100) {
                setTimeout(() => {
                    element.classList.add('active');
                }, delay);
            }
        });
    };
    
    // Initial check for elements in view
    animateOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Contact button hover effect
    const contactButtons = document.querySelectorAll('.contact-btn');
    
    contactButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'translateX(5px)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'translateX(0)';
            }
        });
    });
    
    // Location directions button hover effect
    const directionButtons = document.querySelectorAll('.location-directions');
    
    directionButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.background = 'var(--dark-primary)';
            this.style.color = 'var(--accent-teal)';
            this.style.boxShadow = '0 0 0 2px var(--accent-teal)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.background = 'var(--accent-teal)';
            this.style.color = 'var(--dark-primary)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId !== '#') {
                e.preventDefault();
                
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Mobile navigation toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Dropdown menu on mobile
    const dropdownLinks = document.querySelectorAll('.dropdown > a');
    
    dropdownLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (window.innerWidth < 992) {
                e.preventDefault();
                this.nextElementSibling.classList.toggle('show');
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-menu') && !e.target.closest('.menu-toggle') && navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (menuToggle) {
                menuToggle.classList.remove('active');
            }
        }
    });
});
