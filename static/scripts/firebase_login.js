// scripts/firebase_login.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

let auth;

// Load Firebase configuration
async function loadFirebaseConfig() {

    const response = await fetch("/firebase_config.json");
    const config = await response.json();

    const app = initializeApp(config);
    auth = getAuth(app);

}

// Detect if user entered email or phone
function detectLoginType(value) {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9+]{7,15}$/;

    if (emailRegex.test(value)) {
        return "email";
    }

    if (phoneRegex.test(value)) {
        return "phone";
    }

    return "invalid";

}

// Cookie creator
function setCookie(name, value, days = 7) {

    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));

    const expires = "expires=" + date.toUTCString();

    document.cookie = `${name}=${value};${expires};path=/`;

}

// Login function
async function loginUser(event) {

    event.preventDefault();

    const loginInput = document.getElementById("loginInput").value.trim();
    const password = document.getElementById("password").value;

    const errorBox = document.getElementById("formError");

    errorBox.innerText = "";

    const loginType = detectLoginType(loginInput);

    if (loginType === "invalid") {
        errorBox.innerText = "Enter a valid email or phone number";
        return;
    }

    let emailForFirebase = loginInput;

    // Convert phone number to pseudo-email
    if (loginType === "phone") {
        emailForFirebase = `${loginInput}@phone.user`;
    }

    try {

        await signInWithEmailAndPassword(auth, emailForFirebase, password);

        const today = new Date().toISOString().split("T")[0];

        setCookie("loggedIn", "True", 7);
        setCookie("lastLogin", today, 7);

        window.location.href = "/";

    }
    catch (error) {

        errorBox.innerText = error.message;

    }

}

// Initialize
document.addEventListener("DOMContentLoaded", async () => {

    await loadFirebaseConfig();

    const form = document.getElementById("loginForm");

    form.addEventListener("submit", loginUser);

});