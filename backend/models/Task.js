const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  status: {
    type: String,
    enum: ['not_done', 'in_progress', 'backlog', 'completed'],
    default: 'not_done'
  }
});

module.exports = mongoose.model('Task', taskSchema);
