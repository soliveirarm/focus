const newTaskInput = document.querySelector("#new-task__input");
const taskList = document.querySelector(".tasks__list");
const completedTasks = document.querySelector(".completed-tasks__list");
const completedTasksCounter = document.querySelector(
  "#completed-tasks__counter"
);

function createTaskElements() {
  let elements = {
    li: document.createElement("li"),
    text: document.createElement("span"),
    checkbox: document.createElement("INPUT"),
    trash: document.createElement("span"),
  };

  let { li, text, checkbox, trash } = elements;

  li.classList.add("task");
  text.classList.add("task__text");
  checkbox.classList.add("task__checkbox");
  trash.classList.add("task__trash");

  checkbox.setAttribute("type", "checkbox");

  text.contentEditable = true;

  trash.innerHTML = `<i class="fa-solid fa-xmark"></i>`;

  li.appendChild(checkbox);
  li.appendChild(text);
  li.appendChild(trash);

  checkbox.addEventListener("click", () => checkItem(checkbox, li, text));

  trash.addEventListener("click", () => deleteTask(li, text));

  text.addEventListener("click", () => editText(text));

  return { li, text, checkbox, trash };
}

let tasksLocal = JSON.parse(localStorage.getItem("todos")) || [];
let completedTasksLocal =
  JSON.parse(localStorage.getItem("completedTodos")) || [];

function updateTodos() {
  localStorage.todos = JSON.stringify(tasksLocal);
}

function updateCompletedTodos() {
  localStorage.completedTodos = JSON.stringify(completedTasksLocal);
}

function deleteFromLocalStorage(text, array) {
  let index = array.indexOf(text.textContent);
  array.splice(index, 1);
}

function deleteTask(li, text) {
  li.remove();
  deleteFromLocalStorage(text, tasksLocal);
  updateTodos();
}

function editText(text) {
  let textIndex = tasksLocal.indexOf(text.textContent);
  text.addEventListener("keyup", () => {
    tasksLocal.splice(textIndex, 1, text.textContent);
    updateTodos();
  });
}

function checkItem(checkbox, li, text) {
  text.classList.toggle("checked");

  if (checkbox.checked) {
    text.contentEditable = false;

    completedTasks.appendChild(li);

    deleteFromLocalStorage(text, tasksLocal);

    completedTasksLocal.push(text.textContent);

    completedTasksCounter.innerHTML = completedTasksLocal.length;
  } else {
    text.contentEditable = true;

    taskList.appendChild(li);

    deleteFromLocalStorage(text, completedTasksLocal);

    tasksLocal.push(text.textContent);

    completedTasksCounter.innerHTML = completedTasksLocal.length;
  }

  updateTodos();
  updateCompletedTodos();
}

const clearBtn = document.querySelector("#clear");

function clearCompletedTasks() {
  completedTasks.innerHTML = "";
  completedTasksLocal = [];
  updateCompletedTodos();
  completedTasksCounter.innerHTML = 0;
}

clearBtn.addEventListener("click", clearCompletedTasks);

completedTasksCounter.innerHTML = completedTasksLocal.length;

function addNewTask() {
  if (newTaskInput.value !== "") {
    let elements = createTaskElements();
    let { li, text, checkbox, trash } = elements;

    text.textContent = newTaskInput.value;

    tasksLocal.push(text.textContent);
    updateTodos();

    taskList.appendChild(li);
  }

  newTaskInput.value = "";
}

document.querySelector(".new-task").addEventListener("submit", (e) => {
  e.preventDefault();
  addNewTask();
});

function showTasks() {
  tasksLocal.forEach((task, i) => {
    let elements = createTaskElements();
    let { li, text, checkbox, trash } = elements;

    text.classList.remove("checked");
    text.textContent = tasksLocal[i];

    taskList.appendChild(li);
  });
}

if (tasksLocal !== null) {
  showTasks();
}

function showCompletedTasks() {
  completedTasksLocal.forEach((task, i) => {
    let elements = createTaskElements();
    let { li, text, checkbox, trash } = elements;

    text.contentEditable = false;
    text.classList.add("checked");
    text.textContent = completedTasksLocal[i];

    checkbox.checked = true;

    completedTasks.appendChild(li);
  });
}

if (completedTasksLocal !== null) {
  showCompletedTasks();
}

let completedTasksBtn = document.querySelector(".completed-tasks__btn");
let toggleCompletedTasksLocal = localStorage.getItem("toggle");

function toggleCompletedTasks() {
  completedTasks.classList.toggle("hidden");
  clearBtn.classList.toggle("hidden");

  let arrow = document.querySelector(".arrow");
  if (completedTasks.classList.contains("hidden")) {
    arrow.innerHTML = `<i class="fa-solid fa-chevron-up"></i>`;
    localStorage.setItem("toggle", "hidden");
  } else {
    arrow.innerHTML = `<i class="fa-solid fa-chevron-down"></i>`;
    localStorage.removeItem("toggle");
  }
}

completedTasksBtn.addEventListener("click", toggleCompletedTasks);

if (toggleCompletedTasksLocal !== null) {
  toggleCompletedTasks();
}

// Dark mode

const darkModeBtn = document.querySelector("#toggle-dark-mode");
let currentMode = localStorage.getItem("darkMode");

function toggleDarkMode() {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    darkModeBtn.checked = true;
    localStorage.setItem("darkMode", "enabled");
  } else {
    darkModeBtn.checked = false;
    localStorage.removeItem("darkMode");
  }
}

if (currentMode !== null) {
  toggleDarkMode();
}

darkModeBtn.addEventListener("click", toggleDarkMode);

document.addEventListener("contextmenu", (e) => e.preventDefault());
