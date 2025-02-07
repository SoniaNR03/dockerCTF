export async function fetchAndDisplayData(element) {
  try {
    const response = await fetch("http://localhost:3000"); // Llamada al backend
    const data = await response.json(); // Convertir respuesta a JSON

    console.log(data)
    // const h1 = document.createElement("h1");
    // h1.textContent = data.message; // Mostrar el mensaje del backend
    // element.appendChild(h1);
  } catch (error) {
    console.error("ERROR:", error);
  }
}
