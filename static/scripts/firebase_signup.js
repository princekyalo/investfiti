// scripts/firebase_signup.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

let auth;

// Load Firebase configuration
async function loadFirebaseConfig() {
    const response = await fetch("/firebase_config.json");
    const config = await response.json();

    const app = initializeApp(config);
    auth = getAuth(app);
}

// Cookie utility
function setCookie(name, value, days = 7) {

    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));

    const expires = "expires=" + date.toUTCString();
    document.cookie = `${name}=${value};${expires};path=/`;

}

// Password confirmation validator
function validatePasswords() {

    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");

    if (confirmPassword.value !== password.value) {
        confirmPassword.setCustomValidity("Passwords do not match");
    } else {
        confirmPassword.setCustomValidity("");
    }

}

// Main signup handler
async function signupUser(event) {

    event.preventDefault();

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    const errorBox = document.getElementById("formError");
    errorBox.innerText = "";

    if (password !== confirmPassword) {
        errorBox.innerText = "Passwords do not match";
        return;
    }

    try {

        // Firebase only verifies email + password
        await createUserWithEmailAndPassword(auth, email, password);

        // Set login cookies
        const today = new Date().toISOString().split("T")[0];

        setCookie("loggedIn", "True", 7);
        setCookie("lastLogin", today, 7);

        // Redirect to homepage
        window.location.href = "/";

    } catch (error) {

        errorBox.innerText = error.message;

    }

}

// Initialization
document.addEventListener("DOMContentLoaded", async () => {

    await loadFirebaseConfig();

    const form = document.getElementById("signupForm");

    form.addEventListener("submit", signupUser);

    document
        .getElementById("confirmPassword")
        .addEventListener("input", validatePasswords);

});