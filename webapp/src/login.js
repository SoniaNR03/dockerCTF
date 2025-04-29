export function showLogin() {
    document.querySelector("#app").innerHTML = `
        <div class="registration-container">
            <div class="form-container login-form">
                <form>
                    <h1 id="login-title">Login</h1>
                    <input type="text" id="log-username" placeholder="User">
                    <input type="password" id="log-password" placeholder="Password">
                    <p class="error-message" id="login-error"></p>
                    <button id="login-button">Log In</button>
                </form>
            </div>
            <div class="form-container signup-form">
                <form>
                    <h1>Register</h1>
                    <input type="text" id="reg-username" placeholder="User">
                    <input type="password" id="reg-password" placeholder="Password">
                    <p class="error-message" id="reg-error"></p>
                    <button id="signup-button">Registrarse</button>
                </form>
            </div>
            <div class="toggle-container">
                <div class="toggle">
                    <div class="toggle-panel toggle-right">
                        <h1>¡Comienza Ahora!</h1>
                        <p>Regístrate si todavía no lo has hecho para poder acceder a las distintas CTFs.</p>
                        <img id="user-logo" src="./icons/person.svg" alt="">
                        <button id="register-log-button">Registrarse</button>
                    </div>
                    <div class="toggle-panel toggle-left">
                        <h1>Bienvenido</h1>
                        <p>Ya estás registrado, accede a todas las funciones.</p>
                        <button id="login-register-button">LogIn</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.querySelector("#login-button").addEventListener("click", login);
    document.querySelector("#signup-button").addEventListener("click", register);
    document.querySelector("#register-log-button").addEventListener("click", toggleToLogin);
    document.querySelector("#login-register-button").addEventListener("click", toggleToRegister);
}

async function login(event) {
    event.preventDefault();

    const username = document.querySelector("#log-username").value.trim();
    const password = document.querySelector("#log-password").value.trim();
    const errorMessageElement = document.querySelector("#login-error");
    try {
        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        console.log(data)
        if (response.ok) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("username", username);
            location.reload(); // Reload the page to show the CTFs
        } else {
            if (data.error === "User or Password Missing") {
                errorMessageElement.innerText = "Falta usuario o contraseña";
                errorMessageElement.classList.add("show");
            } else {
                errorMessageElement.innerText = "Usuario o contraseña incorrectos";
                errorMessageElement.classList.add("show");
            }
        }
    } catch (error) {
        console.error("Error while login:", error);
    }
}

async function register() {
    event.preventDefault();
    const username = document.querySelector("#reg-username").value.trim();
    const password = document.querySelector("#reg-password").value.trim();
    const errorMessageElement = document.querySelector("#reg-error");
    try {
        const response = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        console.log(data)
        if (response.ok) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("username", username);
            location.reload(); // Reload the page to show the CTFs
        } else {
            if (data.error === "User already exists") {
                errorMessageElement.innerText = "El usuario ya existe";
                errorMessageElement.classList.add("show");
            } else if (data.error === "User or Password Missing") {
                errorMessageElement.innerText = "Faltan usuario o contraseña";
                errorMessageElement.classList.add("show");
            } else if (data.error === "User cannot contain spaces") {
                errorMessageElement.innerText = "El nombre del usuario no puede contener espacios";
                errorMessageElement.classList.add("show");
            }
        }
    } catch (error) {
        console.error("Error while register:", error);
    }
}

async function toggleToLogin() {
    const container = document.querySelector('.registration-container')
    const errorMessageElement = document.querySelector("#login-error");
    errorMessageElement.classList.remove("show");
    container.classList.add("active");
}

async function toggleToRegister() {
    const container = document.querySelector('.registration-container')
    const errorMessageElement = document.querySelector("#reg-error");
    errorMessageElement.classList.remove("show");
    container.classList.remove("active");
}
