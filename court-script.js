/**
 * Court Pages Interactive Scripts
 * Handles interactive elements specific to court pages including:
 * - Process flow navigation
 * - Division tabs functionality
 * - Accordion for mobile process view
 * - Smooth scroll effects
 */

document.addEventListener('DOMContentLoaded', function() {
    // Court Process Flow Interactivity
    initProcessFlow();
    
    // Court Division Tabs
    initDivisionTabs();
    
    // Mobile Process Accordion
    initProcessAccordion();
    
    // Add scroll animations
    initScrollAnimations();
    
    // FAQ toggle
    initFaqToggle();
});

/**
 * Initialize Process Flow with improved horizontal scrolling and navigation
 */
function initProcessFlow() {
    const processFlow = document.getElementById('process-flow');
    const processSteps = document.querySelectorAll('.process-step');
    const prevBtn = document.getElementById('prev-step');
    const nextBtn = document.getElementById('next-step');
    const stepIndicators = document.querySelectorAll('.process-nav-dot');
    const currentStepEl = document.getElementById('current-step');
    const scrollHintLeft = document.getElementById('scroll-hint-left');
    const scrollHintRight = document.getElementById('scroll-hint-right');
    
    if (processSteps.length === 0) return;
    
    let currentStep = 1;
    let isScrolling = false;
    
    // Initialize steps and controls
    function initializeProcess() {
        // Show first step as active
        highlightStep(1);
        
        // Set up button click handlers
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', goToPrevStep);
            nextBtn.addEventListener('click', goToNextStep);
        }
        
        // Set up indicator click handlers
        stepIndicators.forEach(dot => {
            dot.addEventListener('click', function() {
                const step = parseInt(this.getAttribute('data-step'));
                goToStep(step);
            });
        });
        
        // Set up key navigation
        document.addEventListener('keydown', function(e) {
            if (isElementInViewport(processFlow)) {
                if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                    goToPrevStep();
                } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                    goToNextStep();
                }
            }
        });
        
        // Set up touch swipe events
        let touchStartX = 0;
        let touchEndX = 0;
        
        processFlow.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        processFlow.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
        
        function handleSwipe() {
            const threshold = 75; // Minimum swipe distance
            
            if (touchEndX + threshold < touchStartX) {
                // Swipe left (next)
                goToNextStep();
            } else if (touchEndX > touchStartX + threshold) {
                // Swipe right (prev)
                goToPrevStep();
            }
        }
        
        // Auto-hide scroll hints after 3 seconds
        setTimeout(() => {
            if (scrollHintLeft) scrollHintLeft.classList.remove('visible');
            if (scrollHintRight) scrollHintRight.classList.remove('visible');
        }, 3000);
        
        // Add scroll event listener to show/hide scroll hints
        if (processFlow) {
            processFlow.addEventListener('scroll', handleProcessScroll);
            // Initialize scroll position
            handleProcessScroll();
        }
    }
    
    // Handle scroll event to show/hide scroll hints and update active step
    function handleProcessScroll() {
        if (!processFlow || isScrolling) return;
        
        // Show/hide scroll hints based on scroll position
        const scrollLeft = processFlow.scrollLeft;
        const maxScroll = processFlow.scrollWidth - processFlow.clientWidth;
        
        if (scrollHintLeft) {
            scrollHintLeft.classList.toggle('visible', scrollLeft > 50);
        }
        
        if (scrollHintRight) {
            scrollHintRight.classList.toggle('visible', scrollLeft < maxScroll - 50);
        }
        
        // Determine which step is most visible
        let mostVisibleStep = 1;
        let maxVisibility = 0;
        
        processSteps.forEach((step, index) => {
            const stepNum = index + 1;
            const rect = step.getBoundingClientRect();
            const flowRect = processFlow.getBoundingClientRect();
            
            // Calculate how much of the step is visible in the viewport
            const leftPosition = Math.max(rect.left, flowRect.left);
            const rightPosition = Math.min(rect.right, flowRect.right);
            const visibleWidth = Math.max(0, rightPosition - leftPosition);
            
            // Factor in the center position (prefer centered items)
            const centerFactor = 1 - Math.abs((rect.left + rect.width / 2) - (flowRect.left + flowRect.width / 2)) / flowRect.width;
            const visibility = visibleWidth * centerFactor;
            
            if (visibility > maxVisibility) {
                maxVisibility = visibility;
                mostVisibleStep = stepNum;
            }
        });
        
        // Update active step if needed
        if (mostVisibleStep !== currentStep) {
            highlightStep(mostVisibleStep, false);
        }
    }
    
    // Go to specific step
    function goToStep(stepNumber) {
        if (stepNumber < 1 || stepNumber > processSteps.length) return;
        
        const targetStep = document.querySelector(`.process-step[data-step="${stepNumber}"]`);
        
        if (targetStep) {
            isScrolling = true;
            
            // Calculate the center position
            const container = processFlow;
            const containerWidth = container.offsetWidth;
            const targetLeft = targetStep.offsetLeft - (containerWidth / 2) + (targetStep.offsetWidth / 2);
            
            // Smooth scroll to target
            container.scrollTo({
                left: targetLeft,
                behavior: 'smooth'
            });
            
            // Update state after scroll completes
            setTimeout(() => {
                highlightStep(stepNumber);
                isScrolling = false;
            }, 500);
        }
    }
    
    // Go to previous step
    function goToPrevStep() {
        if (currentStep > 1) {
            goToStep(currentStep - 1);
        }
    }
    
    // Go to next step
    function goToNextStep() {
        if (currentStep < processSteps.length) {
            goToStep(currentStep + 1);
        }
    }
    
    // Highlight current step and update UI
    function highlightStep(stepNumber, scroll = true) {
        currentStep = stepNumber;
        
        // Update step classes
        processSteps.forEach(step => {
            const stepNum = parseInt(step.getAttribute('data-step'));
            
            step.classList.remove('active', 'complete');
            
            if (stepNum === currentStep) {
                step.classList.add('active');
            } else if (stepNum < currentStep) {
                step.classList.add('complete');
            }
        });
        
        // Update indicators
        stepIndicators.forEach(dot => {
            const stepNum = parseInt(dot.getAttribute('data-step'));
            
            dot.classList.remove('active');
            
            if (stepNum === currentStep) {
                dot.classList.add('active');
            }
        });
        
        // Update counter
        if (currentStepEl) {
            currentStepEl.textContent = currentStep;
        }
        
        // Update button states
        if (prevBtn) {
            prevBtn.disabled = currentStep === 1;
        }
        
        if (nextBtn) {
            nextBtn.disabled = currentStep === processSteps.length;
        }
        
        // Update mobile accordion
        updateMobileAccordion(stepNumber);
        
        // Scroll to the step if needed
        if (scroll) {
            goToStep(stepNumber);
        }
    }
    
    // Update mobile accordion to match current step
    function updateMobileAccordion(stepNumber) {
        const accordionItems = document.querySelectorAll('.accordion-item');
        
        accordionItems.forEach(item => {
            const itemStep = parseInt(item.getAttribute('data-step'));
            item.classList.remove('active');
            
            const content = item.querySelector('.accordion-content');
            if (content) {
                content.style.display = 'none';
            }
            
            if (itemStep === stepNumber) {
                item.classList.add('active');
                if (content) {
                    content.style.display = 'block';
                }
            }
        });
    }
    
    // Helper function to check if element is in viewport
    function isElementInViewport(el) {
        if (!el) return false;
        
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Add special hover effects for steps
    processSteps.forEach(step => {
        step.addEventListener('mouseenter', function() {
            const stepNumber = parseInt(this.getAttribute('data-step'));
            
            // Add hover class (don't change current step)
            this.classList.add('hover');
            
            // Show visual cue that it's clickable
            this.style.cursor = 'pointer';
        });
        
        step.addEventListener('mouseleave', function() {
            this.classList.remove('hover');
        });
        
        // Add click to navigate
        step.addEventListener('click', function() {
            const stepNumber = parseInt(this.getAttribute('data-step'));
            goToStep(stepNumber);
        });
    });
    
    // Initialize
    initializeProcess();
    
    // Center the active step on window resize
    window.addEventListener('resize', function() {
        if (!isScrolling) {
            goToStep(currentStep);
        }
    });
    
    // Auto-navigate functionality (uncomment to enable automatic progression)
    /*
    let autoNavigateInterval;
    
    function startAutoNavigate() {
        autoNavigateInterval = setInterval(() => {
            if (currentStep < processSteps.length) {
                goToNextStep();
            } else {
                // Reset to beginning when reaching the end
                goToStep(1);
            }
        }, 5000); // Change every 5 seconds
    }
    
    function stopAutoNavigate() {
        clearInterval(autoNavigateInterval);
    }
    
    // Start auto-navigation and stop on user interaction
    startAutoNavigate();
    
    processFlow.addEventListener('mouseenter', stopAutoNavigate);
    processFlow.addEventListener('touchstart', stopAutoNavigate);
    
    processFlow.addEventListener('mouseleave', startAutoNavigate);
    */
}

