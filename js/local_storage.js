// VARIABLES AND FUNCTION THAT HAVE TO DO WITH LOCALSTORAGE

// localStorage arrays
let tasksLocal = JSON.parse(localStorage.getItem("todos")) || [];
let completedTasksLocal =
  JSON.parse(localStorage.getItem("completedTodos")) || [];

// localStorage manipulation functions
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

// Marks the item as completed
function checkItem(checkbox, li, text) {
  text.classList.toggle("checked");

  if (checkbox.checked) {
    text.contentEditable = false;

    // Appends the task to the .completed-tasks
    completedTasks.appendChild(li);

    // Deletes it from tasksLocal
    deleteFromLocalStorage(text, tasksLocal);

    // Adds it to completedTasksLocal
    completedTasksLocal.push(text.textContent);

    // Updates the localStorage
    updateTodos();
    updateCompletedTodos();
  } else {
    text.contentEditable = true;

    // Appends the task to the task-list container
    taskList.appendChild(li);

    // Deletes it from completedTasksLocal
    deleteFromLocalStorage(text, completedTasksLocal);

    // Adds it to tasksLocal
    tasksLocal.push(text.textContent);

    // Updates the localStorage
    updateTodos();
    updateCompletedTodos();
  }
}

const clearBtn = document.querySelector("#clear");

function clearCompletedTasks() {
  completedTasks.innerHTML = "";
  localStorage.removeItem("completedTodos");
}

clearBtn.addEventListener("click", clearCompletedTasks);
