import { initializeApp } from
    "https://www.gstatic.com/firebasejs/12.17.0/firebase-app.js";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-auth.js";

import {
    getFirestore,
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCn-u6oINlHhRCgAJs1i3M__YOZgc6Pn5E",
    authDomain: "authentication-7e4c9.firebaseapp.com",
    projectId: "authentication-7e4c9",
    storageBucket: "authentication-7e4c9.firebasestorage.app",
    messagingSenderId: "401471563002",
    appId: "1:401471563002:web:1cdf59e6135441fdbd9543",
    measurementId: "G-E4LHFRVCQM"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Fine the HTML elements

const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const signupButton = document.querySelector("#signup-button")
const loginButton = document.querySelector("#login-button")

const resetButton = document.querySelector("#reset-button");
const logoutButton = document.querySelector("#logout-button");

const authSection = document.querySelector("#auth-section");
const accountSection = document.querySelector("#account-section");

const userEmail = document.querySelector("#user-email");
const message = document.querySelector("#message");
const taskList = document.querySelector("#task-list");

function showMessage(text, type) {
    message.textContent = text;
    message.className = type;
}

// Convert Firebase errors into messages
function getFriendlyError(errorCode) {
    const messages = {
        "auth/email-already-in-use":
            "An account already uses this email.",

        "auth/invalid-email":
            "Please enter a valid email address.",

        "auth/weak-password":
            "Your password must contain at least 6 characters.",

        "auth/invalid-credential":
            "The email or password is incorrect.",

        "auth/missing-password":
            "Please enter a password.",

        "auth/too-many-requests":
            "Too many attempts. Please wait and try again.",

        "auth/network-request-failed":
            "Please check your internet connection.",

        "auth/operation-not-allowed":
            "Email/password login is not enabled in Firebase.",
    };

    return messages[errorCode] || "Something went wrong. Please try again.";
}

// Create an account
signupButton.addEventListener("click", async function () {
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    try {
        await createUserWithEmailAndPassword(auth, email, password);

        showMessage("Your account was created!", "success");
        passwordInput.value = "";
    } catch (error) {
        showMessage(getFriendlyError(error.code), "error");
    }
});

// Log in
loginButton.addEventListener("click", async function () {
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    try {
        await signInWithEmailAndPassword(auth, email, password);

        showMessage("You are logged in!", "success");
        passwordInput.value = "";
    } catch (error) {
        showMessage(getFriendlyError(error.code), "error");
    }
});

resetButton.addEventListener("click", async function () {
    const email = emailInput.value.trim();

    if (email === "") {
        showMessage("Enter your email address first.", "error");
        return;
    }

    try {
        await sendPasswordResetEmail(auth, email);

        showMessage(
            "Check your email for a password-reset link.",
            "success"
        );
    } catch (error) {
        showMessage(getFriendlyError(error.code), "error");
    }
});

// Log out
logoutButton.addEventListener("click", async function () {
    try {
        await signOut(auth);
        showMessage("You are logged out.", "success");
    } catch (error) {
        showMessage(getFriendlyError(error.code), "error");
    }
});

async function showTasks() {
    // Find this user's tasks
    const tasks = collection(
        db,
        "users",
        auth.currentUser.uid,
        "tasks"
    );

    // Get the tasks from Firestore
    const results = await getDocs(tasks);

    // Clear the old list
    taskList.innerHTML = "";

    // Show each task on the page
    results.forEach(function (taskDocument) {
        const task = taskDocument.data();

        const listItem = document.createElement("li");
        listItem.textContent = task.title;

        taskList.appendChild(listItem);
    });
}

// Run whenever the authentication state changes
// State
onAuthStateChanged(auth, function (user) {
    if (user) {
        // A user is logged in
        authSection.classList.add("hidden");
        accountSection.classList.remove("hidden");

        userEmail.textContent = user.email;
        showTasks();
    } else {
        // No user is logged in
        authSection.classList.remove("hidden");
        accountSection.classList.add("hidden");

        userEmail.textContent = "";
    }
});
