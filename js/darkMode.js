const darkModeBtn = document.querySelector("#toggle-dark-mode");
let DARK_MODE = localStorage.getItem("DARK_MODE");

function toggleDarkMode() {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    darkModeBtn.checked = true;
    localStorage.setItem("DARK_MODE", "enabled");
  } else {
    darkModeBtn.checked = false;
    localStorage.removeItem("DARK_MODE");
  }
}

if (DARK_MODE !== null) {
  toggleDarkMode();
}

darkModeBtn.addEventListener("click", toggleDarkMode);
