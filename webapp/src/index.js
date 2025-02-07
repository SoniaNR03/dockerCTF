import './style.css'
import { fetchAndDisplayData } from './counter.js'

document.querySelector('#app').innerHTML = `
  <div>
      <button id="counter" type="button"></button>
  </div>
`

fetchAndDisplayData(document.querySelector('#counter'));

