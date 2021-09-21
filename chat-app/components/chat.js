import { ConversationList } from './chat/ConversationList.js';
import { InputGroup } from './shared/inputGroup.js';

class Chat {
  $container = document.createElement('div');
  $conversationList = new ConversationList();

  constructor() {
    this.$container.appendChild(this.$conversationList.$container);
  }
}
export { Chat };

// $btnLogout = document.createElement('button');
// this.$container.appendChild(this.$btnLogout);
// this.$btnLogout.innerHTML = 'Logout';
// this.$btnLogout.type = 'submit';
// this.$btnLogout.addEventListener('click', () => firebase.auth().signOut());
