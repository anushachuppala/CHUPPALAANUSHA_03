const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");

const pendingTaskList = document.querySelector(".pending-task-list");
const completedTaskList = document.querySelector(".completed-task-list");

const pendingCount = document.getElementById("pendingCount");
const completedCount = document.getElementById("completedCount");

// Update Counts
function updateTaskCounts() {
  pendingCount.textContent =
    pendingTaskList.querySelectorAll(".task-card").length;

  completedCount.textContent =
    completedTaskList.querySelectorAll(".task-card").length;
}

// Add Task
function addTask(taskName) {
  const taskCard = document.createElement("div");

  taskCard.classList.add("task-card");

  taskCard.innerHTML = `
    <div class="task-info">
      <input type="checkbox">

      <div>
        <h3>${taskName}</h3>
        <p>${new Date().toLocaleString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })}</p>
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

// Add Button
addTaskBtn.addEventListener("click", () => {
  const taskName = taskInput.value.trim();

  if (taskName === "") {
    alert("Please enter a task");
    return;
  }

  addTask(taskName);

  taskInput.value = "";
});

// Checkbox Move Logic
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

// Delete Logic
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    e.target.closest(".task-card").remove();

    updateTaskCounts();
  }
});

// Edit Logic
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("edit-btn")) {
    const taskTitle = e.target.closest(".task-card").querySelector("h3");

    const updatedTask = prompt("Edit your task:", taskTitle.textContent);

    if (updatedTask && updatedTask.trim() !== "") {
      taskTitle.textContent = updatedTask.trim();
    }
  }
});

// Initial Count
updateTaskCounts();
