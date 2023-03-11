// Variables
const addTaskBtn = document.getElementById("add-task-btn");
const newTaskInput = document.getElementById("new-task-input");
const taskList = document.querySelector(".task-list");

// Array that will receive the tasks thata were added
let taskListArray = [];

// EventListener that adds a <li> to the <ul> in HTML
addTaskBtn.addEventListener("click", addNewTask);
addTaskBtn.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    addNewTask();
  }
});

let itemText = document.createElement("p");
itemText.classList.add("item-text");
let newTaskItem = document.createElement("li");
newTaskItem.classList.add("list-item");

function addNewTask() {
  if (newTaskInput.value == "") {
    alert("There's no text on the input");
  } else {
    let trashCan = document.createElement("span");
    trashCan.innerHTML = `<i class="fa-solid fa-trash"></i>`;

    taskList.appendChild(newTaskItem);

    newTaskItem.appendChild(itemText);
    itemText.textContent = newTaskInput.value;
    newTaskItem.appendChild(trashCan);
    newTaskInput.value = "";
  }
}

function checkItem() {
  itemText.classList.toggle("checked");

  if (itemText.classList.contains("checked")) {
    itemText.style.textDecoration = "line-through";
    itemText.style.color = "rgba(0,0,0,0.3)";
    newTaskItem.style.backgroundColor = "var(--secondary-lighter)";
  } else {
    itemText.style.textDecoration = "none";
    itemText.style.color = "#303030";
    newTaskItem.style.backgroundColor = "rgba(0, 0, 0, 0.02)";
  }
}

itemText.addEventListener("click", checkItem);
