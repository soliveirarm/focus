// add task input
const newTaskInput = document.querySelector("#new-task-input");
// <ul> that receives <li>
const taskList = document.querySelector(".task-list");
// section .completed-tasks
const completedTasksContainer = document.querySelector(".completed-tasks");
// ul .completed-tasks__list
const completedTasks = document.querySelector(".completed-tasks__list");

// localStorage arrays
let tasksLocal = JSON.parse(localStorage.getItem("todos")) || [];
let completedTasksLocal =
  JSON.parse(localStorage.getItem("completedTodos")) || [];

// Modal related variables
const editModal = document.querySelector("#edit-modal");
const editInput = document.querySelector("#edit-input");
const editBtn = document.querySelector("#edit");
const deleteTaskBtn = document.querySelector("#delete-task");

const closeBtn = document.querySelector("#close");
closeBtn.addEventListener("click", () => {
  editModal.close();
});

document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});

// Marks the item as completed
function checkItem(checkbox, li, text) {
  text.classList.toggle("checked");
  let el;

  if (checkbox.checked) {
    text.contentEditable = false;
    // Appends the task to the .completed-tasks
    completedTasks.appendChild(li);
    el = tasksLocal.indexOf(text.textContent);
    tasksLocal.splice(el, 1);
    completedTasksLocal.push(text.textContent);

    localStorage.todos = JSON.stringify(tasksLocal);
    localStorage.completedTodos = JSON.stringify(completedTasksLocal);
  } else {
    text.contentEditable = true;
    // Appends the task to the task-list container
    taskList.appendChild(li);
    el = completedTasksLocal.indexOf(text.textContent);

    completedTasksLocal.splice(el, 1);
    tasksLocal.push(text.textContent);

    localStorage.completedTodos = JSON.stringify(completedTasksLocal);
    localStorage.todos = JSON.stringify(tasksLocal);
  }
}

function deleteTask(checkbox, li, text) {
  li.remove();
  let element;
  if (checkbox.checked) {
    // Removes it from completedTasks storage
    element = completedTasksLocal.indexOf(text.textContent);
    completedTasksLocal.splice(element, 1);
    localStorage.completedTodos = JSON.stringify(completedTasksLocal);
  } else {
    // Removes it from todos storage
    element = tasksLocal.indexOf(text.textContent);
    tasksLocal.splice(element, 1);
    localStorage.todos = JSON.stringify(tasksLocal);
  }
}

function editText(text) {
  let textIndex = tasksLocal.indexOf(text.textContent);
  text.addEventListener("keyup", () => {
    tasksLocal.splice(textIndex, 1, text.textContent);
    localStorage.setItem("todos", JSON.stringify(tasksLocal));
  });
}

// Adds a new task to taskList
function addNewTask() {
  if (!newTaskInput.value == "") {
    // li
    let li = document.createElement("li");
    li.classList.add("list-item");

    // span inside li
    let text = document.createElement("span");
    text.classList.add("item-text");
    text.contentEditable = true;

    let checkbox = document.createElement("INPUT");
    checkbox.setAttribute("type", "checkbox");
    checkbox.classList.add("item-checkbox");

    let trash = document.createElement("span");
    trash.classList.add("trash");
    trash.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;

    li.appendChild(checkbox);
    li.appendChild(text);
    li.appendChild(trash);
    taskList.appendChild(li);

    // puts the input text into the <p>
    text.textContent = newTaskInput.value;

    // pushes it into localStorage
    tasksLocal.push(text.textContent);
    localStorage.setItem("todos", JSON.stringify(tasksLocal));

    // Marks the item as checked
    checkbox.addEventListener("click", () => {
      checkItem(checkbox, li, text);
    });

    // Removes an item
    trash.addEventListener("click", () => {
      deleteTask(checkbox, li, text);
    });

    text.addEventListener("click", () => {
      editText(text);
    });
  }

  // Erases the text in the input
  newTaskInput.value = "";
}

// EventListener that monitors the input text, if enter is pressed, it runs de addNewTask()
newTaskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addNewTask();
  }
});

function showTasks() {
  tasksLocal.forEach((task, i) => {
    // li
    let li = document.createElement("li");
    li.classList.add("list-item");

    // span inside li
    let text = document.createElement("span");
    text.classList.add("item-text");
    text.contentEditable = true;

    let checkbox = document.createElement("INPUT");
    checkbox.setAttribute("type", "checkbox");
    checkbox.classList.add("item-checkbox");
    checkbox.checked = false;
    text.classList.remove("checked");

    let trash = document.createElement("span");
    trash.classList.add("trash");
    trash.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;

    li.appendChild(checkbox);
    li.appendChild(text);
    li.appendChild(trash);
    taskList.appendChild(li);

    // puts the input text into the <p>
    text.textContent = tasksLocal[i];

    // Marks the item as checked
    checkbox.addEventListener("click", () => {
      checkItem(checkbox, li, text);
    });

    // Removes an item
    trash.addEventListener("click", () => {
      deleteTask(checkbox, li, text);
    });

    text.addEventListener("click", () => {
      editText(text);
    });
  });
}

if (tasksLocal !== null) {
  showTasks();
}

function showCompletedTasks() {
  completedTasksLocal.forEach((task, i) => {
    // li
    let li = document.createElement("li");
    li.classList.add("list-item");

    // span inside li
    let text = document.createElement("span");
    text.classList.add("item-text");
    text.contentEditable = true;

    let checkbox = document.createElement("INPUT");
    checkbox.setAttribute("type", "checkbox");
    checkbox.classList.add("item-checkbox");
    checkbox.checked = true;
    text.classList.add("checked");

    let trash = document.createElement("span");
    trash.classList.add("trash");
    trash.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;

    li.appendChild(checkbox);
    li.appendChild(text);
    li.appendChild(trash);
    taskList.appendChild(li);

    // puts the input text into the <p>
    text.textContent = tasksLocal[i];

    // Marks the item as checked
    checkbox.addEventListener("click", () => {
      checkItem(checkbox, li, text);
    });

    // Removes an item
    trash.addEventListener("click", () => {
      deleteTask(checkbox, li, text);
    });
  });
}

if (completedTasksLocal !== null) {
  showCompletedTasks();
}

let clear = document.querySelector("#clear");

function clearCompletedTasks() {
  completedTasks.innerHTML = "";
  localStorage.removeItem("completedTodos");
}

clear.addEventListener("click", clearCompletedTasks);

// Container with the title and the arrow
let completedTasksBtn = document.querySelector(".completed-tasks__btn");
let toggleCompletedTasksLocal = localStorage.getItem("toggle");

function toggleCompletedTasks() {
  completedTasks.classList.toggle("hidden");
  clear.classList.toggle("hidden");

  let arrow = document.querySelector(".arrow");
  if (completedTasks.classList.contains("hidden")) {
    // Changes the icon
    arrow.innerHTML = `<i class="fa-solid fa-chevron-up"></i>`;
    // Stores the current "position" (hidden)
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

let darkModeBtn = document.querySelector("#toggle-dark-mode");
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
