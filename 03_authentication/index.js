import { Chat } from './components/chat.js';
import { Login } from './components/login.js';

const app = document.getElementById('app');

function setScreen($container) {
  app.innerHTML = '';
  app.appendChild($container);
}

firebase.auth().onAuthStateChanged(function (user) {
  console.log(user);
  if (user) {
    // User is signed in.
    const displayName = user.displayName;
    const email = user.email;
    const emailVerified = user.emailVerified;
    const uid = user.uid;
    console.log(displayName, email, uid, emailVerified);

    const chatScreen = new Chat();
    setScreen(chatScreen.$container);
  } else {
    const loginScreen = new Login();
    setScreen(loginScreen.$container);
  }
});

export { setScreen };
