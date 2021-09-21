class Modal {
  $container = document.createElement('div');
  $modalContainer = document.createElement('div');

  $header = document.createElement('div');
  $body = document.createElement('div');
  $footer = document.createElement('div');

  $btnCancel = document.createElement('button');
  $btnConfirm = document.createElement('button');

  constructor() {
    this.$container.appendChild(this.$modalContainer);

    this.$modalContainer.appendChild(this.$header);
    this.$modalContainer.appendChild(this.$body);
    this.$modalContainer.appendChild(this.$footer);

    this.$btnCancel.innerText = 'Cancel';
    this.$btnConfirm.innerText = 'OK';
    this.$footer.appendChild(this.$btnCancel);
    this.$footer.appendChild(this.$btnConfirm);
  }

  setHeader = (title = 'Modal title') => {
    this.$header.innerText = title;
  };

  setBody = (component) => {
    this.$body.innerHTML = '';
    this.$body.appendChild(component);
  };

  setOnCancelClick = (handleOnClick) => {
    this.$btnCancel.onclick = handleOnClick;
  };
  setOnConfirmClick = (handleOnClick) => {
    this.$btnConfirm.onclick = handleOnClick;
  };
}
export { Modal };
