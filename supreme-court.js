/**
 * Supreme Court page specific JavaScript
 * This file handles all interactive elements specific to the Supreme Court page
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initJudgesSlider();
    initAccordion();
    initScrollAnimations();
    initBackToTop();
});

/**
 * Navigation functionality
 */
function initNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const searchToggle = document.querySelector('.search-toggle');
    const searchForm = document.querySelector('.search-form');
    const dropdowns = document.querySelectorAll('.dropdown');

    // Mobile menu toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mainNav.classList.toggle('active');
            
            // Close search if open
            if (searchForm.classList.contains('active')) {
                searchForm.classList.remove('active');
            }
        });
    }

    // Search toggle
    if (searchToggle) {
        searchToggle.addEventListener('click', function() {
            searchForm.classList.toggle('active');
            
            // Focus search input when opened
            if (searchForm.classList.contains('active')) {
                searchForm.querySelector('input').focus();
            }
        });
    }

    // Handle dropdowns
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        // For mobile - tap to open dropdown
        link.addEventListener('click', function(e) {
            if (window.innerWidth < 992) {
                e.preventDefault();
                this.parentNode.classList.toggle('active');
                
                // Close other dropdowns
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown && otherDropdown.classList.contains('active')) {
                        otherDropdown.classList.remove('active');
                    }
                });
            }
        });
        
        // For desktop - hover functionality
        dropdown.addEventListener('mouseenter', function() {
            if (window.innerWidth >= 992) {
                this.classList.add('active');
            }
        });
        
        dropdown.addEventListener('mouseleave', function() {
            if (window.innerWidth >= 992) {
                this.classList.remove('active');
            }
        });
    });

    // Close menus when clicking outside
    document.addEventListener('click', function(e) {
        if (!mainNav.contains(e.target) && !menuToggle.contains(e.target)) {
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                menuToggle.classList.remove('active');
            }
            
            dropdowns.forEach(dropdown => {
                if (dropdown.classList.contains('active') && window.innerWidth < 992) {
                    dropdown.classList.remove('active');
                }
            });
        }
        
        if (!searchForm.contains(e.target) && !searchToggle.contains(e.target)) {
            if (searchForm.classList.contains('active')) {
                searchForm.classList.remove('active');
            }
        }
    });
}

/**
 * Judges slider functionality
 */
function initJudgesSlider() {
    const slider = document.querySelector('.judges-slider');
    const prevButton = document.querySelector('.prev-slide');
    const nextButton = document.querySelector('.next-slide');
    const dots = document.querySelectorAll('.dot');
    
    if (!slider || !prevButton || !nextButton) return;
    
    let currentSlide = 0;
    const slides = [
        {
            image: 'images/chief-justice.jpg',
            name: 'Hon. Chief Justice Bheki Maphalala',
            title: 'Chief Justice',
            bio: 'Appointed in 2015, Chief Justice Maphalala has over 30 years of legal experience and has made significant contributions to Eswatini\'s judicial system.',
            profileLink: 'judges/chief-justice.html'
        },
        {
            image: 'images/justice-dlamini.jpg',
            name: 'Hon. Justice Sipho Dlamini',
            title: 'Justice of the Supreme Court',
            bio: 'Justice Dlamini joined the Supreme Court in 2018, bringing expertise in constitutional law and human rights from his previous role at the High Court.',
            profileLink: 'judges/justice-dlamini.html'
        },
        {
            image: 'images/justice-nkosi.jpg',
            name: 'Hon. Justice Themba Nkosi',
            title: 'Justice of the Supreme Court',
            bio: 'With over 25 years in the legal profession, Justice Nkosi specializes in commercial law and has authored numerous landmark judgments.',
            profileLink: 'judges/justice-nkosi.html'
        },
        {
            image: 'images/justice-zwane.jpg',
            name: 'Hon. Justice Elizabeth Zwane',
            title: 'Justice of the Supreme Court',
            bio: 'Appointed in 2020, Justice Zwane brings a wealth of experience in family law and gender justice from her previous role as a High Court judge.',
            profileLink: 'judges/justice-zwane.html'
        }
    ];
    
    // Update slide content
    function updateSlide() {
        const slideData = slides[currentSlide];
        const slideHTML = `
            <div class="judge-image-container">
                <img src="${slideData.image}" alt="${slideData.name}" class="judge-image">
            </div>
            <div class="judge-info">
                <h3>${slideData.name}</h3>
                <p class="judge-title">${slideData.title}</p>
                <p class="judge-bio">${slideData.bio}</p>
                <a href="${slideData.profileLink}" class="btn-outline">View Profile</a>
            </div>
        `;
        
        // Animate slide change
        slider.innerHTML = '';
        const judgeCard = document.createElement('div');
        judgeCard.className = 'judge-card fade-in';
        judgeCard.style.animationDelay = '0s';
        judgeCard.innerHTML = slideHTML;
        slider.appendChild(judgeCard);
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Initialize first slide
    updateSlide();
    
    // Handle next button
    nextButton.addEventListener('click', function() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlide();
    });
    
    // Handle previous button
    prevButton.addEventListener('click', function() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlide();
    });
    
    // Handle dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentSlide = index;
            updateSlide();
        });
    });
    
    // Auto-rotate slides
    let slideInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlide();
    }, 8000);
    
    // Pause auto-rotation when hovering over slider
    slider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    slider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            updateSlide();
        }, 8000);
    });
}

/**
 * Accordion functionality for procedure guide
 */
function initAccordion() {
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', function() {
            // Toggle current item
            const isActive = item.classList.contains('active');
            
            // Close all items first
            accordionItems.forEach(accItem => {
                accItem.classList.remove('active');
            });
            
            // If the clicked item wasn't active, make it active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    // Open first accordion by default
    if (accordionItems.length > 0) {
        accordionItems[0].classList.add('active');
    }
}

/**
 * Scroll animations
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in:not(.info-card)');
    
    // Add staggered animation delay based on position
    animatedElements.forEach((element, index) => {
        element.style.animationDelay = `${0.2 + (index * 0.1)}s`;
        element.style.animationPlayState = 'paused';
    });
    
    // Check if element is in viewport and animate
    function checkInView() {
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.animationPlayState = 'running';
            }
        });
    }
    
    // Initial check
    checkInView();
    
    // Check on scroll
    window.addEventListener('scroll', checkInView);
}

/**
 * Back to top button
 */
function initBackToTop() {
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (!backToTopButton) return;
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    // Smooth scroll to top
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}