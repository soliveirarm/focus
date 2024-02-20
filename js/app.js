import "./darkMode.js";

const newTaskInput = document.querySelector("#new-task__input");
const tasks = document.querySelector(".tasks__list");
const completedTasks = document.querySelector(".completed-tasks__list");
const completedTasksCounter = document.querySelector(
  "#completed-tasks__counter"
);

let TASKS_LOCAL = JSON.parse(localStorage.getItem("tasks")) || [];

const updateTodos = () => (localStorage.tasks = JSON.stringify(TASKS_LOCAL));

function deleteTask(li, text) {
  li.remove();

  let taskIndex = TASKS_LOCAL.indexOf(text.textContent);
  TASKS_LOCAL.splice(taskIndex, 1);
  updateTodos();
}

function editText(text) {
  let taskIndex = TASKS_LOCAL.indexOf(text.textContent);
  text.addEventListener("keyup", () => {
    TASKS_LOCAL.splice(taskIndex, 1, text.textContent);
    updateTodos();
  });
}

const checkItem = (checkbox, li, text) => {
  text.classList.toggle("checked");

  if (checkbox.checked) {
    text.contentEditable = false;

    completedTasks.appendChild(li);

    TASKS_LOCAL.map((task) => {
      if (task.title == text.textContent) {
        task.status = "done";
      }
    });
  } else {
    text.contentEditable = true;

    tasks.appendChild(li);

    TASKS_LOCAL.map((task) => {
      if (task.title == text.textContent) {
        task.status = null;
      }
    });
  }

  completedTasksCounter.innerHTML = TASKS_LOCAL.filter(
    (task) => task.status == "done"
  ).length;
  updateTodos();
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

clearBtn.addEventListener("click", () => {
  completedTasks.innerHTML = "";
  const filteredTasks = TASKS_LOCAL.filter((task) => task.status == null);
  TASKS_LOCAL = filteredTasks;
  updateTodos();
  completedTasksCounter.innerHTML = 0;
});

completedTasksCounter.innerHTML = TASKS_LOCAL.filter(
  (task) => task.status == "done"
).length;

function addNewTask() {
  if (newTaskInput.value !== "") {
    let elements = createTaskElements();
    let { li, text } = elements;

    text.textContent = newTaskInput.value;

    TASKS_LOCAL.push({ title: text.textContent, status: null });
    updateTodos();

    tasks.appendChild(li);
  }

  newTaskInput.value = "";
}

document.querySelector(".new-task").addEventListener("submit", (e) => {
  e.preventDefault();
  addNewTask();
});

function showTasks() {
  TASKS_LOCAL.map((task) => {
    let elements = createTaskElements();
    let { li, text, checkbox } = elements;

    if (task.status == null) {
      text.classList.remove("checked");

      text.textContent = task.title;

      tasks.appendChild(li);
    } else {
      text.contentEditable = false;
      text.classList.add("checked");

      text.textContent = task.title;
      completedTasks.appendChild(li);

      checkbox.checked = true;
    }
  });
}

if (TASKS_LOCAL !== null) {
  showTasks();
}

const toggleCompletedTasks = document.querySelector(".completed-tasks__btn");

const TOGGLE_COMPLETED_TASKS = localStorage.getItem("toggle");

toggleCompletedTasks.addEventListener("click", () => {
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
});

if (TOGGLE_COMPLETED_TASKS !== null) {
  toggleCompletedTasks();
}
