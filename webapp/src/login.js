export function showLogin() {
    document.querySelector("#app").innerHTML = `
        <div class="login-container">
            <h2>Login</h2>
            <input type="text" id="username" placeholder="User">
            <input type="password" id="password" placeholder="Password">
            <button id="loginButton">LogIn</button>
            <button id="registerButton">Register</button>
            <p id="loginError" class="error-message"></p>
        </div>
    `;

    document.querySelector("#loginButton").addEventListener("click", login);
    document.querySelector("#registerButton").addEventListener("click", register);
}

async function login() {
    const username = document.querySelector("#username").value.trim();
    const password = document.querySelector("#password").value.trim();

    try {
        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("username", username);
            location.reload(); // Reload the page to show the CTFs
        } else {
            document.querySelector("#loginError").textContent = "Incorrect user or password";
        }
    } catch (error) {
        console.error("Error while login:", error);
    }
}

async function register() {
    const username = document.querySelector("#username").value.trim();
    const password = document.querySelector("#password").value.trim();

    try {
        const response = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("username", username);
            location.reload(); // Reload the page to show the CTFs
        } else {
            // TODO: Improve error handling
            document.querySelector("#loginError").textContent = "Invalid user or password";
        }
    } catch (error) {
        console.error("Error while register:", error);
    }
}

