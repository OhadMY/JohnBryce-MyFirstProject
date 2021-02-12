// Grab Elements
const form = document.querySelector("form");
const taskContent = document.querySelector("#taskcontent");
const taskDate = document.querySelector("#date");
const taskTime = document.querySelector("#time");
const tasksList = document.querySelector("#tasks");

// Creating tasks array
let tasksArray = [];

// On page load get tasksArray from localStorage
window.addEventListener("load", function () {
  // Take the data from localStorage as string and parse is
  const localStorageTasks = JSON.parse(localStorage.getItem("tasksArray"));
  //   Checks if localStorage was not empty
  if (localStorageTasks) {
    tasksArray = localStorageTasks;
    setTasksToHTML();
  }
});

// Send form
form.addEventListener("submit", function (e) {
  // Disable form refresh
  e.preventDefault();
  //   Checks if inputs are empty or not
  if (taskContent.value.trim() && taskTime.value && taskDate.value) {
    //   converting the inputs values into variables
    const tDate = taskDate.value;
    const tTime = taskTime.value;
    const tContent = taskContent.value;

    // Create element that has the task info
    const task = { tContent, tDate, tTime };

    // Adding task to tasksArray
    tasksArray.push(task);

    // sumbit Tasks to LocalStorage
    localStorage.setItem("tasksArray", JSON.stringify(tasksArray));

    // Create Tasks
    createTask(tasksArray.length - 1);

    // Reset form
    taskContent.value = "";
    taskTime.value = "";
    taskDate.value = "";
  }
});

// Create task function
function createTask(i) {
  // Creating new Task (li)
  let listItem = document.createElement("li");
  listItem.classList = "task";
  //   Creating the task content
  let pTask = document.createElement("p");
  pTask.classList = "content";
  pTask.textContent = tasksArray[i].tContent;
  //   Creating the task date
  let pDate = document.createElement("p");
  pDate.classList = "date";
  pDate.textContent = tasksArray[i].tDate;
  //   Creating the task time
  let pTime = document.createElement("p");
  pTime.classList = "time";
  pTime.textContent = tasksArray[i].tTime;
  //   Creatin X button
  let closeBtn = document.createElement("button");
  closeBtn.className = "closeBtn";
  closeBtn.innerHTML = "<i class='fas fa-times'></i>";
  closeBtn.onclick = function () {
    deleteTask(i);
  };
  //   Setting everything together
  tasksList.appendChild(listItem);
  listItem.appendChild(pTask);
  listItem.appendChild(pDate);
  listItem.appendChild(pTime);
  listItem.appendChild(closeBtn);
}

// get tasks and set to html
function setTasksToHTML() {
  tasksList.innerHTML = "";
  for (let i = 0; i < tasksArray.length; i++) {
    createTask(i);
  }
}

// Delete specific task from tasksArray
function deleteTask(i) {
  tasksArray.splice(i, 1);
  setTasksToHTML();
  localStorage.setItem("tasksArray", JSON.stringify(tasksArray));
}
