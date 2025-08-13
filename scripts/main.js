const todoInput = document.querySelector(".todo__input");
const todoList = document.querySelector(".todo__list");

let todos = loadTodos() ? loadTodos() : [];

todoInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    todos.push({ text: e.target.value, checked: false });
    saveTodos(todos);
    renderTodos();
    e.target.value = "";
  }
});

function saveTodos(arr) {FА
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

    todoList.appendChild(todoItem);
  });
}

function checkTodo() {
  todoItems.forEach((item, index) => {});
}

loadTodos();
renderTodos();
