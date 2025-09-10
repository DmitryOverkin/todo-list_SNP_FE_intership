import {
  addChoosenClass,
  saveTodos,
  loadTodos,
  showClearBtn,
  todoCount,
  setAllCompleted,
  showElem,
  hideElem,
  getFilteredTodos,
} from "./utils";

import "../styles/index.scss";

const todoInput = document.querySelector(".todo__input");
const todoList = document.querySelector(".todo__list");
const todoCounter = document.querySelector(".todo__counter");
const toggleAllBtn = document.querySelector(".todo__toggle-all");
const todoActions = document.querySelector(".todo__actions");
const clearBtn = document.querySelector(".todo__btn--clear");
const allBtn = document.querySelector(".todo__btn--all");
const activeBtn = document.querySelector(".todo__btn--active");
const completedBtn = document.querySelector(".todo__btn--completed");

const todosFromStorage = loadTodos();

let todos = Array.isArray(todosFromStorage) ? todosFromStorage : [];
let currentFilter = "all";
allBtn.classList.add("choosen");

todoInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    if (e.target.value.trim() == "") return;
    todos.unshift({ text: e.target.value, checked: false });
    saveTodos(todos);
    renderTodos();
    e.target.value = "";
  }
});

toggleAllBtn.addEventListener("click", () => {
  const isAllCompleted = todos.every((todo) => todo.checked);

  setAllCompleted(!isAllCompleted, todos);
  saveTodos(todos);
  renderTodos();
});

clearBtn.addEventListener("click", () => {
  todos = todos.filter((todo) => !todo.checked);
  saveTodos(todos);
  renderTodos();
});

const filterButtons = [allBtn, activeBtn, completedBtn];

allBtn.addEventListener("click", () => {
  currentFilter = "all";
  addChoosenClass(filterButtons, allBtn);
  renderTodos();
});

activeBtn.addEventListener("click", () => {
  currentFilter = "active";
  addChoosenClass(filterButtons, activeBtn);
  renderTodos();
});

completedBtn.addEventListener("click", () => {
  currentFilter = "completed";
  addChoosenClass(filterButtons, completedBtn);
  renderTodos();
});

const renderTodos = () => {
  todoList.innerHTML = "";

  const filteredTodos = getFilteredTodos(todos, currentFilter);

  filteredTodos.forEach((todo, index) => {
    const todoItem = document.createElement("li");

    todoItem.className = "todo__item";

    if (todo.checked) {
      todoItem.classList.add("checked");
    }

    todoItem.textContent = todo.text;

    const deleteBtn = document.createElement("span");
    deleteBtn.textContent = "\u00d7";
    deleteBtn.className = "delete__item";
    deleteBtn.addEventListener("click", () => {
      todos.splice(index, 1);
      saveTodos(todos);
      renderTodos();
    });

    const checkBtn = document.createElement("span");
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
      todoItem.style.height = "50px";

      input.value = todo.text;

      const closeInput = (save) => {
        if (save) {
          const val = input.value;
          if (val !== todo.text) {
            todo.text = val;
            saveTodos(todos);
          }
        }

        renderTodos();
      };

      const onKeydown = (e) => {
        if (e.key === "Enter") closeInput(true);
        if (e.key === "Escape") closeInput(false);
      };

      const clickOutsideInput = () => closeInput(false);

      input.addEventListener("keydown", onKeydown);
      input.addEventListener("blur", clickOutsideInput, { once: true });

      todoItem.appendChild(input);
      input.focus();
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

  showClearBtn(clearBtn, todos);
  todoCount(todoCounter, todos);
};

renderTodos();
