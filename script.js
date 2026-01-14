const form = document.getElementById("loginForm");
const message = document.getElementById("message");
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    if (email && password) {
      message.style.color = "green";
      message.textContent = " Inloggning lyckades! (prototyp)";
      localStorage.setItem("user", email);
      window.location.href = "dashboard.html";

    } else {
      message.style.color = "red";
      message.textContent = " Fyll i alla fält.";
    }
  });
}
if (window.location.pathname.includes("dashboard")) {
  const user = localStorage.getItem("user");
  if (!user) {
    window.location.href = "dashboard.html";
  }
}
const logoutBtn = document.getElementById("logout");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("user");
    window.location.href = "index.html";
  });
}
