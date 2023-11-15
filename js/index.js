const newTaskInput = document.querySelector("#new-task__input");
const taskList = document.querySelector(".tasks__list");
const completedTasks = document.querySelector(".completed-tasks__list");
const completedTasksCounter = document.querySelector(
  "#completed-tasks__counter"
);

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

    updateTodos();
    updateCompletedTodos();

    completedTasksCounter.innerHTML = completedTasksLocal.length;
  } else {
    text.contentEditable = true;

    taskList.appendChild(li);

    deleteFromLocalStorage(text, completedTasksLocal);

    tasksLocal.push(text.textContent);

    updateTodos();
    updateCompletedTodos();

    completedTasksCounter.innerHTML = completedTasksLocal.length;
  }
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
    let li = document.createElement("li");
    let text = document.createElement("span");
    let checkbox = document.createElement("INPUT");
    let trash = document.createElement("span");

    li.classList.add("task");
    text.classList.add("task__text");
    checkbox.classList.add("task__checkbox");
    trash.classList.add("task__trash");

    checkbox.setAttribute("type", "checkbox");

    text.contentEditable = true;
    text.textContent = newTaskInput.value;

    trash.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;

    li.appendChild(checkbox);
    li.appendChild(text);
    li.appendChild(trash);
    taskList.appendChild(li);

    tasksLocal.push(text.textContent);
    updateTodos();

    checkbox.addEventListener("click", () => checkItem(checkbox, li, text));

    trash.addEventListener("click", () => deleteTask(li, text));

    text.addEventListener("click", () => editText(text));
  }

  newTaskInput.value = "";
}

document.querySelector(".new-task").addEventListener("submit", (e) => {
  e.preventDefault();
  addNewTask();
});

function showTasks() {
  tasksLocal.forEach((task, i) => {
    let li = document.createElement("li");
    let text = document.createElement("span");
    let checkbox = document.createElement("INPUT");
    let trash = document.createElement("span");

    li.classList.add("task");
    text.classList.add("task__text");
    checkbox.classList.add("task__checkbox");
    trash.classList.add("task__trash");

    text.contentEditable = true;
    text.classList.remove("checked");
    text.textContent = tasksLocal[i];

    checkbox.setAttribute("type", "checkbox");
    checkbox.checked = false;

    trash.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;

    li.appendChild(checkbox);
    li.appendChild(text);
    li.appendChild(trash);
    taskList.appendChild(li);

    checkbox.addEventListener("click", () => checkItem(checkbox, li, text));

    trash.addEventListener("click", () => deleteTask(li, text));

    text.addEventListener("click", () => editText(text));
  });
}

if (tasksLocal !== null) {
  showTasks();
}

function showCompletedTasks() {
  completedTasksLocal.forEach((task, i) => {
    let li = document.createElement("li");
    let text = document.createElement("span");
    let checkbox = document.createElement("INPUT");
    let trash = document.createElement("span");

    li.classList.add("task");
    text.classList.add("task__text");
    checkbox.classList.add("task__checkbox");
    trash.classList.add("task__trash");

    text.contentEditable = false;
    text.classList.add("checked");

    checkbox.setAttribute("type", "checkbox");
    checkbox.checked = true;

    text.textContent = completedTasksLocal[i];

    trash.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;

    li.appendChild(checkbox);
    li.appendChild(text);
    li.appendChild(trash);
    completedTasks.appendChild(li);

    checkbox.addEventListener("click", () => checkItem(checkbox, li, text));

    trash.addEventListener("click", () => deleteTask(li, text));
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
