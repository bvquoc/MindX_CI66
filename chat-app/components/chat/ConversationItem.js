class ConversationItem {
  id;
  name;
  users;

  $container = document.createElement('div');
  $txtName = document.createElement('span');
  $txtNumOfUsers = document.createElement('span');

  constructor(id, name, users) {
    this.id = id;
    this.name = name;
    this.users = users;

    this.$txtName.innerText = name;
    this.$txtNumOfUsers.innerText = ` (${users.length} member${users.length > 1 ? 's' : ''})`;

    this.$container.style.cursor = 'pointer';
    this.$container.appendChild(this.$txtName);
    this.$container.appendChild(this.$txtNumOfUsers);
  }

  setOnclick = (listener) => (this.$container.onclick = listener);
  setHighlight = (isHighlight) => {
    this.$container.style.backgroundColor = isHighlight ? 'blue' : '';
  };

  delete = () => {
    this.$container.remove();
  };
}
export { ConversationItem };
