"use strict";

const todoForm = document.querySelector("form");
const todoInput = document.getElementById("todo-input");
const todoListUL = document.getElementById("todo-list");

const filterBtn = document.querySelector(".filter-btns");

const activeBtn = document.querySelector(".active-btn");
const completedBtn = document.querySelector(".completed-btn");
const allBtn = document.querySelector(".all-btn");

//  1) STATE: Single source of truth
let allTodos = JSON.parse(localStorage.getItem("todoTasks")) || [];
let currentFilter = "all"; // Options: 'all', 'active', 'completed'

const saveTodos = () =>
  localStorage.setItem("todoTasks", JSON.stringify(allTodos));

//  2) RENDER: One function to role them all
const render = function () {
  //Filter the data based on current state
  const filteredTodos = allTodos.filter((todo) => {
    if (currentFilter === "active") return !todo.completed;
    if (currentFilter === "completed") return todo.completed;
    return true; // 'all'
  });

  //Render the filtered data
  todoListUL.innerHTML = filteredTodos
    .map(
      (todo) => `
    <li class="todo" data-id="${todo.id}">
        <input type="checkbox" id="todo-${todo.id}" ${todo.completed ? "checked" : ""}/>
        <label class="custom-checkbox" for="todo-${todo.id}">
           <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="transparent">
              <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
            </svg>
        </label>
        <label for="todo-${todo.id}" class="todo-text">${todo.text}</label>
        <button class="delete-btn" type="button">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="var(--secondry-color)"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" /></svg>
        </button>
      </li>
  `,
    )
    .join("");
};

//  3) Events
todoListUL.addEventListener("click", (e) => {
  const li = e.target.closest("li");
  if (!li) return;
  const id = Number(li.dataset.id);

  if (e.target.closest(".delete-btn")) {
    allTodos = allTodos.filter((t) => t.id !== id);
    saveTodos();
    render();
    return;
  }

  if (e.target.type === "checkbox") {
    console.log("TEST");
    const todo = allTodos.find((t) => t.id === id);

    if (todo) {
      todo.completed = e.target.checked;
      saveTodos();
      setTimeout(render, 150);
    }
  }
});

// Using event delegation for the filter buttons too
filterBtn.addEventListener("click", (e) => {
  if (!e.target.classList.contains("filter-btn")) return;

  if (e.target.classList.contains("all-btn")) currentFilter = "all";
  if (e.target.classList.contains("active-btn")) currentFilter = "active";
  if (e.target.classList.contains("completed-btn")) currentFilter = "completed";

  render();
});

todoForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const text = todoInput.value.trim();

  if (text) {
    allTodos.push({ id: Date.now(), text, completed: false });
    todoInput.value = "";
    console.log(allTodos);
    saveTodos();
    render();
  }
});

render();
