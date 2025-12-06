const API_URL = "https://todoapp-1-kln2.onrender.com/tasks";

async function fetchTasks() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) {
      const text = await res.text();
      console.error("Error fetching tasks:", res.status, text);
      alert("Error fetching tasks: " + res.status);
      return;
    }

    const tasks = await res.json();
    console.log("Fetched tasks:", tasks);

    ["not_done", "in_progress", "backlog", "completed"].forEach(id => {
      const col = document.querySelector(`#${id} .task-list`);
      if (col) col.innerHTML = "";
    });

    tasks.forEach(task => {
      const column = document.querySelector(`#${task.status} .task-list`);
      if (!column) {
        console.warn("No column for status:", task.status, "task:", task);
        return; // skip invalid status
      }

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
  } catch (err) {
    console.error("fetchTasks error:", err);
    alert("Network error while fetching tasks");
  }
}

async function addTask() {
  const title = document.getElementById("taskInput").value.trim();
  const status = document.getElementById("statusSelect").value;

  if (!title) return alert("Please enter a task!");

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, status })
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Error adding task:", res.status, text);
      alert("Error adding task: " + res.status);
      return;
    }

    document.getElementById("taskInput").value = "";
    await fetchTasks();
  } catch (err) {
    console.error("addTask error:", err);
    alert("Network error while adding task");
  }
}

async function changeStatus(id, newStatus) {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus })
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Error updating task:", res.status, text);
      alert("Error updating task: " + res.status);
      return;
    }

    await fetchTasks();
  } catch (err) {
    console.error("changeStatus error:", err);
    alert("Network error while updating task");
  }
}

async function deleteTask(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!res.ok) {
      const text = await res.text();
      console.error("Error deleting task:", res.status, text);
      alert("Error deleting task: " + res.status);
      return;
    }
    await fetchTasks();
  } catch (err) {
    console.error("deleteTask error:", err);
    alert("Network error while deleting task");
  }
}

fetchTasks();
