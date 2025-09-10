export const addChoosenClass = (buttons, activebutton) => {
    buttons.forEach(btn => btn.classList.toggle("choosen", btn === activebutton))
};

export const saveTodos = (arr) => {
  const jsonTodos = JSON.stringify(arr);
  localStorage.setItem("todos", jsonTodos);
};

export const loadTodos = () => {
  const loadedTodos = localStorage.getItem("todos");
  return JSON.parse(loadedTodos);
};

export const showClearBtn = (btn, arr) => {
  const isShow = arr.some((todo) => todo.checked);
  if (isShow) {
    showElem(btn, "block");
  } else {
    hideElem(btn, "block");
  }
};

export const todoCount = (counter, arr) => {
  const count = arr.filter((todo) => !todo.checked).length;
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
    return arr.filter((todo) => !todo.checked);
  } else if (filter === "completed") {
    return arr.filter((todo) => todo.checked);
  }
  return arr;
};
