let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasks = document.querySelector(".tasks");
// Empty Array To Store The Tasks
let data = [];
// Test If There Are Tasks In Local Storage
if (window.localStorage.getItem("tasks")) {
  data = JSON.parse(window.localStorage.getItem("tasks"));
}
// Get Data From Local Storage
getData();
// Add Task
submit.addEventListener("click", (e) => {
  if (input.value !== "") {
    addTaskToArray(input.value); //Add Task To Array Of Tasks
    input.value = ""; //Empty Input Field
  }
});
// Click On Tasks Element
tasks.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    // Remove Element From Page
    e.target.parentElement.remove();
    // Remove Task From Local Storage
    deleteTaskLocal(e.target.parentElement.getAttribute("data-id"));
  }
  // Update Task
  if (e.target.classList.contains("task")) {
    toggleStatusTaskWith(e.target.getAttribute("data-id"));
    e.target.classList.toggle("done");
  }
});
function addTaskToArray(taskText) {
  // Task Data
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  // Push Task To Array Of Tasks
  data.push(task);
  // Add Tasks To Page
  addArrayElements(data);
  // Add Tasks To Local Storage
  addToLocal(data);
}
function addArrayElements(data) {
  // Empty Tasks Div
  tasks.innerHTML = "";
  // Looping On Array Of Tasks
  data.forEach((task) => {
    // Create Main Div
    let div = document.createElement("div");
    div.className = "task";
    if (task.completed) {
      div.classList.add("done");
    }
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(`${task.title}`));
    // Create Delete Button
    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("Delete"));
    // Append Delete Button To Main Div
    div.appendChild(span);
    // Append Main Div To Tasks Div
    tasks.appendChild(div);
  });
}

function addToLocal(data) {
  window.localStorage.setItem("tasks", JSON.stringify(data));
}

function getData() {
  if (window.localStorage.getItem("tasks")) {
    addArrayElements(data);
  }
}

function deleteTaskLocal(taskId) {
  data = data.filter((el) => el.id != taskId);
  addToLocal(data);
}

function toggleStatusTaskWith(taskId) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].id == taskId) {
      data[i].completed == false
        ? (data[i].completed = true)
        : (data[i].completed = false);
    }
  }
  addToLocal(data);
}

// window.localStorage.clear();
