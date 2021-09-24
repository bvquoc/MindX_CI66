import { ConversationList } from './chat/ConversationList.js';
import { TitleBar } from './chat/TitleBar.js';

class Chat {
  activeConversation = null;

  $container = document.createElement('div');
  $conversationList = new ConversationList();
  $titleBar = new TitleBar();

  constructor() {
    this.$container.appendChild(this.$conversationList.$container);
    this.$container.appendChild(this.$titleBar.$container);

    this.$conversationList.setOnConversationItemClick(this.setActiveConversation);
    this.subscribeConversations();
  }

  setActiveConversation = (conversation) => {
    if (this.activeConversation?.id === conversation.id) return;
    this.activeConversation = conversation;
    this.$titleBar.setName(conversation.name);
    this.$conversationList.setActiveConversation(conversation);
    console.log(this.activeConversation);
  };
  subscribeConversations = () => {
    db.collection('conversations').onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const item = change.doc.data();
        if (change.type === 'added') {
          this.$conversationList.handleConversationAdded(change.doc.id, item.name, item.users);
        }
        if (change.type === 'removed') {
          const deleteId = change.doc.id;
          if (deleteId === this.activeConversation?.id) {
            this.$titleBar.setName();
            this.activeConversation = null;
          }
          this.$conversationList.handleConversationRemoved(deleteId);
        }
      });
    });
  };
}
export { Chat };

// $btnLogout = document.createElement('button');
// this.$container.appendChild(this.$btnLogout);
// this.$btnLogout.innerHTML = 'Logout';
// this.$btnLogout.type = 'submit';
// this.$btnLogout.addEventListener('click', () => firebase.auth().signOut());
