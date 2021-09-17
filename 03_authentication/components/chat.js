import { InputGroup } from './shared/inputGroup.js';

class Chat {
  $container = document.createElement('div');

  $txtTitle = document.createElement('h1');

  $btnLogout = document.createElement('button');

  constructor() {
    this.$txtTitle.innerHTML = 'Chat-app';

    this.$btnLogout.innerHTML = 'Logout';
    this.$btnLogout.type = 'submit';
    this.$btnLogout.addEventListener('click', () => firebase.auth().signOut());

    this.$container.appendChild(this.$txtTitle);
    this.$container.appendChild(this.$btnLogout);
  }
}
export { Chat };
