export const addChoosenClass = (buttons, activebutton) => {
  buttons.forEach((btn) =>
    btn.classList.toggle("choosen", btn === activebutton)
  );
};

export const saveTodos = (arr) => {
  localStorage.setItem("todos", JSON.stringify(arr));
};

export const loadTodos = () => {
  return JSON.parse(localStorage.getItem("todos"));
};

export const showClearBtn = (btn, arr) => {
  const isShow = arr.some((todo) => todo.checked);
  if (isShow) {
    toggleVisibility(btn, "block", true);
  } else {
    toggleVisibility(btn, "block", false);
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

export const toggleVisibility = (elem, className, show) => {
  elem.classList.toggle(className, show);
};

export const getFilteredTodos = (arr, filter) => {
  if (filter === "active") {
    return arr.filter((todo) => !todo.checked);
  } else if (filter === "completed") {
    return arr.filter((todo) => todo.checked);
  }
  return arr;
};
