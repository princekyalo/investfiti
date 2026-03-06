// -----------------------------
// Cookie Utilities
// -----------------------------

function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (let c of cookies) {
    const [key, value] = c.split("=");
    if (key === name) return value;
  }
  return null;
}

function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days * 86400000).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}


// -----------------------------
// Delay Helper
// -----------------------------

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


// -----------------------------
// Handle First Visit
// -----------------------------

async function handleVisitedSite() {

  const visited = getCookie("visitedSite");

  if (visited) {
    await delay(2000);
    window.location.href = "signup.html";
    return;
  }

  setCookie("visitedSite", "True", 30);
}


// -----------------------------
// Validate Last Login
// -----------------------------

async function validateLastLogin() {

  const lastLogin = getCookie("lastLogin");

  if (!lastLogin) {
    setCookie("lastLogin", new Date().toISOString(), 90);
    return;
  }

  const loginDate = new Date(lastLogin);
  const threeMonthsAgo = new Date(Date.now() - 90 * 86400000);

  if (loginDate < threeMonthsAgo) {
    window.location.href = "login.html";
    return;
  }

  // Update cookie to today's date
  setCookie("lastLogin", new Date().toISOString(), 90);
}


// -----------------------------
// Check Login Status
// -----------------------------

async function checkLoggedIn() {

  const loggedIn = getCookie("loggedIn");

  if (!loggedIn) {
    await handleVisitedSite();
    return;
  }

  await delay(5000);
  await validateLastLogin();
}


// -----------------------------
// Run Script on Page Load
// -----------------------------

checkLoggedIn();