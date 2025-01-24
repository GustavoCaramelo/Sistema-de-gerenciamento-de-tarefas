const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId, // Referência ao usuário
    ref: 'User', // Nome da coleção do usuário
    required: true,
  },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
