/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/main.js":
/*!*****************************!*\
  !*** ./src/scripts/main.js ***!
  \*****************************/
/***/ (() => {

eval("{const todoInput = document.querySelector(\".todo__input\");\r\nconst todoList = document.querySelector(\".todo__list\");\r\nconst todoCounter = document.querySelector(\".todo__counter\");\r\nconst toggleAllBtn = document.querySelector(\".todo__toggle-all\");\r\n\r\nlet todos = loadTodos() ? loadTodos() : [];\r\n\r\ntodoInput.addEventListener(\"keydown\", (e) => {\r\n  if (e.key === \"Enter\") {\r\n    todos.push({ text: e.target.value, checked: false });\r\n    saveTodos(todos);\r\n    renderTodos();\r\n    e.target.value = \"\";\r\n  }\r\n});\r\n\r\nfunction saveTodos(arr) {\r\n  let jsonTodos = JSON.stringify(arr);\r\n  localStorage.setItem(\"todos\", jsonTodos);\r\n}\r\n\r\nfunction loadTodos() {\r\n  let loadedTodos = localStorage.getItem(\"todos\");\r\n  return JSON.parse(loadedTodos);\r\n}\r\n\r\nfunction renderTodos() {\r\n  todoList.innerHTML = \"\";\r\n\r\n  todos.forEach((todo, index) => {\r\n    let todoItem = document.createElement(\"li\");\r\n\r\n    todoItem.className = \"todo__item\";\r\n\r\n    if (todo.checked) {\r\n      todoItem.classList.add(\"checked\");\r\n    }\r\n\r\n    todoItem.textContent = todo.text;\r\n\r\n    todoItem.addEventListener(\"click\", () => {\r\n      todos[index].checked = !todos[index].checked;\r\n      saveTodos(todos);\r\n      renderTodos();\r\n    });\r\n\r\n    let deleteBtn = document.createElement(\"span\");\r\n    deleteBtn.textContent = \"\\u00d7\";\r\n    deleteBtn.className = \"delete__item\";\r\n    deleteBtn.addEventListener(\"click\", () => {\r\n      todos.splice(index, 1);\r\n      saveTodos(todos);\r\n      renderTodos();\r\n    });\r\n\r\n    todoItem.appendChild(deleteBtn);\r\n    todoList.appendChild(todoItem);\r\n  });\r\n\r\n  if (todos.length >= 1) {\r\n    toggleAllBtn.classList.add(\"visible\");\r\n  } else {\r\n    toggleAllBtn.classList.remove(\"visible\");\r\n  }\r\n\r\n  todoCount();\r\n}\r\n\r\nfunction todoCount() {\r\n  let count = todos.filter((todo) => todo.checked !== true).length;\r\n  todoCounter.textContent = count;\r\n}\r\n\r\nfunction setAllCompleted(state) {\r\n  todos.forEach((todo) => {\r\n    todo.checked = state;\r\n  });\r\n}\r\n\r\ntoggleAllBtn.addEventListener(\"click\", function () {\r\n  const isAllCompleted = todos.every((todo) => todo.checked === true);\r\n\r\n  setAllCompleted(!isAllCompleted);\r\n  saveTodos(todos);\r\n  renderTodos();\r\n});\r\n\r\nrenderTodos();\r\n\n\n//# sourceURL=webpack://todolist_snp_fe_intreship/./src/scripts/main.js?\n}");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/scripts/main.js"]();
/******/ 	
/******/ })()
;