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
  // Sets min date to current date
  const date = minDate();
  taskDate.setAttribute("min", date);
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
    let isNew = true;

    // Sets the min time to current time
    if (minDate() === tDate) minTime();

    // Create element that has the task info
    const task = { tContent, tDate, tTime };

    // Adding task to tasksArray
    tasksArray.push(task);

    // sumbit Tasks to LocalStorage
    localStorage.setItem("tasksArray", JSON.stringify(tasksArray));

    // Create Tasks
    createTask(tasksArray.length - 1, isNew);

    // Reset form
    taskContent.value = "";
    taskTime.value = "";
    taskDate.value = "";
  }
});

// Create task function
function createTask(i, isNew) {
  // Creating new Task (li)
  let listItem = document.createElement("li");
  listItem.classList = "task col m-2";
  // Checks if task is new and set the opacity for new task
  if (isNew) listItem.style.opacity = 0;
  //   Creating the task content
  let pTask = document.createElement("p");
  pTask.classList = "content text-break";
  pTask.textContent = tasksArray[i].tContent;
  // Create div for datetime
  let datetime = document.createElement("div");
  datetime.classList = "datetime";
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
  listItem.appendChild(datetime);
  datetime.appendChild(pDate);
  datetime.appendChild(pTime);
  listItem.appendChild(closeBtn);
  // Get the specific style that wanna be changed, applies style from line 59
  window.getComputedStyle(listItem).opacity;
  // Actually changes the opacity for new task based on the selection from line 91 (mandatory in order for the transition to work)
  listItem.style.opacity = 1;
}

// Get tasks and set to html
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

// Sets min date input
function minDate() {
  let now = new Date();
  let y = now.getFullYear();
  let m = now.getMonth() + 1;
  let d = now.getDate();
  if (m < 10) m = "0" + m;
  if (d < 10) d = "0" + d;
  let minDate = y + "-" + m + "-" + d;

  return minDate;
}

// Sets min time input
function minTime() {
  let now = new Date();
  let h = now.getHours();
  let m = now.getMinutes();

  if (h < 10) h = "0" + h;
  if (m < 10) m = "0" + m;
  let minTime = h + ":" + m;
  console.log(minTime);
  taskTime.setAttribute("min", minTime);
}
