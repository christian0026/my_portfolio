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

