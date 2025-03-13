export async function getConfig() {
  try {
    const response = await fetch('/api/config');
    const data = await response.json();
    return data;
  }
  catch (error) {
    console.error('Error:', error);
    return [];
  }
}

export function getCTF(element) {
  element.addEventListener('click', async () => {
    try {
      const response = await fetch('/api');
      const data = await response.text();
      element.innerHTML = data;
    } catch (error) {
      console.error('Error:', error);
      element.innerHTML = 'Error connecting to webapp';
    }
  });
}

export async function runCTF(element, user_id) {
  try {
    console.log('runCTF');
    const response = await fetch('/api/start', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ctfId: element, userId: user_id })
    });

    console.log(response);
    const data = await response.text();
    console.log(data);

    // Build the URL with the new port
    const newUrl = `http://${document.location.hostname}:${data}`;

    // New window
    window.open(newUrl, '_blank');
  } catch (error) {
    console.error('Error:', error);
  }

}

export async function stopCTF(element, user_id) {
  try {
    console.log('stopCTF');
    const response = await fetch('/api/stop', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ctfId: element, userId: user_id })
    });

    console.log(response);
    const data = await response.text();
    console.log(data);
    // TODO: Delete window
  } catch (error) {
    console.error('Error:', error);
  }

}