/**
 * Initialize Division Tabs
 */
function initDivisionTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    if (tabButtons.length === 0) return;
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));
            
            // Add active class to current button
            this.classList.add('active');
            
            // Show corresponding panel
            const tabId = this.getAttribute('data-tab');
            const targetPanel = document.getElementById(`${tabId}-tab`);
            
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
}

/**
 * Initialize Process Accordion for Mobile
 */
function initProcessAccordion() {
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    if (accordionItems.length === 0) return;
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');
        
        if (header && content) {
            header.addEventListener('click', function() {
                // Check if this item is already active
                const isActive = item.classList.contains('active');
                
                // Close all items
                accordionItems.forEach(accItem => {
                    accItem.classList.remove('active');
                    const accContent = accItem.querySelector('.accordion-content');
                    if (accContent) {
                        accContent.style.display = 'none';
                    }
                });
                
                // If clicked item wasn't active, open it
                if (!isActive) {
                    item.classList.add('active');
                    content.style.display = 'block';
                }
            });
        }
    });
    
    // Open first accordion item by default
    if (accordionItems.length > 0) {
        accordionItems[0].classList.add('active');
        const firstContent = accordionItems[0].querySelector('.accordion-content');
        if (firstContent) {
            firstContent.style.display = 'block';
        }
    }
}

