 const form = document.getElementById("loginForm");
const message = document.getElementById("message");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const account = JSON.parse(localStorage.getItem("account"));

    if (
      account &&
      email === account.email &&
      password === account.password
    ) {
      localStorage.setItem("user", email);
      window.location.href = "dashboard.html";
    } else {
      message.style.color = "red";
      message.textContent = "Fel e-post eller lösenord.";
    }
  });
}
const registerForm = document.getElementById("registerForm");
const registerMessage = document.getElementById("registerMessage");
if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;
    const goal = document.getElementById("goal").value;
    if (!email || !password) {
      registerMessage.style.color = "red";
      registerMessage.textContent = "Fyll i alla obligatoriska fält.";
      return;
    }
    const user = {
      email,
      password,
      goal
    };
    localStorage.setItem("account", JSON.stringify(user));
    registerMessage.style.color = "green";
    registerMessage.textContent = "Konto skapat! Du kan nu logga in.";
    setTimeout(() => {
      window.location.href = "index.html";
    }, 1000);
  });
}
if (window.location.pathname.includes("dashboard")) {
  const user = localStorage.getItem("user");
  if (!user) {
    window.location.href = "index.html";
  }
}
const logoutBtn = document.getElementById("logout");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("user");
    window.location.href = "index.html";
  });
}
if (window.location.pathname.includes("dashboard")) {
  const goalText = document.getElementById("userGoal");
  const account = JSON.parse(localStorage.getItem("account"));

  if (goalText && account && account.goal) {
    goalText.textContent = " Ditt mål: " + account.goal;
  }
}

if (window.location.pathname.includes("session")) {
  let time = 20 * 60; // 20 minuter
  let interval = null;

  const timerEl = document.getElementById("timer");
  const startBtn = document.getElementById("startSession");
  const endBtn = document.getElementById("endSession");

  function updateTimer() {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    timerEl.textContent =
      `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }

  startBtn.addEventListener("click", () => {
    if (interval) return;

    interval = setInterval(() => {
      time--;
      updateTimer();

      if (time <= 0) {
        clearInterval(interval);
        interval = null;
        alert("Bra jobbat! Pluggsession klar.");
        window.location.href = "dashboard.html";
      }
    }, 1000);
  });

  endBtn.addEventListener("click", () => {
    clearInterval(interval);
    window.location.href = "dashboard.html";
  });

  updateTimer();
}


