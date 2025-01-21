const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Configurações
app.use(express.json());
app.use(cors());

// Modelo de Tarefa
const TaskSchema = new mongoose.Schema({
  title: String,
  description: String,
  completed: { type: Boolean, default: false },
});
const Task = mongoose.model('Task', TaskSchema);

// Rotas
// 1. Listar Tarefas
app.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// 2. Criar Tarefa
app.post('/tasks', async (req, res) => {
  const { title, description } = req.body;
  const task = new Task({ title, description });
  await task.save();
  res.json(task);
});

// 3. Atualizar Tarefa
app.put('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  const task = await Task.findByIdAndUpdate(id, { title, description, completed }, { new: true });
  res.json(task);
});

// 4. Excluir Tarefa
app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  await Task.findByIdAndDelete(id);
  res.json({ message: 'Tarefa excluída com sucesso!' });
});

// Iniciar Servidor
const PORT = 5000;
mongoose
  .connect('mongodb://127.0.0.1:27017/taskmanager')
  .then(() => {
    console.log('Conectado ao MongoDB');
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
  })
  .catch((error) => console.log(`Erro ao conectar ao MongoDB: ${error.message}`));