/**
 * Initialize scroll animations
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.jurisdiction-card, .requirement-card, .stat-card, .judge-card');
    
    if (animatedElements.length === 0) return;
    
    // Set initial state and add transition
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Check if elements are in viewport
    function checkAnimation() {
        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Check on load and scroll
    window.addEventListener('load', checkAnimation);
    window.addEventListener('scroll', checkAnimation);
}

/**
 * Initialize FAQ toggle functionality
 */
function initFaqToggle() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length === 0) return;
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-toggle i');
        
        if (question && answer && icon) {
            // Hide all answers initially
            answer.style.display = 'none';
            
            question.addEventListener('click', function() {
                // Toggle answer visibility
                if (answer.style.display === 'none') {
                    // Close all other FAQs
                    faqItems.forEach(faq => {
                        const faqAnswer = faq.querySelector('.faq-answer');
                        const faqIcon = faq.querySelector('.faq-toggle i');
                        
                        if (faqAnswer && faqAnswer !== answer) {
                            faqAnswer.style.display = 'none';
                        }
                        
                        if (faqIcon && faqIcon !== icon) {
                            faqIcon.className = 'fas fa-plus';
                        }
                        
                        faq.classList.remove('active');
                    });
                    
                    // Open this FAQ
                    answer.style.display = 'block';
                    icon.className = 'fas fa-minus';
                    item.classList.add('active');
                } else {
                    // Close this FAQ
                    answer.style.display = 'none';
                    icon.className = 'fas fa-plus';
                    item.classList.remove('active');
                }
            });
        }
    });
}
/**
 * Court Process Journey Interactive Script
 * Handles the interactive journey map, flip cards, and navigation
 */
