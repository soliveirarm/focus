// add task input
const newTaskInput = document.querySelector("#new-task--input");
// <ul> that receives <li>
const taskList = document.querySelector(".tasks--list");
// ul .completed-tasks--list
const completedTasks = document.querySelector(".completed-tasks--list");

let checkSound = new Audio("/assets/check_sound.wav");

// Adds a new task to taskList
function addNewTask() {
  if (!newTaskInput.value == "") {
    // Declaring variables
    let li = document.createElement("li");
    let text = document.createElement("span");
    let checkbox = document.createElement("INPUT");
    let trash = document.createElement("span");

    // Adding classes to the created items
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

    // pushes it into the array tasksLocal
    tasksLocal.push(text.textContent);
    // updates the array on localStorage
    updateTodos();

    // Marks the item as checked
    checkbox.addEventListener("click", () => {
      checkItem(checkbox, li, text);

      if (checkbox.checked) {
        checkSound.play();
      }
    });

    // Removes an item
    trash.addEventListener("click", () => {
      deleteTask(li, text);
    });

    // Edits the text
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

    // Marks the item as checked
    checkbox.addEventListener("click", () => {
      checkItem(checkbox, li, text);

      if (checkbox.checked) {
        checkSound.play();
      }
    });

    // Removes an item
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

    // Marks the item as checked
    checkbox.addEventListener("click", () => {
      checkItem(checkbox, li, text);

      if (checkbox.checked) {
        checkSound.play();
      }
    });

    // Removes an item
    trash.addEventListener("click", () => {
      deleteTask(li, text);
    });
  });
}

if (completedTasksLocal !== null) {
  showCompletedTasks();
}

// Container with the title and the arrow
let completedTasksBtn = document.querySelector(".completed-tasks--btn");
let toggleCompletedTasksLocal = localStorage.getItem("toggle");

function toggleCompletedTasks() {
  completedTasks.classList.toggle("hidden");
  clearBtn.classList.toggle("hidden");

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
