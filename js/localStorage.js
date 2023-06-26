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
  localStorage.removeItem("completedTodos");
  completedTasksCounter.innerHTML = 0;
}

clearBtn.addEventListener("click", clearCompletedTasks);
