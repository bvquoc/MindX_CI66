import { ConversationItem } from './ConversationItem.js';
import { CreateConversationForm } from './createConversationForm.js';

class ConversationList {
  onConversationItemClick;
  conversationList = [];

  $container = document.createElement('div');
  $btnCreateConversation = document.createElement('button');
  $createConversationForm = new CreateConversationForm();
  $conversationList = document.createElement('div');

  constructor() {
    this.$btnCreateConversation.innerText = '+ create Conversation';

    this.$createConversationForm.setVisible(false);
    this.$btnCreateConversation.addEventListener('click', this.handleCreateConversation);

    this.$container.appendChild(this.$btnCreateConversation);
    this.$container.appendChild(this.$createConversationForm.$container);
    this.$container.appendChild(this.$conversationList);
  }

  setOnConversationItemClick = (listener) => {
    this.onConversationItemClick = listener;
  };

  handleCreateConversation = () => {
    this.$createConversationForm.setVisible(true);
  };

  handleConversationAdded = (id, name, users) => {
    const item = new ConversationItem(id, name, users);
    this.conversationList.push(item);
    item.setOnclick(() => {
      this.onConversationItemClick({
        id,
        name,
        users,
      });
    });
    this.$container.appendChild(item.$container);
  };

  handleConversationRemoved = (id) => {
    console.log('deleted', id);
    const deleteIdx = this.conversationList.findIndex((item) => item.id === id);
    if (deleteIdx < 0) return;
    this.conversationList[deleteIdx].delete();
    this.conversationList.splice(deleteIdx, 1);
  };

  setActiveConversation = (conversation) => {
    this.conversationList.forEach((item) => item.setHighlight(item.id === conversation.id));
  };
}

export { ConversationList };
