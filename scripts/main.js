const todoInput = document.querySelector(".todo__input");
const todoList = document.querySelector(".todo__list");
const todoCounter = document.querySelector(".todo__counter");

let todos = loadTodos() ? loadTodos() : [];

todoInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    todos.push({ text: e.target.value, checked: false });
    saveTodos(todos);
    renderTodos();
    e.target.value = "";
  }
});

function saveTodos(arr) {
  let jsonTodos = JSON.stringify(arr);
  localStorage.setItem("todos", jsonTodos);
}

function loadTodos() {
  let loadedTodos = localStorage.getItem("todos");
  return JSON.parse(loadedTodos);
}

function renderTodos() {
  todoList.innerHTML = "";

  todos.forEach((todo, index) => {
    let todoItem = document.createElement("li");

    todoItem.className = "todo__item";

    if (todo.checked) {
      todoItem.classList.add("checked");
    }

    todoItem.textContent = todo.text;

    todoItem.addEventListener("click", () => {
      todos[index].checked = !todos[index].checked;
      saveTodos(todos);
      renderTodos();
    });

    let deleteBtn = document.createElement("span");
    deleteBtn.textContent = "\u00d7";
    deleteBtn.className = "delete__item";
    deleteBtn.addEventListener("click", () => {
      todos.splice(index, 1);
      saveTodos(todos);
      renderTodos();
    });

    todoItem.appendChild(deleteBtn);
    todoList.appendChild(todoItem);
  });

  todoCount();
}

function todoCount() {
  let count = todos.filter((todo) => todo.checked !== true).length;
  todoCounter.textContent = count;
}

renderTodos();
