//Light Mode - Dark Mode

const themeToggleButton = document.getElementById("toggle-btn");
const themeToggleText = document.getElementById("toggle-text");
const currentTheme = localStorage.getItem("theme");

if (currentTheme === "light") {
  document.body.classList.add("light-mode");
  themeToggleText.textContent = "Dark Mode";
} else {
  document.body.classList.remove("light-mode");
  themeToggleText.textContent = "Light Mode";
}

themeToggleButton.addEventListener("click", () => {
  if (document.body.classList.contains("light-mode")) {
    document.body.classList.remove("light-mode");
    themeToggleText.textContent = "Light Mode";
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.add("light-mode");
    themeToggleText.textContent = "Dark Mode";
    localStorage.setItem("theme", "light");
  }
});
