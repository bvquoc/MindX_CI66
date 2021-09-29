import { InputGroup } from '../shared/inputGroup.js';
import { Modal } from '../shared/modal.js';

class CreateConversationForm {
  $container = document.createElement('div');

  $form = document.createElement('form');
  $conversationNameInput = new InputGroup('Conversation name');
  $modal = new Modal(() => this.setVisible(false));

  constructor() {
    this.$container.appendChild(this.$modal.$container);

    this.$modal.setHeader('Create Conversation');
    this.$modal.setBody(this.$form);
    this.$modal.setOnCancelClick(this.handleOnCancel);
    this.$modal.setOnConfirmClick(this.handleOnConfirm);

    this.$form.appendChild(this.$conversationNameInput.$container);
    this.$form.addEventListener('submit', (e) => this.handleOnConfirm(e));
  }

  setVisible = (isVisible) => {
    // this.$container.style.visibility = isVisible ? 'visible' : 'hidden';
    this.$container.hidden = !isVisible;
  };

  handleOnCancel = () => {
    this.$conversationNameInput.reset();
    this.setVisible(false);
  };
  handleOnConfirm = (event) => {
    event?.preventDefault();
    const conversationName = this.$conversationNameInput.getValue().trim();
    if (conversationName === '') return;
    this.$conversationNameInput.reset();
    db.collection('conversations')
      .add({
        name: conversationName,
        users: [firebase.auth().currentUser.uid],
      })
      .then((docRef) => {
        this.setVisible(false);
        console.log('Document written with ID: ', docRef.id);
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  };
}
export { CreateConversationForm };
