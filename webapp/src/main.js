import './style.css'
import { runCTF, stopCTF, getConfig, sendFlag } from './manager.js'

init();

async function init() {
  const config = await getConfig();
  console.log(config);

  document.querySelector('#app').innerHTML = `
            <div>
                <h1>TFG - CTF with Docker</h1>
                <h2>Sonia Navas Rutete</h2>
                <div id="tasks">
                    ${Object.entries(config).map(([index, ctf]) => `
                        <div class="task" id="task-${ctf.id}">
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
                            <input type="text" class="sendFlag" id="${ctf.id}" placeholder="Introduce flag"${!ctf.available ? 'disabled' : ''}>
                            <button class="sendFlag" id="${ctf.id}"${!ctf.available ? 'disabled' : ''}>Send Flag</button>
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

  document.querySelectorAll('button.sendFlag').forEach(button => {
    button.addEventListener('click', async (event) => {
      const result = await sendFlag(button.id, document.querySelector(`input#${button.id}`).value.trim());
      const taskElement = document.querySelector(`#task-${button.id}`);
      if (result === true) {
        taskElement.classList.add("success");
        document.querySelector(`input#${button.id}`).classList.remove("error-border");
      } else {
        document.querySelector(`input#${button.id}`).classList.add("error-border");
        taskElement.classList.remove("success");
      }
    });
  });



  document.querySelectorAll("input[type=text].sendFlag").forEach(input => {
    input.addEventListener('keydown', async (event) => {
      if (event.key === 'Enter') {
        const result = await sendFlag(input.id, input.value.trim());
        const taskElement = document.querySelector(`#task-${input.id}`);
        if (result === true) {
          taskElement.classList.add("success");
          input.classList.remove("error-border");
        } else {
          input.classList.add("error-border");
          taskElement.classList.remove("success");
        }
      }
    });
  });
}