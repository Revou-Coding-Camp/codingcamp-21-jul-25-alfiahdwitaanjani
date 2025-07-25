const form = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const dateInput = document.getElementById('date-input');
const filterInput = document.getElementById('filter-input');
const todoBody = document.getElementById('todo-body');
const deleteAllBtn = document.getElementById('delete-all');

let todos = [];

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const task = todoInput.value.trim();
    const date = dateInput.value;

    if (!task || !date) {
        alert('Task and date are required!');
        return;
    }

    const todo = {
        id: Date.now(),
        task,
        date,
        status: 'Pending'
    };

    todos.push(todo);
    renderTodos(todos);
    form.reset();
});

function renderTodos(data) {
    todoBody.innerHTML = '';

    if (data.length === 0) {
        todoBody.innerHTML = '<tr><td colspan="4" style="text-align:center;">No task found</td></tr>';
        return;
    }

    data.forEach(todo => {
        const row = document.createElement('tr');
        row.innerHTML = `
      <td>${todo.task}</td>
      <td>${todo.date}</td>
      <td>${todo.status}</td>
      <td><button class="delete-btn" onclick="deleteTodo(${todo.id})">Delete</button></td>
    `;
        todoBody.appendChild(row);
    });
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    renderTodos(todos);
}

deleteAllBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to delete all tasks?')) {
        todos = [];
        renderTodos(todos);
    }
});

filterInput.addEventListener('input', function () {
    const keyword = this.value.toLowerCase();
    const filtered = todos.filter(todo => todo.task.toLowerCase().includes(keyword));
    renderTodos(filtered);
});