import { Composer } from './chat/Composer.js';
import { ConversationList } from './chat/ConversationList.js';
import { MessageList } from './chat/MessageList.js';
import { TitleBar } from './chat/TitleBar.js';
import { UserList } from './chat/UserList.js';

class Chat {
  activeConversation = null;
  unsubcribeMessages = null;

  $container = document.createElement('div');
  $conversationList = new ConversationList();
  $titleBar = new TitleBar();
  $composer = new Composer();
  $messageList = new MessageList();
  $userList = new UserList();

  constructor() {
    this.$container.appendChild(this.$conversationList.$container);
    this.$container.appendChild(this.$titleBar.$container);
    this.$container.appendChild(this.$composer.$container);
    this.$container.appendChild(this.$messageList.$container);
    this.$container.appendChild(this.$userList.$container);
    this.$conversationList.setOnConversationItemClick(this.setActiveConversation);
    this.subscribeConversations();
  }

  setActiveConversation = (conversation) => {
    if (this.activeConversation?.id === conversation.id) return;

    if (this.unsubcribeMessages) {
      this.unsubcribeMessages();
      this.unsubcribeMessages = null;
    }
    this.$messageList.clearMessages();

    this.activeConversation = conversation;
    this.$titleBar.setName(conversation.name);
    this.$conversationList.setActiveConversation(conversation);
    this.$composer.setActiveConverSation(conversation);
    this.$userList.setActiveConversation(conversation);
    this.subscribeMessages();
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
            this.$composer.setActiveConverSation(null);
          }
          this.$conversationList.handleConversationRemoved(deleteId);
        }
      });
    });
  };

  subscribeMessages = () => {
    this.unsubcribeMessages = db
      .collection('messages')
      .where('conversationId', '==', this.activeConversation.id)
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          const item = change.doc.data();
          if (change.type === 'added') {
            this.$messageList.addMessage(item);
          }
          if (change.type === 'removed') {
            // handle on remove messages
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
