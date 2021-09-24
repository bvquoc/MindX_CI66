class TitleBar {
  name;

  $container = document.createElement('div');
  $txtName = document.createElement('span');
  $btnLogout = document.createElement('button');

  constructor() {
    this.setName();

    this.$btnLogout.innerText = 'Logout';
    this.$btnLogout.addEventListener('click', () => firebase.auth().signOut());

    this.$container.appendChild(this.$txtName);
    this.$container.appendChild(this.$btnLogout);
  }

  setName = (name = 'Please choose a conversation...') => {
    this.name = name;
    this.$txtName.innerText = name;
  };
}

export { TitleBar };
