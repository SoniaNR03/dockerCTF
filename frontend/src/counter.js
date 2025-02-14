export function setupCounter(element) {
  element.addEventListener('click', async () => {
    try {
      const response = await fetch('http://localhost/api');
      const data = await response.text();
      element.innerHTML = data;
    } catch (error) {
      console.error('Error:', error);
      element.innerHTML = 'Error connecting to webapp';
    }
  });
}
