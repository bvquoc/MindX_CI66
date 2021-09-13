import { Login } from './components/login.js';

const app = document.getElementById('app');

const loginScreen = new Login();
setScreen(loginScreen.$container);

function setScreen($container) {
  app.innerHTML = '';
  app.appendChild($container);
}

export { setScreen };
