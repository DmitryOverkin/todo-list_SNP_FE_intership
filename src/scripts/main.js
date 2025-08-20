const todoInput = document.querySelector(".todo__input");
const todoList = document.querySelector(".todo__list");
const todoCounter = document.querySelector(".todo__counter");
const toggleAllBtn = document.querySelector(".todo__toggle-all");
const todoActions = document.querySelector(".todo__actions");
const clearBtn = document.querySelector(".todo__btn--clear");
const allBtn = document.querySelector(".todo__btn--all");
const activeBtn = document.querySelector(".todo__btn--active");
const completedBtn = document.querySelector(".todo__btn--completed");

let todos = loadTodos() ? loadTodos() : [];
let currentFilter = "all";

todoInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    if (e.target.value.trim() == "") return;
    todos.push({ text: e.target.value, checked: false });
    saveTodos(todos);
    renderTodos();
    e.target.value = "";
  }
});

toggleAllBtn.addEventListener("click", function () {
  const isAllCompleted = todos.every((todo) => todo.checked === true);

  setAllCompleted(!isAllCompleted);
  saveTodos(todos);
  renderTodos();
});

clearBtn.addEventListener("click", () => {
  todos = todos.filter((todo) => todo.checked === false);
  saveTodos(todos);
  renderTodos();
});

allBtn.addEventListener("click", () => {
  currentFilter = "all";
  renderTodos();
});

activeBtn.addEventListener("click", () => {
  currentFilter = "active";
  renderTodos();
});

completedBtn.addEventListener("click", () => {
  currentFilter = "completed";
  renderTodos();
});

function saveTodos(arr) {
  let jsonTodos = JSON.stringify(arr);
  localStorage.setItem("todos", jsonTodos);
}

function loadTodos() {
  let loadedTodos = localStorage.getItem("todos");
  return JSON.parse(loadedTodos);
}

function getFilteredTodos() {
  if (currentFilter === "active") {
    return todos.filter((todo) => todo.checked === false);
  } else if (currentFilter === "completed") {
    return todos.filter((todo) => todo.checked === true);
  }
  return todos;
}

function renderTodos() {
  todoList.innerHTML = "";

  const filteredTodos = getFilteredTodos();

  filteredTodos.forEach((todo, index) => {
    let todoItem = document.createElement("li");

    todoItem.className = "todo__item";

    if (todo.checked) {
      todoItem.classList.add("checked");
    }

    todoItem.textContent = todo.text;

    let deleteBtn = document.createElement("span");
    deleteBtn.textContent = "\u00d7";
    deleteBtn.className = "delete__item";
    deleteBtn.addEventListener("click", () => {
      todos.splice(index, 1);
      saveTodos(todos);
      renderTodos();
    });

    let checkBtn = document.createElement("span");
    checkBtn.className = "check__btn";

    if (todo.checked) {
      checkBtn.classList.add("checked");
      checkBtn.textContent = "✔";
    }

    checkBtn.addEventListener("click", () => {
      todo.checked = !todo.checked;
      saveTodos(todos);
      renderTodos();
    });

    todoItem.addEventListener("dblclick", (e) => {
      const input = document.createElement("input");
      input.className = "edit__todo";

      input.value = todo.text;

      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          todo.text = e.target.value;
          saveTodos(todos);
          renderTodos();
        }
      });

      todoItem.appendChild(input);
    });

    todoItem.appendChild(checkBtn);
    todoItem.appendChild(deleteBtn);
    todoList.appendChild(todoItem);
  });

  if (todos.length >= 1) {
    showElem(toggleAllBtn, "block");
    showElem(todoActions, "flex");
  } else {
    hideElem(toggleAllBtn, "block");
    hideElem(todoActions, "flex");
  }

  showClearBtn();
  todoCount();
}

function showClearBtn() {
  isShow = todos.some((todo) => todo.checked === true);
  if (isShow) {
    showElem(clearBtn, "block");
  } else {
    hideElem(clearBtn, "block");
  }
}

function todoCount() {
  let count = todos.filter((todo) => todo.checked !== true).length;
  todoCounter.textContent = count;
}

function setAllCompleted(state) {
  todos.forEach((todo) => {
    todo.checked = state;
  });
}

function showElem(elem, className) {
  elem.classList.add(`${className}`);
}

function hideElem(elem, className) {
  elem.classList.remove(`${className}`);
}

renderTodos();
