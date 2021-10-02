class Composer {
  activeConverSation = null;

  $container = document.createElement('div');
  $form = document.createElement('form');
  $input = document.createElement('input');
  $btnEmoji = document.createElement('button');

  constructor() {
    this.$input.type = 'text';
    this.$input.placeholder = 'Type message...';
    this.$btnEmoji.textContent = '❤️';
    this.$btnEmoji.type = 'button';

    this.$container.appendChild(this.$form);

    this.$form.appendChild(this.$input);
    this.$form.appendChild(this.$btnEmoji);
    this.$form.addEventListener('submit', this.handleSubmit);

    this.$btnEmoji.addEventListener('click', this.handleBtnEmojiClick);
    this.$btnEmoji.style.cursor = 'pointer';
  }

  isValidConversation = () => {
    const isValid = firebase.auth().currentUser.email && this.activeConverSation;
    if (!isValid) throw new Error('Active a conversation please!');
    console.log('Active Conversation:', this.activeConverSation.id);
    return isValid;
  };

  setActiveConverSation = (conversation) => {
    this.activeConverSation = conversation;
  };

  handleBtnEmojiClick = () => {
    if (!this.isValidConversation()) return;
    db.collection('messages').add({
      content: this.$btnEmoji.textContent,
      sender: firebase.auth().currentUser.email,
      conversationId: this.activeConverSation.id,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (!(this.$input.value && this.isValidConversation())) return;

    db.collection('messages').add({
      content: this.$input.value,
      sender: firebase.auth().currentUser.email,
      conversationId: this.activeConverSation.id,
    });
    this.$input.value = '';

    // Content - sender - active - active conversation
  };
}

export { Composer };
