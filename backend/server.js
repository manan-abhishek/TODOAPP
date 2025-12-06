const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// ✅ In-memory "database"
let tasks = [];
let nextId = 1;

// ✅ Health Check Route
app.get('/', (req, res) => {
  res.send('✅ API is running successfully (in-memory DB)');
});

// ✅ Get all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// ✅ Add new task
app.post('/tasks', (req, res) => {
  const { title, status } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const newTask = {
    _id: String(nextId++),         // mimic Mongo _id as string
    title,
    status: status || 'not_done'
  };

  tasks.push(newTask);
  res.json(newTask);
});

// ✅ Update task status
app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const task = tasks.find(t => t._id === id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  if (status) {
    task.status = status;
  }

  res.json(task);
});

// ✅ Delete task
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const index = tasks.findIndex(t => t._id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  tasks.splice(index, 1);
  res.json({ message: '✅ Task deleted successfully' });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
