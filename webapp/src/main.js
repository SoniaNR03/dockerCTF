// import './style.css';
// import { init } from './init.js';

// init(); // 🔹 Esto generará el HTML en #app inmediatamente

// // Función para hacer fetch
// const fetchData = async (endpoint) => {
//   try {
//     const response = await fetch(`/api/${endpoint}`);
//     if (!response.ok) throw new Error(`Error: ${response.status}`);

//     const data = await response.json();
//     document.querySelector('#output').textContent = JSON.stringify(data, null, 2);
//   } catch (error) {
//     document.querySelector('#output').textContent = `Error: ${error.message}`;
//   }
// };

// // Asignar eventos a los botones (después de que init() generó el HTML)
// document.querySelector('#btn1').addEventListener('click', () => fetchData('data1'));
// document.querySelector('#btn2').addEventListener('click', () => fetchData('data2'));
// document.querySelector('#btn3').addEventListener('click', () => fetchData('data3'));

import './style.css'
import { runCTF, stopCTF, getConfig } from './manager.js'

init();

async function init() {
  const config = await getConfig();
  console.log(config);

  document.querySelector('#app').innerHTML = `
            <div>
                <h1>TFG - CTF with Docker</h1>
                <h2>Sonia Navas Rutete</h2>
                <h3>${process.env.USER_ID}</h3>
                <div id="tasks">
                    ${Object.entries(config).map(([index, ctf]) => `
                        <div class="task">
                            <h3>${ctf.name}</h3>
                            <p>${ctf.description}</p>
                            <button class="startContainer" id="${ctf.id}" 
                            ${!ctf.available ? 'disabled' : ''}>
                                Start
                            </button>
                            <button class="stopContainer" id="${ctf.id}" 
                            ${!ctf.available ? 'disabled' : ''}>
                                Stop
                            </button>
                            <input type="text" id="flag${index}" placeholder="Introduce flag">
                            <button>Enviar Flag</button>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

  // TODO: ADD IF LAB NOT AVAILABLE, DISABLE BUTTONS FOCUS
  document.querySelectorAll('.startContainer').forEach(button => {
    button.addEventListener('click', async () => {
      const id = button.id;
      console.log('Starting challenge:', id);
      try {
        await runCTF(id, "user_id");
      } catch (error) {
        console.error('Error starting challenge:', error);
      }
    });
  });

  document.querySelectorAll('.stopContainer').forEach(button => {
    button.addEventListener('click', async () => {
      const id = button.id;
      console.log('Stoping challenge:', id);
      try {
        await stopCTF(id, "user_id");
      } catch (error) {
        console.error('Error starting challenge:', error);
      }
    });
  });

}