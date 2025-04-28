document.addEventListener('DOMContentLoaded', function() {
    // Get all the elements we want to animate
    const logo = document.querySelector('.logo');
    const navItems = document.querySelectorAll('.navlist li');
    const darkModeToggle = document.querySelector('#darkModeToggle');
    const heroImg = document.querySelector('.hero-left .hero-img');
    const heroRight = document.querySelector('.hero-right');
    
    // Function to animate with delay
    function animateWithDelay(element, animationClass, delay) {
      setTimeout(() => {
        element.style.animation = animationClass;
        element.style.opacity = 1;
      }, delay);
    }
    
    // Logo animation - now slides from top like nav items
    animateWithDelay(logo, 'slideFromTop 0.8s ease forwards', 500);
    
    // Nav items animation - one after another with longer delays
    navItems.forEach((item, index) => {
      animateWithDelay(item, 'slideFromTop 0.7s ease forwards', 1000 + (index * 300));
    });
    
    // Dark mode toggle animation
    animateWithDelay(darkModeToggle, 'fadeIn 0.7s ease forwards', 1000 + (navItems.length * 300) + 200);
    
    // Hero image slides in from left
    const navAnimationDuration = 1000 + (navItems.length * 300) + 600;
    animateWithDelay(heroImg, 'slideFromLeft 1.5s ease forwards', navAnimationDuration);
    
    // Hero right content fades in
    animateWithDelay(heroRight, 'fadeIn 1.8s ease forwards', navAnimationDuration + 700);
  });


const darkModeToggle = document.getElementById("darkModeToggle");
const darkModeIcon = document.getElementById("darkModeIcon");

// Check local storage for mode preference
if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
    darkModeIcon.textContent = "☀"; // Sun icon for light mode
}

darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        darkModeIcon.textContent = "☀"; // Sun icon for light mode
        localStorage.setItem("darkMode", "enabled");
    } else {
        darkModeIcon.textContent = "🌙"; // Moon icon for dark mode
        localStorage.setItem("darkMode", "disabled");
    }
});

// Add shadow to navbar when scrolling
window.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

// Contact Form Submission
document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Send email using EmailJS
    emailjs.send('service_1f0ia7n', 'template_1zh21ap', {
        to_email: 'christianfernandezxc2@gmail.com', // Replace with your Gmail address
        from_email: email,
        message: message
    })
    .then(function (response) {
        alert('Message sent successfully!');
        document.getElementById('contactForm').reset(); // Clear the form
    }, function (error) {
        alert('Failed to send message. Please try again.');
    });
});

// JavaScript for Project Image Sliders
document.addEventListener('DOMContentLoaded', function() {
    // Select all image sliders
    const projectImageSliders = document.querySelectorAll('.project-image-slider');
    
    projectImageSliders.forEach(slider => {
        const sliderImages = slider.querySelector('.slider-images');
        const images = slider.querySelectorAll('.slider-images img');
        const prevArrow = slider.querySelector('.slider-arrow.prev');
        const nextArrow = slider.querySelector('.slider-arrow.next');
        const dotsContainer = slider.querySelector('.slider-dots');
        
        // Exit if no images
        if (images.length <= 1) return;
        
        // Create dots for each image
        images.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = index === 0 ? 'slider-dot active' : 'slider-dot';
            dot.dataset.index = index;
            dotsContainer.appendChild(dot);
        });
        
        // Get dots after they're created
        const dots = slider.querySelectorAll('.slider-dot');
        
        // Slider state
        let currentSlide = 0;
        let autoSlideInterval;
        
        // Function to go to a specific slide
        function goToSlide(slideIndex) {
            if (slideIndex < 0) {
                slideIndex = images.length - 1;
            } else if (slideIndex >= images.length) {
                slideIndex = 0;
            }
            
            currentSlide = slideIndex;
            sliderImages.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            // Update active dot
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentSlide);
            });
        }
        
        // Start automatic sliding
        function startAutoSlide() {
            stopAutoSlide();
            autoSlideInterval = setInterval(() => {
                goToSlide(currentSlide + 1);
            }, 4000); // Change slide every 4 seconds
        }
        
        // Stop automatic sliding
        function stopAutoSlide() {
            clearInterval(autoSlideInterval);
        }
        
        // Arrow navigation
        prevArrow.addEventListener('click', (e) => {
            e.preventDefault();
            goToSlide(currentSlide - 1);
            stopAutoSlide();
            startAutoSlide();
        });
        
        nextArrow.addEventListener('click', (e) => {
            e.preventDefault();
            goToSlide(currentSlide + 1);
            stopAutoSlide();
            startAutoSlide();
        });
        
        // Dot navigation
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                goToSlide(parseInt(dot.dataset.index));
                stopAutoSlide();
                startAutoSlide();
            });
        });
        
        // Pause auto-sliding when hovering over slider
        slider.addEventListener('mouseenter', stopAutoSlide);
        slider.addEventListener('mouseleave', startAutoSlide);
        
        // Handle touch events for mobile swipe
        let touchStartX = 0;
        let touchEndX = 0;
        
        slider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoSlide();
        }, { passive: true });
        
        slider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            startAutoSlide();
        }, { passive: true });
        
        function handleSwipe() {
            if (touchStartX - touchEndX > 30) {
                // Swipe left - go to next slide
                goToSlide(currentSlide + 1);
            } else if (touchEndX - touchStartX > 30) {
                // Swipe right - go to previous slide
                goToSlide(currentSlide - 1);
            }
        }
        
        // Start the auto slide show
        startAutoSlide();
    });
});

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navContainer = document.querySelector('.nav-container');

menuToggle.addEventListener('click', () => {
    navContainer.classList.toggle('active');
    // Change icon based on menu state
    const icon = menuToggle.querySelector('i');
    if (navContainer.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when clicking on nav links
const navLinks = document.querySelectorAll('.navlist li a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navContainer.classList.remove('active');
        // Reset hamburger icon
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navContainer.classList.contains('active')) {
        navContainer.classList.remove('active');
        // Reset hamburger icon
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});