const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

  // Modelo de Usuário
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const User = mongoose.model('User', UserSchema);

// Rota de Registro
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Verifica se o usuário já existe
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Usuário já existe' });
    }

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria um novo usuário
    const user = new User({ username, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'Usuário registrado com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao registrar o usuário' });
  }
});

// Rota de Login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Busca o usuário no banco
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Compara as senhas
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Gera o token JWT
    const token = jwt.sign({ id: user._id }, 'secreto', { expiresIn: '1h' });

    res.status(200).json({ token, message: 'Login realizado com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
});