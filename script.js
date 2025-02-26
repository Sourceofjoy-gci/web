// DOM Elements
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const dropdowns = document.querySelectorAll('.dropdown');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const servicesContainer = document.querySelector('.services-container');
const prevMemberBtn = document.querySelector('.prev-member-btn');
const nextMemberBtn = document.querySelector('.next-member-btn');
const membersContainer = document.querySelector('.members-container');
const newsItems = document.querySelectorAll('.news-item');
const newsDisplay = document.querySelector('.news-display');

// Mock news data
const newsData = [
    {
        id: 1,
        title: "Chief Justice M. Dlamini Calls for Stronger Judiciary",
        content: `<h4>Chief Justice M. Dlamini Calls for Stronger Judiciary</h4>
                 <p>In a recent address to legal professionals, Chief Justice M. Dlamini outlined a comprehensive plan for strengthening the judiciary in Eswatini. The plan includes court modernization initiatives, enhanced training for judicial officers, and improved access to justice for citizens across the Kingdom.</p>
                 <p>"Our judiciary must evolve to meet the changing needs of our society while upholding the constitutional values that bind us," stated the Chief Justice. The address highlighted several key areas of focus, including technological advancement, case management efficiency, and judicial independence.</p>
                 <p>The modernization plans are expected to roll out over the next fiscal year, with initial focus on the High Court and Supreme Court facilities.</p>
                 <p><strong>Date:</strong> February 15, 2025</p>`
    },
    {
        id: 2,
        title: "The Supreme Court issues new Procedural Rules",
        content: `<h4>The Supreme Court issues new Procedural Rules</h4>
                 <p>The Supreme Court of Eswatini has released updated guidelines for court processes aimed at streamlining procedures and reducing case backlog. These new rules, which take effect next month, include revised timeframes for filings, updated requirements for submissions, and new protocols for case management.</p>
                 <p>Legal practitioners are encouraged to familiarize themselves with these changes, which are designed to improve efficiency while maintaining procedural fairness. The Judiciary will be conducting information sessions for members of the legal profession in the coming weeks.</p>
                 <p>A comprehensive document detailing the changes is available for download on the Judiciary website.</p>
                 <p><strong>Date:</strong> February 10, 2025</p>`
    },
    {
        id: 3,
        title: "Virtual Hearings Expanded in Response to Pandemic",
        content: `<h4>Virtual Hearings Expanded in Response to Pandemic</h4>
                 <p>The Eswatini Judiciary has announced an expansion of virtual court services following positive outcomes from initial implementation. The initiative, which began as a response to public health concerns, has demonstrated benefits including increased access to justice for rural communities and reduced case processing times.</p>
                 <p>"What started as a necessity has evolved into an opportunity to modernize our judicial processes," noted the Registrar of the High Court. "We've seen particular success in civil matters and certain types of applications."</p>
                 <p>The expansion will include additional virtual courtrooms, enhanced digital infrastructure, and training programs for both judicial officers and legal practitioners.</p>
                 <p><strong>Date:</strong> February 5, 2025</p>`
    },
    {
        id: 4,
        title: "Judges, Magistrates Appointed to Address Case Backlog",
        content: `<h4>Judges, Magistrates Appointed to Address Case Backlog</h4>
                 <p>In a move to reduce delays in the justice system, the Judicial Service Commission has announced the appointment of three new High Court judges and five magistrates. The appointments, which received royal assent last week, are specifically targeted at addressing the case backlog that has accumulated in recent years.</p>
                 <p>The new judicial officers bring diverse expertise, with specializations including commercial law, criminal law, and family law. "These appointments reflect our commitment to enhancing the capacity and efficiency of our courts," said the Chairman of the Judicial Service Commission.</p>
                 <p>The new appointees will assume their roles following a formal swearing-in ceremony scheduled for next month.</p>
                 <p><strong>Date:</strong> January 28, 2025</p>`
    },
    {
        id: 5,
        title: "E-Filing System to Launch in High Court",
        content: `<h4>E-Filing System to Launch in High Court</h4>
                 <p>As part of ongoing digital transformation initiatives, the Judiciary of Eswatini has announced the implementation of an Electronic Filing System in the High Court. The system, which will go live in phases beginning next quarter, will allow legal practitioners to file documents electronically, pay filing fees online, and access case information remotely.</p>
                 <p>"This represents a significant step forward in our modernization efforts," explained the IT Director for the Judiciary. "The e-filing system will reduce administrative burdens, minimize physical paper handling, and ultimately speed up case processing."</p>
                 <p>Training sessions for legal practitioners will be conducted in partnership with the Law Society of Eswatini prior to the system launch.</p>
                 <p><strong>Date:</strong> January 20, 2025</p>`
    }
];

// Mobile Menu Toggle
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Dropdown Toggle for Mobile
if (dropdowns.length > 0) {
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                this.classList.toggle('active');
            }
        });
    });
}

// Services Slider
let serviceSlidePosition = 0;
const serviceSlides = document.querySelectorAll('.service-card');
const serviceSlideWidth = serviceSlides.length > 0 ? serviceSlides[0].offsetWidth + 20 : 0; // including gap

function moveServiceSlider() {
    if (servicesContainer) {
        servicesContainer.style.transform = `translateX(-${serviceSlidePosition * serviceSlideWidth}px)`;
        servicesContainer.style.transition = 'transform 0.5s ease';
    }
}

if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
        if (serviceSlidePosition > 0) {
            serviceSlidePosition--;
            moveServiceSlider();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (serviceSlidePosition < serviceSlides.length - (window.innerWidth > 768 ? 3 : 1)) {
            serviceSlidePosition++;
            moveServiceSlider();
        }
    });
}

