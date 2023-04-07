// input
const newTaskInput = document.querySelector("#new-task-input");
// <ul> that receives <li>
const taskList = document.querySelector(".task-list");
// section .completed-tasks
const completedTasksContainer = document.querySelector(".completed-tasks");
// ul .completed-tasks__list
const completedTasks = document.querySelector(".completed-tasks__list");

let tasksLocal = localStorage.getItem("tasks");

let taskArray;
if (tasksLocal === null) {
}

// MARKS THE ITEM AS COMPLETED
function checkItem(text, li) {
  text.classList.toggle("checked");

  if (text.classList.contains("checked")) {
    // Appends the task to the completed-tasks container
    completedTasks.appendChild(li);
  } else {
    // Appends the task to the task-list container
    taskList.appendChild(li);
  }
}

// MAIN FUNCTION THAT ADDS NEW TASKS TO THE DIV
function addNewTask() {
  let newTaskItem = document.createElement("li");
  newTaskItem.classList.add("list-item");
  let itemText = document.createElement("p");
  itemText.classList.add("item-text");

  if (newTaskInput.value == "") {
    alert("There's no text on the input");
  } else {
    // adds <li> in the <ul>
    taskList.appendChild(newTaskItem);

    // creating the trash can element
    let trashCan = document.createElement("span");
    trashCan.innerHTML = `<i class="fa-solid fa-trash"></i>`;

    /* let editText = document.createElement("span");
    editText.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`; */

    let iconsContainer = document.createElement("div");
    iconsContainer.classList.add("icons-container");
    // iconsContainer.appendChild(editText);
    iconsContainer.appendChild(trashCan);

    // adds the <p> in the <li>
    newTaskItem.appendChild(itemText);

    // puts the input text into the <p>
    itemText.textContent = newTaskInput.value;
    // appends the iconsContainer icon into the <li>
    newTaskItem.appendChild(iconsContainer);
    // erases the text in the input
    newTaskInput.value = "";

    itemText.addEventListener("click", () => {
      checkItem(itemText, newTaskItem);
    });

    // SHOWS THE ICONS WHEN HOVERING
    function showIconsOnHover() {
      iconsContainer.classList.toggle("active");
    }

    // marks the items as completed
    itemText.addEventListener("click", checkItem);
    // show and hide the icons
    newTaskItem.addEventListener("mouseover", showIconsOnHover);
    newTaskItem.addEventListener("mouseout", showIconsOnHover);

    // REMOVES AN ITEM FROM THE LIST
    trashCan.addEventListener("click", () => {
      newTaskItem.remove();
    });
  }
}

// EventListener that monitors the input text, if enter is pressed, it runs de addNewTask()
newTaskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addNewTask();
  }
});

//itemText.addEventListener("touchmove", checkItem);
