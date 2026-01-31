const API_URL = "https://task-management-r9nn.onrender.com/api/tasks";
const taskList = document.getElementById("taskList");

const form = document.getElementById("taskForm");
const title = document.getElementById("title");
const description = document.getElementById("description");
const taskStatus = document.getElementById("taskStatus"); // ✅ fixed ID

form.addEventListener("submit", async (e) => {
  e.preventDefault();
//updated
  const task = {
    title: title.value.trim(),
    description: description.value.trim(),
    status: taskStatus.value
  };

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(task)
  });

  if (res.ok) {
    form.reset();
    loadTasks();
  } else {
    alert("Error adding task!");
  }
  console.log(res

  )
});



// Function to load tasks
async function loadTasks() {
  const res = await fetch(API_URL);
  const tasks = await res.json();

  taskList.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");

    li.innerHTML = `
      <div class="task-info">
        <h3>${task.title}</h3>
        <p>${task.description || "<i>No description</i>"}</p>
      </div>
      <div class="task-actions">
        <span class="status-badge" data-status="${task.status}"></span>
        <button onclick="deleteTask('${task._id}')">Delete</button>
      </div>
    `;

    taskList.appendChild(li);
  });
}

// Delete Task
async function deleteTask(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  loadTasks();
}

// Initial load
loadTasks();
