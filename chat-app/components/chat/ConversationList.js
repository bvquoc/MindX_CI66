import { CreateConversationForm } from './createConversationForm.js';

class ConversationList {
  $container = document.createElement('div');
  $btnCreateConversation = document.createElement('button');
  $createConversationForm = new CreateConversationForm();
  $conversationList = document.createElement('div');

  constructor() {
    this.$btnCreateConversation.innerText = '+ create Conversation';

    this.$createConversationForm.setVisible(false);
    this.$btnCreateConversation.addEventListener('click', this.handleCreateConversation);

    (async function getConversationList() {
      db.collection('conversation')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, ' => ', doc.data());
            const tmp = document.createElement('div');
            tmp.innerText = doc.data();
            this.$conversationList.appendChild(tmp);
          });
        });
    })();

    this.$container.appendChild(this.$btnCreateConversation);
    this.$container.appendChild(this.$createConversationForm.$container);
    this.$container.appendChild(this.$conversationList);
  }

  handleCreateConversation = () => {
    this.$createConversationForm.setVisible(true);
  };
}

export { ConversationList };
