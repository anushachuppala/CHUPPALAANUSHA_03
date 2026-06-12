const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const pendingTaskList = document.querySelector(".pending-task-list");

// completed task container//
const completedTaskList = document.querySelector(".completed-task-list");
const completedCount = document.getElementById("completedCount");

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
