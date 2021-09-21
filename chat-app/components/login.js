import { InputGroup } from './shared/inputGroup.js';
import { setScreen } from '../index.js';
import { Register } from './register.js';

class Login {
  $container = document.createElement('div');

  $form = document.createElement('form');
  $txtTitle = document.createElement('h3');
  $inputGroupEmail = new InputGroup('Email', 'email');
  $inputGroupPassword = new InputGroup('Password', 'password');

  $actions = document.createElement('div');
  $btnLogin = document.createElement('button');
  $btnGoToRegister = document.createElement('button');

  constructor() {
    this.$txtTitle.innerHTML = 'Login';

    this.$btnLogin.innerHTML = 'Login';
    this.$btnLogin.type = 'submit';

    this.$btnGoToRegister.innerHTML = 'Go to Register';
    this.$btnGoToRegister.type = 'button';
    this.$btnGoToRegister.addEventListener('click', this.handleGoToRegister);

    this.$container.appendChild(this.$form);

    this.$form.appendChild(this.$txtTitle);
    this.$form.appendChild(this.$inputGroupEmail.$container);
    this.$form.appendChild(this.$inputGroupPassword.$container);
    this.$form.appendChild(this.$actions);
    this.$form.addEventListener('submit', this.handleOnSubmit);

    this.$actions.appendChild(this.$btnLogin);
    this.$actions.appendChild(this.$btnGoToRegister);
  }

  handleOnSubmit = (event) => {
    event.preventDefault();
    const email = this.$inputGroupEmail.getValue();
    const password = this.$inputGroupPassword.getValue();

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        if (error.code === 'auth/user-not-found')
          this.$inputGroupEmail.setErrorMessage('User not found!');
        console.log('Error code:', error.code);
        console.log('Error msg:', error.message);
      });
  };

  handleGoToRegister = () => {
    const registerScreen = new Register();
    setScreen(registerScreen.$container);
  };
}
export { Login };