// Members Slider
let memberSlidePosition = 0;
const memberSlides = document.querySelectorAll('.member-card');
const memberSlideWidth = memberSlides.length > 0 ? memberSlides[0].offsetWidth + 20 : 0; // including gap

function moveMemberSlider() {
    if (membersContainer) {
        membersContainer.style.transform = `translateX(-${memberSlidePosition * memberSlideWidth}px)`;
        membersContainer.style.transition = 'transform 0.5s ease';
    }
}

if (prevMemberBtn && nextMemberBtn) {
    prevMemberBtn.addEventListener('click', () => {
        if (memberSlidePosition > 0) {
            memberSlidePosition--;
            moveMemberSlider();
        }
    });

    nextMemberBtn.addEventListener('click', () => {
        if (memberSlidePosition < memberSlides.length - (window.innerWidth > 768 ? 4 : 1)) {
            memberSlidePosition++;
            moveMemberSlider();
        }
    });
}

// News Items
if (newsItems.length > 0) {
    // Set initial active news item
    updateNewsDisplay(1);
    
    newsItems.forEach(item => {
        item.addEventListener('click', function() {
            const newsId = this.getAttribute('data-id');
            
            // Update active class
            newsItems.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
            
            // Update news display
            updateNewsDisplay(newsId);
        });
    });
}

function updateNewsDisplay(newsId) {
    const news = newsData.find(item => item.id == newsId);
    if (news && newsDisplay) {
        newsDisplay.innerHTML = news.content;
    }
}

// Add scroll effect for header
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.background = 'var(--primary-dark)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.background = 'var(--gradient-dark)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Responsive adjustments
window.addEventListener('resize', function() {
    // Reset positions for sliders on window resize
    serviceSlidePosition = 0;
    memberSlidePosition = 0;
    moveServiceSlider();
    moveMemberSlider();
    
    // Close mobile menu if window is resized larger
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
    }
});

// Add subtle animations on scroll
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.welcome-card, .service-card, .value-card, .member-card');
    
    // Initial check for elements in viewport
    checkAnimations();
    
    // Check elements on scroll
    window.addEventListener('scroll', checkAnimations);
    
    function checkAnimations() {
        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            } else {
                element.style.opacity = '0';
                element.style.transform = 'translateY(20px)';
            }
        });
    }
    
    // Set initial opacity and transform for animated elements
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
});

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            window.scrollTo({
                top: target.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});
// JavaScript for Enhanced Judiciary Structure Features

document.addEventListener('DOMContentLoaded', function() {
    // Feature Tabs Functionality
    const featureTabs = document.querySelectorAll('.feature-tab');
    const featurePanels = document.querySelectorAll('.feature-panel');
    
    featureTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs and panels
            featureTabs.forEach(t => t.classList.remove('active'));
            featurePanels.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Get data-tab attribute
            const tabId = this.getAttribute('data-tab');
            
            // Activate corresponding panel
            document.getElementById(`${tabId}-panel`).classList.add('active');
        });
    });
    
    // Animate Structure Cards on Scroll
    const structureCards = document.querySelectorAll('.structure-card');
    const specializedItems = document.querySelectorAll('.specialized-item');
    const accessFeatures = document.querySelectorAll('.access-feature');
    
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.9 &&
            rect.bottom >= 0
        );
    }
    
    // Function to animate elements when they enter viewport
    function animateOnScroll() {
        // Animate structure cards
        structureCards.forEach(card => {
            if (isInViewport(card) && !card.classList.contains('animate')) {
                card.classList.add('animate');
            }
        });
        
        // Animate specialized items with delay
        specializedItems.forEach((item, index) => {
            if (isInViewport(item) && !item.classList.contains('animate')) {
                setTimeout(() => {
                    item.classList.add('animate');
                }, index * 150);
            }
        });
        
        // Animate access features with delay
        accessFeatures.forEach((feature, index) => {
            if (isInViewport(feature) && !feature.classList.contains('animate')) {
                setTimeout(() => {
                    feature.classList.add('animate');
                }, index * 200);
            }
        });
    }
    
    // Initial check on page load
    animateOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Add hover interaction to structure cards
    structureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add pulsing effect to court icon
            const icon = this.querySelector('.court-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            // Remove pulsing effect
            const icon = this.querySelector('.court-icon');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });
    
    // Animate appeals flow
    const appealSteps = document.querySelectorAll('.appeal-step');
    if (appealSteps.length > 0) {
        function animateAppeals() {
            const appealsPanel = document.getElementById('appeals-panel');
            if (appealsPanel && appealsPanel.classList.contains('active')) {
                appealSteps.forEach((step, index) => {
                    setTimeout(() => {
                        step.style.opacity = '0';
                        step.style.transform = 'translateY(20px)';
                        step.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        
                        setTimeout(() => {
                            step.style.opacity = '1';
                            step.style.transform = 'translateY(0)';
                        }, 50);
                    }, index * 300);
                });
            }
        }
        
        // Run animation when appeals tab is clicked
        document.querySelector('.feature-tab[data-tab="appeals"]').addEventListener('click', animateAppeals);
    }
    
    // Add interactive hover effect to specialized items
    specializedItems.forEach(item => {
        const icon = item.querySelector('.specialized-icon');
        
        item.addEventListener('mouseenter', function() {
            if (icon) {
                icon.style.transform = 'rotateY(180deg)';
                icon.style.transition = 'transform 0.5s ease';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            if (icon) {
                icon.style.transform = 'rotateY(0)';
            }
        });
    });
});
