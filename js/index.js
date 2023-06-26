const newTaskInput = document.querySelector("#new-task--input");
const taskList = document.querySelector(".tasks--list");
const completedTasks = document.querySelector(".completed-tasks--list");
const completedTasksCounter = document.querySelector(
  "#completed-tasks--counter"
);
completedTasksCounter.innerHTML = completedTasksLocal.length;

function addNewTask() {
  if (!newTaskInput.value == "") {
    let li = document.createElement("li");
    let text = document.createElement("span");
    let checkbox = document.createElement("INPUT");
    let trash = document.createElement("span");

    li.classList.add("list-item");
    text.classList.add("item-text");
    checkbox.classList.add("item-checkbox");
    trash.classList.add("trash");

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

    checkbox.addEventListener("click", () => {
      checkItem(checkbox, li, text);
    });

    trash.addEventListener("click", () => {
      deleteTask(li, text);
    });

    text.addEventListener("click", () => {
      editText(text);
    });
  }

  newTaskInput.value = "";
}

newTaskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addNewTask();
  }
});

function showTasks() {
  tasksLocal.forEach((task, i) => {
    let li = document.createElement("li");
    let text = document.createElement("span");
    let checkbox = document.createElement("INPUT");
    let trash = document.createElement("span");

    li.classList.add("list-item");
    text.classList.add("item-text");
    checkbox.classList.add("item-checkbox");
    trash.classList.add("trash");

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

    checkbox.addEventListener("click", () => {
      checkItem(checkbox, li, text);
    });

    trash.addEventListener("click", () => {
      deleteTask(li, text);
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
    let li = document.createElement("li");
    let text = document.createElement("span");
    let checkbox = document.createElement("INPUT");
    let trash = document.createElement("span");

    li.classList.add("list-item");
    text.classList.add("item-text");
    checkbox.classList.add("item-checkbox");
    trash.classList.add("trash");

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

    checkbox.addEventListener("click", () => {
      checkItem(checkbox, li, text);
    });

    trash.addEventListener("click", () => {
      deleteTask(li, text);
    });
  });
}

if (completedTasksLocal !== null) {
  showCompletedTasks();
}

let completedTasksBtn = document.querySelector(".completed-tasks--btn");
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

document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});