document.addEventListener('DOMContentLoaded', function() {
    initJourneyMap();
});

/**
 * Initialize the interactive journey map
 */
function initJourneyMap() {
    // Elements
    const stageCards = document.querySelectorAll('.journey-stage');
    const stationMarkers = document.querySelectorAll('.journey-svg circle');
    const mainPath = document.getElementById('main-path');
    const prevBtn = document.getElementById('prev-stage');
    const nextBtn = document.getElementById('next-stage');
    const progressFill = document.querySelector('.progress-fill');
    const currentStageEl = document.getElementById('current-stage');
    
    // Mobile elements
    const mobileStageNumber = document.querySelector('.mobile-stage-number');
    const mobileProgressFill = document.querySelector('.mobile-progress-fill');
    const mobilePrevBtn = document.querySelector('.mobile-prev-btn');
    const mobileNextBtn = document.querySelector('.mobile-next-btn');
    const mobileStageCards = document.querySelector('.mobile-stage-cards');
    
    // Initialize variables
    let currentStage = 1;
    const totalStages = stageCards.length;
    let isAnimating = false;
    
    // Clone cards for mobile view
    if (mobileStageCards) {
        stageCards.forEach(stage => {
            const stageClone = stage.cloneNode(true);
            mobileStageCards.appendChild(stageClone);
            
            // Attach events to clone
            const detailsBtn = stageClone.querySelector('.stage-details-btn');
            const closeBtn = stageClone.querySelector('.close-details-btn');
            
            if (detailsBtn) {
                detailsBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    stageClone.classList.add('flipped');
                });
            }
            
            if (closeBtn) {
                closeBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    stageClone.classList.remove('flipped');
                });
            }
        });
        
        // Initialize mobile swipe
        initMobileSwipe();
    }
    
    // Animate path on load
    if (mainPath) {
        setTimeout(() => {
            mainPath.classList.add('animate');
        }, 500);
    }
    
    // Initialize first stage
    goToStage(1);
    
    // Add event listeners
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', goToPrevStage);
        nextBtn.addEventListener('click', goToNextStage);
    }
    
    if (mobilePrevBtn && mobileNextBtn) {
        mobilePrevBtn.addEventListener('click', goToPrevStage);
        mobileNextBtn.addEventListener('click', goToNextStage);
    }
    
    // Add flip card functionality
    stageCards.forEach(stage => {
        const detailsBtn = stage.querySelector('.stage-details-btn');
        const closeBtn = stage.querySelector('.close-details-btn');
        
        if (detailsBtn) {
            detailsBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                stage.classList.add('flipped');
            });
        }
        
        if (closeBtn) {
            closeBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                stage.classList.remove('flipped');
            });
        }
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            goToPrevStage();
        } else if (e.key === 'ArrowRight') {
            goToNextStage();
        } else if (e.key === 'Escape') {
            // Close any flipped cards
            stageCards.forEach(stage => {
                stage.classList.remove('flipped');
            });
        }
    });
    
    /**
     * Go to a specific stage
     */
    function goToStage(stageNumber) {
        if (isAnimating || stageNumber < 1 || stageNumber > totalStages) return;
        isAnimating = true;
        
        // Update current stage
        currentStage = stageNumber;
        
        // Update stage cards
        stageCards.forEach(stage => {
            const stageNum = parseInt(stage.getAttribute('data-stage'));
            stage.classList.remove('active');
            stage.classList.remove('flipped');
            
            if (stageNum === currentStage) {
                stage.classList.add('active');
            }
        });
        
        // Update station markers
        stationMarkers.forEach((marker, index) => {
            const stageNum = index + 1;
            marker.classList.remove('active', 'completed');
            
            if (stageNum === currentStage) {
                marker.classList.add('active');
            } else if (stageNum < currentStage) {
                marker.classList.add('completed');
            }
        });
        
        // Update progress bar
        const progressPercentage = ((currentStage - 1) / (totalStages - 1)) * 100;
        if (progressFill) progressFill.style.width = `${progressPercentage}%`;
        if (mobileProgressFill) mobileProgressFill.style.width = `${progressPercentage}%`;
        
        // Update current stage display
        if (currentStageEl) currentStageEl.textContent = currentStage;
        if (mobileStageNumber) mobileStageNumber.textContent = currentStage;
        
        // Update mobile view
        updateMobileView();
        
        // Update button states
        updateButtonStates();
        
        // Animation timeout
        setTimeout(() => {
            isAnimating = false;
        }, 600);
    }
    
    /**
     * Go to the previous stage
     */
    function goToPrevStage() {
        if (currentStage > 1) {
            goToStage(currentStage - 1);
        }
    }
    
    /**
     * Go to the next stage
     */
    function goToNextStage() {
        if (currentStage < totalStages) {
            goToStage(currentStage + 1);
        }
    }
    
    /**
     * Update button states based on current stage
     */
    function updateButtonStates() {
        if (prevBtn) prevBtn.disabled = currentStage === 1;
        if (nextBtn) nextBtn.disabled = currentStage === totalStages;
        if (mobilePrevBtn) mobilePrevBtn.disabled = currentStage === 1;
        if (mobileNextBtn) mobileNextBtn.disabled = currentStage === totalStages;
    }
    
    /**
     * Update the mobile view to show current stage
     */
    function updateMobileView() {
        if (!mobileStageCards) return;
        
        const mobileStages = mobileStageCards.querySelectorAll('.journey-stage');
        mobileStages.forEach((stage, index) => {
            const stageNum = index + 1;
            
            if (stageNum === currentStage) {
                stage.style.display = 'block';
            } else {
                stage.style.display = 'none';
            }
        });
    }
    
    /**
     * Initialize mobile swipe functionality
     */
    function initMobileSwipe() {
        if (!mobileStageCards) return;
        
        let touchStartX = 0;
        let touchEndX = 0;
        
        mobileStageCards.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        mobileStageCards.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
        
        function handleSwipe() {
            if (isAnimating) return;
            
            const swipeThreshold = 75;
            
            if (touchEndX < touchStartX - swipeThreshold) {
                // Swipe left - next stage
                goToNextStage();
            } else if (touchEndX > touchStartX + swipeThreshold) {
                // Swipe right - previous stage
                goToPrevStage();
            }
        }
    }
    
    // Add resize handling
    window.addEventListener('resize', function() {
        updateMobileView();
    });
}
// Add to court-script.js

