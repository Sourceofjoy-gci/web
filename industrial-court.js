// industrial-court.js

document.addEventListener('DOMContentLoaded', function() {
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

    // Enhanced animation for timeline items (if present)
    const timelineItems = document.querySelectorAll('.timeline-item');

    if (timelineItems.length > 0) {
        timelineItems.forEach((item, index) => {
            item.addEventListener('mouseenter', function() {
                // Add active class to the current item
                this.classList.add('active-timeline-item');

                // Highlight the timeline marker
                const marker = this.querySelector('.timeline-marker');
                if (marker) {
                    marker.style.background = 'var(--accent-teal)';
                    const span = marker.querySelector('span');
                    if (span) span.style.color = 'var(--text-primary)';
                }
            });

            item.addEventListener('mouseleave', function() {
                // Remove active class
                this.classList.remove('active-timeline-item');

                // Reset the timeline marker
                const marker = this.querySelector('.timeline-marker');
                if (marker) {
                    marker.style.background = 'var(--dark-tertiary)';
                    const span = marker.querySelector('span');
                    if (span) span.style.color = 'var(--accent-teal)';
                }
            });
        });
    }

    // Interactive court composition diagram (if present)
    const courtPositions = document.querySelectorAll('.president-position, .judge-position, .member-position, .chief-justice-position, .justice-position');

    if (courtPositions.length > 0) {
        courtPositions.forEach(position => {
            position.addEventListener('mouseenter', function() {
                // Scale and rotate icon on hover
                const positionIcon = this.querySelector('.position-icon, .justice-icon');
                if (positionIcon) {
                    positionIcon.style.transform = 'scale(1.2) rotate(360deg)';
                }
            });

            position.addEventListener('mouseleave', function() {
                // Reset icon on mouse leave
                const positionIcon = this.querySelector('.position-icon, .justice-icon');
                if (positionIcon) {
                    positionIcon.style.transform = 'scale(1) rotate(0)';
                }
            });
        });
    }

    // Function card hover effects (if present)
    const functionCards = document.querySelectorAll('.function-card, .powers-card');

    if (functionCards.length > 0) {
        functionCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                // Rotate icon on hover
                const functionIcon = this.querySelector('.function-icon, .powers-icon');
                if (functionIcon) {
                    functionIcon.style.transform = 'rotate(360deg)';
                }
            });

            card.addEventListener('mouseleave', function() {
                // Reset icon on mouse leave
                const functionIcon = this.querySelector('.function-icon, .powers-icon');
                if (functionIcon) {
                    functionIcon.style.transform = 'rotate(0deg)';
                }
            });
        });
    }

    // Resource card link animation (if present)
    const resourceLinks = document.querySelectorAll('.resource-link');

    if (resourceLinks.length > 0) {
        resourceLinks.forEach(link => {
            link.addEventListener('mouseenter', function() {
                // Move icon on hover
                const icon = this.querySelector('i');
                if (icon) {
                    icon.style.transform = 'translateX(5px)';
                }
            });

            link.addEventListener('mouseleave', function() {
                // Reset icon on mouse leave
                const icon = this.querySelector('i');
                if (icon) {
                    icon.style.transform = 'translateX(0)';
                }
            });
        });
    }

    // Enhanced process step interaction
    const processSteps = document.querySelectorAll('.process-step');

    if (processSteps.length > 0) {
        let currentStep = 0;

        // Initialize first step as active
        processSteps[0].classList.add('active');

        processSteps.forEach((step, index) => {
            step.addEventListener('mouseenter', function() {
                // Remove active class from all steps
                processSteps.forEach(s => s.classList.remove('active'));

                // Add active class to current and previous steps
                for (let i = 0; i <= index; i++) {
                    processSteps[i].classList.add('active');
                }

                // Update progress indicators
                processSteps.forEach((s, i) => {
                    const progress = s.querySelector('.step-progress');
                    if (progress) {
                        if (i <= index) {
                            progress.style.width = '100%';
                        } else {
                            progress.style.width = '0';
                        }
                    }
                });

                // Animate step icon
                const icon = this.querySelector('.step-icon');
                if (icon) {
                    icon.style.transform = 'rotate(360deg)';
                    setTimeout(() => {
                        icon.style.transform = 'rotate(0)';
                    }, 500);
                }
            });

            step.addEventListener('mouseleave', function() {
                // Reset to current progress state
                processSteps.forEach((s, i) => {
                    if (i <= currentStep) {
                        s.classList.add('active');
                    } else {
                        s.classList.remove('active');
                    }

                    const progress = s.querySelector('.step-progress');
                    if (progress) {
                        progress.style.width = i <= currentStep ? '100%' : '0';
                    }
                });
            });
        });

        // Auto-progress animation
        function progressStep() {
            if (currentStep < processSteps.length - 1) {
                currentStep++;

                processSteps.forEach((step, index) => {
                    if (index <= currentStep) {
                        step.classList.add('active');
                        const progress = step.querySelector('.step-progress');
                        if (progress) {
                            progress.style.width = '100%';
                        }
                    } else {
                        step.classList.remove('active');
                        const progress = step.querySelector('.step-progress');
                        if (progress) {
                            progress.style.width = '0';
                        }
                    }
                });
            } else {
                currentStep = -1; // Reset for next cycle
            }
        }

        // Progress every 3 seconds if no user interaction
        let progressInterval = setInterval(progressStep, 3000);

        // Pause auto-progress on user interaction
        const timelineContainer = document.querySelector('.process-timeline');
        if (timelineContainer) {
            timelineContainer.addEventListener('mouseenter', () => {
                clearInterval(progressInterval);
            });

            timelineContainer.addEventListener('mouseleave', () => {
                progressInterval = setInterval(progressStep, 3000);
            });
        }
    }

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

    if (dropdownLinks.length > 0) {
        dropdownLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                if (window.innerWidth < 992) {
                    e.preventDefault();
                    this.nextElementSibling.classList.toggle('show');
                }
            });
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-menu') && !e.target.closest('.menu-toggle') && navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (menuToggle) {
                menuToggle.classList.remove('active');
            }
        }
    });

    // Parallax effect for hero section
    const heroSection = document.querySelector('.court-hero');

    if (heroSection) {
        window.addEventListener('scroll', function() {
            if (window.innerWidth > 768) { // Only apply parallax on larger screens
                const scrollPosition = window.pageYOffset;
                heroSection.style.backgroundPositionY = (scrollPosition * 0.4) + 'px';
            }
        });
    }

    // Contact buttons hover effect
    const contactButtons = document.querySelectorAll('.contact-btn');

    if (contactButtons.length > 0) {
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
    }

    // Jurisdiction card hover effect
    const jurisdictionCards = document.querySelectorAll('.jurisdiction-card');

    if (jurisdictionCards.length > 0) {
        jurisdictionCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                const icon = this.querySelector('.jurisdiction-icon');
                if (icon) {
                    icon.style.transform = 'scale(1.1)';
                }
            });

            card.addEventListener('mouseleave', function() {
                const icon = this.querySelector('.jurisdiction-icon');
                if (icon) {
                    icon.style.transform = 'scale(1)';
                }
            });
        });
    }
});
