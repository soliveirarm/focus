import "./darkMode.js";

const newTaskInput = document.querySelector("#new-task__input");
const taskList = document.querySelector(".tasks__list");
const completedTasks = document.querySelector(".completed-tasks__list");
const completedTasksCounter = document.querySelector(
  "#completed-tasks__counter"
);

let TASKS_LOCAL = JSON.parse(localStorage.getItem("TODOS")) || [];
let COMPLETED_TASKS_LOCAL =
  JSON.parse(localStorage.getItem("COMPLETED_TODOS")) || [];

const updateTodos = () => {
  localStorage.setItem("TODOS", JSON.stringify(TASKS_LOCAL));
};

const updateCompletedTodos = () => {
  localStorage.setItem(
    "COMPLETED_TODOS",
    JSON.stringify(COMPLETED_TASKS_LOCAL)
  );
};

const deleteFromLocalStorage = (text, array) => {
  let index = array.indexOf(text.textContent);
  array.splice(index, 1);
};

const deleteTask = (li, text) => {
  li.remove();
  deleteFromLocalStorage(text, TASKS_LOCAL);
  updateTodos();
};

const editText = (text) => {
  let textIndex = TASKS_LOCAL.indexOf(text.textContent);
  text.addEventListener("keyup", () => {
    TASKS_LOCAL.splice(textIndex, 1, text.textContent);
    updateTodos();
  });
};

const checkItem = (checkbox, li, text) => {
  text.classList.toggle("checked");

  if (checkbox.checked) {
    text.contentEditable = false;

    completedTasks.appendChild(li);

    deleteFromLocalStorage(text, TASKS_LOCAL);

    COMPLETED_TASKS_LOCAL.push(text.textContent);

    completedTasksCounter.innerHTML = COMPLETED_TASKS_LOCAL.length;
  } else {
    text.contentEditable = true;

    taskList.appendChild(li);

    deleteFromLocalStorage(text, COMPLETED_TASKS_LOCAL);

    TASKS_LOCAL.push(text.textContent);

    completedTasksCounter.innerHTML = COMPLETED_TASKS_LOCAL.length;
  }

  updateTodos();
  updateCompletedTodos();
};

const createTaskElements = () => {
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
};

const clearBtn = document.querySelector("#clear");

function clearCompletedTasks() {
  completedTasks.innerHTML = "";
  COMPLETED_TASKS_LOCAL = [];
  updateCompletedTodos();
  completedTasksCounter.innerHTML = 0;
}

clearBtn.addEventListener("click", clearCompletedTasks);

completedTasksCounter.innerHTML = COMPLETED_TASKS_LOCAL.length;

function addNewTask() {
  if (newTaskInput.value !== "") {
    let elements = createTaskElements();
    let { li, text } = elements;

    text.textContent = newTaskInput.value;

    TASKS_LOCAL.push(text.textContent);
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
  TASKS_LOCAL.forEach((task, i) => {
    let elements = createTaskElements();
    let { li, text } = elements;

    text.classList.remove("checked");
    text.textContent = TASKS_LOCAL[i];

    taskList.appendChild(li);
  });
}

if (TASKS_LOCAL !== null) {
  showTasks();
}

function showCompletedTasks() {
  COMPLETED_TASKS_LOCAL.forEach((task, i) => {
    let elements = createTaskElements();
    let { li, text, checkbox } = elements;

    text.contentEditable = false;
    text.classList.add("checked");
    text.textContent = COMPLETED_TASKS_LOCAL[i];

    checkbox.checked = true;

    completedTasks.appendChild(li);
  });
}

if (COMPLETED_TASKS_LOCAL !== null) {
  showCompletedTasks();
}

const completedTasksBtn = document.querySelector(".completed-tasks__btn");
let TOGGLE_COMPLETED = localStorage.getItem("TOGGLE");

function toggleCompletedTasks() {
  completedTasks.classList.toggle("hidden");
  clearBtn.classList.toggle("hidden");

  let arrow = document.querySelector(".arrow");
  if (completedTasks.classList.contains("hidden")) {
    arrow.innerHTML = `<i class="fa-solid fa-chevron-up"></i>`;
    localStorage.setItem("TOGGLE", "hidden");
  } else {
    arrow.innerHTML = `<i class="fa-solid fa-chevron-down"></i>`;
    localStorage.removeItem("TOGGLE");
  }
}

completedTasksBtn.addEventListener("click", toggleCompletedTasks);

if (TOGGLE_COMPLETED !== null) {
  toggleCompletedTasks();
}
