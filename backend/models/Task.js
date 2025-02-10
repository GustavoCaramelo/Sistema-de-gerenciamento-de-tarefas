const { nanoid } = require('nanoid'); // Importe o nanoid

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  completed: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  shortId: { type: String, unique: true, default: () => nanoid(4) }, // Gera um shortId de 4 caracteres
});

const Task = mongoose.model('Task', TaskSchema);
module.exports = Task;
