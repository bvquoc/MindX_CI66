const todoContent = document.querySelector('#todo-content');
const btnSubmit = document.getElementById('btn-submit');
const todoElement = document.getElementById('todo-list');
const btnDeleteAll = document.getElementById('delete-all');

const todoList = [];

const hanleOnSubmit = () => {
  const inpTodo = document.getElementById('todo-content');
  const content = inpTodo.value;
  inpTodo.value = '';
  if (content !== '') {
    const newTodo = new Todo(content);
    todoList.push(newTodo);
    todoElement.appendChild(newTodo.$container);
  }
};

todoContent.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') hanleOnSubmit();
});
btnSubmit.addEventListener('click', hanleOnSubmit);

btnDeleteAll.addEventListener('click', () => {
  todoList.forEach((item) => {
    item.handleDelete();
  });
  while (todoList.length) todoList.pop();
});

class Todo {
  $container;
  $content;
  $icon;
  $btnDelete;

  constructor(text) {
    const divTag = document.createElement('div');

    this.$icon = document.createElement('i');
    this.$icon.setAttribute('class', 'far fa-circle');

    this.$content = document.createElement('span');
    this.$content.innerHTML = text;

    divTag.appendChild(this.$icon);
    divTag.appendChild(this.$content);

    this.$container = document.createElement('li');
    this.$container.setAttribute('class', 'todo-item');

    this.$container.addEventListener('click', () => {
      if (this.$content.id) {
        this.$content.removeAttribute('id');

        this.$icon.removeAttribute('class');
        this.$icon.removeAttribute('id');
        this.$icon.setAttribute('class', 'far fa-circle');
      } else {
        this.$content.setAttribute('id', 'done');
        this.$icon.removeAttribute('class');
        this.$icon.setAttribute('class', 'far fa-check-circle');
        // this.$icon.setAttribute('id', 'done');
      }
    });

    this.$btnDelete = document.createElement('button');
    this.$btnDelete.innerHTML = 'Delete';
    this.$btnDelete.addEventListener('click', this.handleDelete);

    this.$container.appendChild(divTag);
    this.$container.appendChild(this.$btnDelete);
  }

  handleDelete = () => {
    this.$container.remove();
  };
}
