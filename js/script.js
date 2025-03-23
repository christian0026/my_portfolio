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
