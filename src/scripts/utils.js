export const addChoosenClass = (btn, btn2, btn3) => {
  btn.classList.add("choosen");
  btn2.classList.remove("choosen");
  btn3.classList.remove("choosen");
};

export const saveTodos = (arr) => {
  let jsonTodos = JSON.stringify(arr);
  localStorage.setItem("todos", jsonTodos);
};

export const loadTodos = () => {
  let loadedTodos = localStorage.getItem("todos");
  return JSON.parse(loadedTodos);
};

export const showClearBtn = (btn, arr) => {
  const isShow = arr.some((todo) => todo.checked === true);
  if (isShow) {
    showElem(btn, "block");
  } else {
    hideElem(btn, "block");
  }
};

export const todoCount = (counter, arr) => {
  let count = arr.filter((todo) => todo.checked !== true).length;
  counter.textContent = count;
};

export const setAllCompleted = (state, arr) => {
  arr.forEach((todo) => {
    todo.checked = state;
  });
};

export const showElem = (elem, className) => {
  elem.classList.add(`${className}`);
};

export const hideElem = (elem, className) => {
  elem.classList.remove(`${className}`);
};

export const getFilteredTodos = (arr, filter) => {
  if (filter === "active") {
    return arr.filter((todo) => todo.checked === false);
  } else if (filter === "completed") {
    return arr.filter((todo) => todo.checked === true);
  }
  return arr;
};
