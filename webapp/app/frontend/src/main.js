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
                await runCTF(id, process.env.USER_ID);
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
                await stopCTF(id, process.env.USER_ID);
            } catch (error) {
                console.error('Error starting challenge:', error);
            }
        });
    });

}