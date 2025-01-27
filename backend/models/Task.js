const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  completed: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Relaciona a tarefa ao usuário
});

const Task = mongoose.model('Task', TaskSchema);
module.exports = Task;
