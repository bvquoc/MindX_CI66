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

document.querySelector('#todo-content').addEventListener('keypress', function (e) {
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
  $btnDelete;

  constructor(text) {
    this.$container = document.createElement('li');
    this.$container.setAttribute('class', 'todo-item');

    this.$content = document.createElement('span');
    this.$content.innerHTML = text;
    this.$content.addEventListener('click', () => {
      if (this.$content.id) this.$content.removeAttribute('id');
      else this.$content.setAttribute('id', 'done');
      // this.$container.setAttribute('id', 'done');
    });

    this.$btnDelete = document.createElement('button');
    this.$btnDelete.innerHTML = 'Delete';
    this.$btnDelete.addEventListener('click', this.handleDelete);

    this.$container.appendChild(this.$content);
    this.$container.appendChild(this.$btnDelete);
  }

  handleDelete = () => {
    this.$container.remove();
  };
}
