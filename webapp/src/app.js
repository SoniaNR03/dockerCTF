import { showLogin } from "./login.js";
import { loadCTFs } from "./ctfs.js";


async function init() {
    const token = localStorage.getItem("token");

    if (!token) {
        console.log("No token found. Showing login.");
        showLogin();
        return;
    }

    try {
        console.log("Verifying token...");
        const response = await fetch("/api/auth/verify", {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {

            console.log("Token Expired or Invalid. Logging out.");
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            showLogin();
            return;
        }

        await loadCTFs();
    } catch (error) {
        console.error("Error verifying token:", error);
        showLogin();
    }
}
init(); 
