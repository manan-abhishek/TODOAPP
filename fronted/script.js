const API_URL = "http://localhost:5000/tasks";

async function fetchTasks() {
  const res = await fetch(API_URL);
  const tasks = await res.json();

  
  ["not_done", "in_progress", "backlog", "completed"].forEach(id => {
    document.querySelector(`#${id} .task-list`).innerHTML = "";
  });

  
  tasks.forEach(task => {
    const column = document.querySelector(`#${task.status} .task-list`);
    const div = document.createElement("div");
    div.classList.add("task-card");
    div.innerHTML = `
      <span>${task.title}</span>
      <div>
        <select class="status-select" onchange="changeStatus('${task._id}', this.value)">
          <option value="not_done" ${task.status === "not_done" ? "selected" : ""}>🚫</option>
          <option value="in_progress" ${task.status === "in_progress" ? "selected" : ""}>🕒</option>
          <option value="backlog" ${task.status === "backlog" ? "selected" : ""}>🗓</option>
          <option value="completed" ${task.status === "completed" ? "selected" : ""}>✅</option>
        </select>
        <button onclick="deleteTask('${task._id}')">❌</button>
      </div>
    `;
    column.appendChild(div);
  });
}

async function addTask() {
  const title = document.getElementById("taskInput").value.trim();
  const status = document.getElementById("statusSelect").value;

  if (!title) return alert("Please enter a task!");

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, status })
  });

  document.getElementById("taskInput").value = "";
  fetchTasks();
}

async function changeStatus(id, newStatus) {
  await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: newStatus })
  });
  fetchTasks();
}

async function deleteTask(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  fetchTasks();
}

fetchTasks();