// Timeline Appeal Process Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the Supreme Court page
    const appealProcessSection = document.querySelector('.appeal-process-section');
    if (!appealProcessSection) return;

    const timelineSteps = document.querySelectorAll('.timeline-step');
    const progressBar = document.getElementById('timeline-progress-bar');
    const prevButton = document.getElementById('prev-step');
    const nextButton = document.getElementById('next-step');
    const currentStepDisplay = document.querySelector('.current-step');
    const totalSteps = timelineSteps.length;
    
    let currentStep = 1;
    
    // Initialize timeline
    function initTimeline() {
        // Set the total steps display
        document.querySelector('.total-steps').textContent = totalSteps;
        
        // Set the first step as active
        timelineSteps[0].classList.add('active');
        
        // Update controls state
        updateControls();
        
        // Update progress bar
        updateProgressBar();
        
        // Add scroll capability when in mobile view
        handleMobileScroll();
    }
    
    // Update active step
    function setActiveStep(step) {
        // Remove active class from all steps
        timelineSteps.forEach(step => step.classList.remove('active'));
        
        // Add active class to current step
        timelineSteps[step - 1].classList.add('active');
        
        // Scroll step into view for mobile
        if (window.innerWidth < 1200) {
            timelineSteps[step - 1].scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        }
        
        // Update current step display
        currentStepDisplay.textContent = step;
        
        // Update progress bar
        updateProgressBar();
        
        // Update controls state
        updateControls();
    }
    
    // Update progress bar width
    function updateProgressBar() {
        const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;
        progressBar.style.width = `${progressPercentage}%`;
    }
    
    // Update controls (enable/disable buttons)
    function updateControls() {
        prevButton.disabled = currentStep === 1;
        nextButton.disabled = currentStep === totalSteps;
    }
    
    // Handle mobile scrolling behavior
    function handleMobileScroll() {
        const timelineContainer = document.querySelector('.timeline-steps');
        
        if (window.innerWidth < 1200) {
            // On scroll, determine which step is most visible
            timelineContainer.addEventListener('scroll', debounce(function() {
                const containerCenter = timelineContainer.offsetLeft + (timelineContainer.offsetWidth / 2);
                
                let closestStep = 1;
                let closestDistance = Number.MAX_VALUE;
                
                timelineSteps.forEach((step, index) => {
                    const stepCenter = step.offsetLeft + (step.offsetWidth / 2);
                    const distance = Math.abs(containerCenter - stepCenter);
                    
                    if (distance < closestDistance) {
                        closestDistance = distance;
                        closestStep = index + 1;
                    }
                });
                
                if (closestStep !== currentStep) {
                    currentStep = closestStep;
                    setActiveStep(currentStep);
                }
            }, 100));
        }
    }
    
    // Helper for debouncing scroll events
    function debounce(func, wait) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(function() {
                func.apply(context, args);
            }, wait);
        };
    }
    
    // Event Listeners for Controls
    prevButton.addEventListener('click', function() {
        if (currentStep > 1) {
            currentStep--;
            setActiveStep(currentStep);
        }
    });
    
    nextButton.addEventListener('click', function() {
        if (currentStep < totalSteps) {
            currentStep++;
            setActiveStep(currentStep);
        }
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Only process if we're focused within the appeal process section
        if (!appealProcessSection.contains(document.activeElement)) return;
        
        // Left arrow or up arrow for previous step
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            if (currentStep > 1) {
                currentStep--;
                setActiveStep(currentStep);
            }
        }
        
        // Right arrow or down arrow for next step
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            if (currentStep < totalSteps) {
                currentStep++;
                setActiveStep(currentStep);
            }
        }
    });
    
    // Animation triggers for scroll
    function handleScrollAnimations() {
        const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    
                    // Get delay if specified
                    const delay = element.dataset.delay || 0;
                    
                    // Add visible class after delay
                    setTimeout(() => {
                        element.classList.add('visible');
                    }, delay);
                    
                    // Unobserve after animation
                    observer.unobserve(element);
                }
            });
        }, {
            threshold: 0.1
        });
        
        elementsToAnimate.forEach(element => {
            observer.observe(element);
        });
    }
    
    // Initialize timeline
    initTimeline();
    
    // Handle scroll animations
    handleScrollAnimations();
    
    // Handle window resize events
    window.addEventListener('resize', debounce(function() {
        handleMobileScroll();
    }, 200));
    
    // Add a subtle parallax effect on mouse move for desktop
    if (window.innerWidth >= 992) {
        appealProcessSection.addEventListener('mousemove', function(e) {
            const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
            const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
            
            document.querySelectorAll('.step-card').forEach(card => {
                const depth = parseFloat(card.dataset.depth || 1);
                card.style.transform = `translate(${moveX * depth}px, ${moveY * depth - 10}px)`;
            });
        });
    }
});