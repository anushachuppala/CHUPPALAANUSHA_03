const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const pendingTaskList = document.querySelector(".pending-task-list");
const completedTaskList = document.querySelector(".completed-task-list");

const pendingCount = document.getElementById("pendingCount");
const completedCount = document.getElementById("completedCount");

// completed task container//

addTaskBtn.addEventListener("click", () => {
  const task = taskInput.value.trim();

  if (task === "") {
    alert("Please enter a task");
    return;
  }

  const taskCard = document.createElement("div");
  taskCard.classList.add("task-card");

  taskCard.innerHTML = `
    <div class="task-info">
      <input type="checkbox" />

      <div>
        <h3>${task}</h3>
        <p>${new Date().toLocaleString()}</p>
      </div>
    </div>

    <div class="task-actions">
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
    </div>
  `;

  pendingTaskList.appendChild(taskCard);

  taskInput.value = "";
});

// delete task logic //

pendingTaskList.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const taskCard = e.target.closest(".task-card");

    taskCard.remove();

    taskCount--;
    pendingCount.textContent = taskCount;
  }
});

// delete task //
pendingTaskList.addEventListener("click", (e) => {
  if (e.target.classList.contains("edit-btn")) {
    const taskTitle = e.target.closest(".task-card").querySelector("h3");

    const updatedTask = prompt("Edit your task:", taskTitle.textContent);

    if (updatedTask !== null && updatedTask.trim() !== "") {
      taskTitle.textContent = updatedTask;
    }
  }
});

// checkbox changes//
pendingTaskList.addEventListener("change", (e) => {
  if (e.target.type === "checkbox") {
    const taskCard = e.target.closest(".task-card");

    taskCard.classList.add("completed-task");

    completedTaskList.appendChild(taskCard);

    taskCount--;
    pendingCount.textContent = taskCount;

    let completedTasks = Number(completedCount.textContent);

    completedTasks++;
    completedCount.textContent = completedTasks;
  }
});

// date and time

function updateDateTime() {
  const now = new Date();

  document.querySelector(".date-time").textContent = now.toLocaleString(
    "en-GB",
    {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    },
  );
}

updateDateTime();
setInterval(updateDateTime, 1000);

// DOM Elements

// Update Counters
function updateTaskCounts() {
  pendingCount.textContent =
    pendingTaskList.querySelectorAll(".task-card").length;

  completedCount.textContent =
    completedTaskList.querySelectorAll(".task-card").length;
}

// Initial Count
updateTaskCounts();

// Handle Checkbox Changes
document.addEventListener("change", (e) => {
  if (e.target.type === "checkbox") {
    const taskCard = e.target.closest(".task-card");

    if (e.target.checked) {
      completedTaskList.appendChild(taskCard);
    } else {
      pendingTaskList.appendChild(taskCard);
    }

    updateTaskCounts();
  }
});

// Handle Delete Button Clicks
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const taskCard = e.target.closest(".task-card");

    taskCard.remove();

    updateTaskCounts();
  }
});

// Function to Add New Task
function addTask(taskName) {
  const taskCard = document.createElement("div");

  taskCard.classList.add("task-card");

  taskCard.innerHTML = `
    <div class="task-info">
      <input type="checkbox">

      <div>
        <h3>${taskName}</h3>
        <p>${new Date().toLocaleString()}</p>
      </div>
    </div>

    <div class="task-actions">
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
    </div>
  `;

  pendingTaskList.appendChild(taskCard);

  updateTaskCounts();
}

// Add Task Button
document.getElementById("addTaskBtn").addEventListener("click", () => {
  const taskInput = document.getElementById("taskInput");

  const taskName = taskInput.value.trim();

  if (taskName === "") return;

  addTask(taskName);

  taskInput.value = "";
});
