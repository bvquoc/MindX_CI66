import { InputGroup } from './shared/inputGroup.js';
import { Register } from './register.js';
import { setScreen } from '../index.js';

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

    this.$actions.appendChild(this.$btnLogin);
    this.$actions.appendChild(this.$btnGoToRegister);
  }

  handleGoToRegister = () => {
    const registerScreen = new Register();
    setScreen(registerScreen.$container);
  };
}
export { Login };
