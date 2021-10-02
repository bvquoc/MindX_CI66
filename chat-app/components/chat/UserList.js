class UserList {
  activeConversation = null;

  $container = document.createElement('div');

  $form = document.createElement('form');
  $input = document.createElement('input');
  $btnAdd = document.createElement('button');

  $userList = document.createElement('ul');

  constructor() {
    this.$container.appendChild(this.$form);
    this.$container.appendChild(this.$userList);

    this.$form.appendChild(this.$input);
    this.$form.appendChild(this.$btnAdd);
    this.$form.addEventListener('submit', this.handleSubmit);

    this.$input.type = 'email';
    this.$input.placeholder = 'Add user by email...';
    this.$btnAdd.textContent = 'Add+';
    this.$btnAdd.type = 'submit';
  }

  setActiveConversation = (conversation) => {
    console.log('Changed conver', conversation.users);
    this.activeConversation = conversation;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.$userList.innerHTML = '';
    console.log(this.$input.value);
    this.$input.value = '';
  };
}

export { UserList };
