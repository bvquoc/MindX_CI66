import { InputGroup } from './shared/inputGroup.js';
import { Login } from './login.js';
import { setScreen } from '../index.js';

class Register {
  $container = document.createElement('div');

  $form = document.createElement('form');
  $txtTitle = document.createElement('h3');
  $inputGroupEmail = new InputGroup('Email', 'email');
  $inputGroupDisplayName = new InputGroup('Display Name');
  $inputGroupPassword = new InputGroup('Password', 'password');
  $inputGroupConfirmPassword = new InputGroup('Confirm Password', 'password');

  $actions = document.createElement('div');
  $btnRegister = document.createElement('button');
  $btnGoToLogin = document.createElement('button');

  constructor() {
    this.$txtTitle.innerHTML = 'Register';

    this.$btnRegister.innerHTML = 'Register';
    this.$btnRegister.type = 'submit';

    this.$btnGoToLogin.innerHTML = 'Go to Login';
    this.$btnGoToLogin.type = 'button';
    this.$btnGoToLogin.addEventListener('click', this.handleGoToLogin);

    this.$form.addEventListener('submit', this.handleSubmit);

    this.$container.appendChild(this.$form);

    this.$form.appendChild(this.$txtTitle);
    this.$form.appendChild(this.$inputGroupEmail.$container);
    this.$form.appendChild(this.$inputGroupDisplayName.$container);
    this.$form.appendChild(this.$inputGroupPassword.$container);
    this.$form.appendChild(this.$inputGroupConfirmPassword.$container);
    this.$form.appendChild(this.$actions);

    this.$actions.appendChild(this.$btnRegister);
    this.$actions.appendChild(this.$btnGoToLogin);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const email = this.$inputGroupEmail.getValue();
    const displayName = this.$inputGroupDisplayName.getValue().trim();
    const password = this.$inputGroupPassword.getValue();
    const confirmPassword = this.$inputGroupConfirmPassword.getValue();

    let check = true;

    if (!email) {
      this.$inputGroupEmail.setErrorMessage('Email cannot be empty!');
      check = false;
    }
    if (!displayName) {
      this.$inputGroupDisplayName.setErrorMessage('Display name cannot be empty!');
      check = false;
    }
    if (password !== confirmPassword) {
      this.$inputGroupConfirmPassword.setErrorMessage('Please confirm your password!');
      check = false;
    }
    if (!check) return;

    this.$inputGroupEmail.reset();
    this.$inputGroupDisplayName.reset();
    this.$inputGroupPassword.reset();
    this.$inputGroupConfirmPassword.reset();

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        const user = firebase.auth().currentUser;
        user.updateProfile({ displayName });
        firebase.auth().currentUser.sendEmailVerification();
        alert('Completed! Email verification sent!');
      })
      .catch((error) => {
        console.log('Error code:', error.code);
        console.log('Error msg:', error.message);
      });
  };

  handleGoToLogin = () => {
    const loginScreen = new Login();
    setScreen(loginScreen.$container);
  };
}

export { Register };
