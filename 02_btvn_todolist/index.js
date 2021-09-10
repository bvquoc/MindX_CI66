const btnSubmit = document.getElementById('btn-submit');
const todoElement = document.getElementById('todo-list');
const btnDeleteAll = document.getElementById('delete-all');

const todoList = [];

btnSubmit.addEventListener('click', () => {
  const inpTodo = document.getElementById('todo-content');
  const content = inpTodo.value;
  inpTodo.value = '';
  if (content !== '') {
    const newTodo = new Todo(content);
    todoList.push(newTodo);
    // newTodo.appendChild(document.createTextNode(content));
    todoElement.appendChild(newTodo.$container);
  }
});

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
    this.$content.innerHTML = `${text} `;
    this.$content.addEventListener('click', () => {
      console.log('clicked on content');
    });

    this.$btnDelete = document.createElement('button');
    this.$btnDelete.innerHTML = 'Delete';
    this.$btnDelete.addEventListener('click', this.handleDelete);

    this.$container.appendChild(this.$content);
    this.$container.appendChild(this.$btnDelete);
  }

  handleDelete = () => {
    this.$container.parentNode.removeChild(this.$container);
  };
}
