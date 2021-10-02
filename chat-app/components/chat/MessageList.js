import { MessageItem } from './MessageItem.js';

class MessageList {
  $container = document.createElement('div');

  constructor() {}

  addMessage = (message) => {
    if (!message) return;
    const item = new MessageItem(message.content, message.sender);
    this.$container.appendChild(item.$container);
  };
  clearMessages = () => {
    this.$container.innerHTML = '';
  };
}

export { MessageList };
