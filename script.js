"use strict";

const todoForm = document.querySelector("form");
const todoInput = document.getElementById("todo-input");
const todoListUL = document.getElementById("todo-list");

const getTodos = function () {
  const todos = localStorage.getItem("todos") || "[]";
  return JSON.parse(todos);
};

const addTodo = function () {
  const todoText = todoInput.value.trim();
  if (todoText.length > 0) {
    const todoObject = {
      text: todoText,
      completed: false,
    };
    allTodos.push(todoObject);
    updateTodoList();
    saveTodos();
    todoInput.value = "";
  }
};

const updateTodoList = function () {
  todoListUL.innerHTML = "";
  allTodos.forEach((todo, todoIndex) => {
    const todoItem = createTodoItem(todo, todoIndex);
  });
};

const deleteTodoItem = function (todoIndex) {
  allTodos = allTodos.filter((_, i) => i !== todoIndex);
  saveTodos();
  updateTodoList();
};

const createTodoItem = function (todo, todoIndex) {
  const markup = `
    <li class="todo">
          <input type="checkbox" id="todo-${todoIndex}" />
          <label class="custom-checkbox" for="todo-${todoIndex}"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="transparent"
            >
              <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
            </svg>
          </label>
          <label for="todo-${todoIndex}" class="todo-text"
            >${todo.text}</label
          >
          <button class="delete-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="var(--secondry-color)"
            >
              <path
                d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"
              />
            </svg>
          </button>
        </li>
    `;
  todoListUL.insertAdjacentHTML("afterbegin", markup);

  const currentDeleteBtn = todoListUL.querySelector(".delete-btn");

  currentDeleteBtn.addEventListener("click", () => {
    deleteTodoItem(todoIndex);
  });

  const checkbox = todoListUL.querySelector("li input");
  console.log(checkbox);

  checkbox.addEventListener("change", () => {
    allTodos[todoIndex].completed = checkbox.checked;
    saveTodos();
  });

  checkbox.checked = todo.completed;
};

const saveTodos = function () {
  const todosJSON = JSON.stringify(allTodos);
  localStorage.setItem("todos", todosJSON);
};

let allTodos = getTodos();
updateTodoList();

todoForm.addEventListener("submit", function (e) {
  e.preventDefault();
  addTodo();
});
