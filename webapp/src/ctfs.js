import './style.css'
import { runCTF, stopCTF, getConfig, sendFlag, stopAllCTFs } from './manager.js'
import { showLogin } from './login.js'

export async function loadCTFs() {
  const config = await getConfig();
  console.log(config);
  const user_id = localStorage.getItem("username");
  document.querySelector('#app').innerHTML = `
            <div class="ctfs-container">
                <h1>TFG - CTF with Docker</h1>
                <h2>Welcome, ${user_id}</h2>
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
                <button id="logout">Logout</button>
            </div>
        `;

  document.querySelector("#logout").addEventListener("click", logout);

  document.querySelectorAll('.startContainer').forEach(button => {
    button.addEventListener('click', async () => {
      const id = button.id;
      console.log('Starting challenge:', id);
      try {
        await runCTF(id, user_id);
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
        await stopCTF(id, user_id);
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
        taskElement.classList.remove("error");
        taskElement.classList.add("success");
      } else {

        taskElement.classList.remove("success");
        taskElement.classList.add("error");
      }
    });
  });

  document.querySelectorAll("input[type=text].sendFlag").forEach(input => {
    input.addEventListener('keydown', async (event) => {
      if (event.key === 'Enter') {
        const result = await sendFlag(input.id, input.value.trim());
        const taskElement = document.querySelector(`#task-${input.id}`);
        if (result === true) {
          taskElement.classList.remove("error");
          taskElement.classList.add("success");
        } else {
          taskElement.classList.remove("success");
          taskElement.classList.add("error");
        }
      }
    });
  });
}

async function logout() {
  const response = await stopAllCTFs();
  if (response) {
    localStorage.removeItem("token");
    showLogin();
  }
}
