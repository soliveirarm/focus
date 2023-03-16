const newTaskInput = document.getElementById("new-task-input");
// <ul> that receives <li>
const taskList = document.querySelector(".task-list");

const completedTasks = document.querySelector(".completed-tasks--list");
const completedTasksContainer = document.querySelector(".completed-tasks");

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

    // MARKS THE ITEM AS COMPLETED
    function checkItem() {
      itemText.classList.toggle("checked");

      if (itemText.classList.contains("checked")) {
        itemText.style.textDecoration = "line-through";
        itemText.style.color = "rgba(0, 0, 0, 0.3)";
        completedTasks.appendChild(newTaskItem);
      } else {
        itemText.style.textDecoration = "none";
        itemText.style.color = "var(--dark)";
        taskList.appendChild(newTaskItem);
      }
    }

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
