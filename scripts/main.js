const todoInput = document.querySelector(".todo__input");
const todoList = document.querySelector(".todo-list");
const itemsLeft = document.querySelector(".item-left-count");

let todoListArr = new Array();

// добавленеи задачи в масиисв.

function addTodo() {
  todoInput.addEventListener("keypress", (event) => {
    if (event.target.value.trim() === "") return;

    if (event.key === "Enter") {
      todo = event.target.value.trim();

      todoListArr.push({
        id: Date.now() + "-" + Math.random().toString(36).substring(2, 15),
        todoText: todo,
        isComplete: false,
      });

      saveTodos(todoListArr);

      loadTodos();
      itemLeftCouter();

      event.target.value = "";
    }
  });
}

// Сохранение в localStorage

function saveTodos(arr) {
  localStorage.setItem("todoList", JSON.stringify(arr));
}

// Отрисовка задач из localStorage

function loadTodos() {
  todoList.innerHTML = "";
  const savedTodos = localStorage.getItem("todoList");

  let parsedList = JSON.parse(savedTodos);

  if (parsedList) {
    todoListArr = parsedList;

    parsedList.forEach((todo) => {
      todoList.insertAdjacentHTML(
        "beforeEnd",
        `
          <li class="todo-list__item">
            <div class="todo-list__view">
              <input id="${todo.id}" name="${todo.id}" class="todo-list__toggle-btn" type="checkbox" />
              <label for="${todo.id}" class="todo-list__label">${todo.todoText}</label>
              <button class="todo-list__destroy-btn">&times;</button>
            </div>
          </li>
      `
      );
    });
  }
}

function itemLeftCouter() {
  const arr = JSON.parse(localStorage.getItem("todoList"));

  if (arr) {
    itemsLeft.innerHTML = arr.length;
  } else {
    itemsLeft.innerHTML = "0";
  }
}

loadTodos();
itemLeftCouter();
addTodo();
