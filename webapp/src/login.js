export function showLogin() {
    document.querySelector("#app").innerHTML = `
        <div>
            <h2>Iniciar sesión</h2>
            <input type="text" id="username" placeholder="Usuario">
            <input type="password" id="password" placeholder="Contraseña">
            <button id="loginButton">Ingresar</button>
            <p id="loginError" class="error-message"></p>
        </div>
    `;

    document.querySelector("#loginButton").addEventListener("click", login);
}
// TODO: ADD REGISTER AND LOGIN SEPARATELY
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
            document.querySelector("#loginError").textContent = "Usuario o contraseña incorrectos";
        }
    } catch (error) {
        console.error("Error en login:", error);
    }
}

