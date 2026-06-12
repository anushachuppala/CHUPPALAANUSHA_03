const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const pendingTaskList = document.querySelector(".pending-task-list");

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
