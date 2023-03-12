// Variables
const addTaskBtn = document.getElementById("add-task-btn");
const newTaskInput = document.getElementById("new-task-input");
const taskList = document.querySelector(".task-list");

// Array that will receive the tasks thata were added
let taskListArray = [];

function addNewTask() {
  let newTaskItem = document.createElement("li");
  newTaskItem.classList.add("list-item");
  let itemText = document.createElement("p");
  itemText.classList.add("item-text");

  if (newTaskInput.value == "") {
    alert("There's no text on the input");
  } else {
    taskListArray.push({ taskName: newTaskInput.value, status: "unchecked" });
    // adds <li> in the <ul>
    taskList.appendChild(newTaskItem);
    // creating the trash can element
    let trashCan = document.createElement("span");
    trashCan.innerHTML = `<i class="fa-solid fa-trash"></i>`;

    // adds the <p> in the <li>
    newTaskItem.appendChild(itemText);

    // pust the input text into the <p>
    itemText.textContent = newTaskInput.value;
    // appends the trash can icon into the <li>
    newTaskItem.appendChild(trashCan);
    // erases the text in the input
    newTaskInput.value = "";

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
    newTaskItem.addEventListener("click", checkItem);
  }
}

// EventListener that adds a <li> to the <ul> in HTML
addTaskBtn.addEventListener("click", addNewTask);

// EventListener that monitors the input text, if enter is pressed, it runs de addNewTask()
newTaskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addNewTask();
  }
});
