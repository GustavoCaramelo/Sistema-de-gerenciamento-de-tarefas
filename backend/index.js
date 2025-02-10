// Importações
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const errorHandler = require('./middlewares/errorHandler');
const { nanoid } = require('nanoid'); // Importe o nanoid

const app = express();

// Configurações
app.use(express.json());
app.use(cors());

// Modelo de Tarefa
const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  completed: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  shortId: { type: String, unique: true, default: () => nanoid(4) }, // Gera um shortId de 4 caracteres
});

const Task = mongoose.model('Task', TaskSchema);

// Modelo de Usuário
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const User = mongoose.model('User', UserSchema);

// Middleware de autenticação
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Acesso negado, token não fornecido' });
  }

  jwt.verify(token, 'secreto', (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido ou expirado' });
    }
    req.user = user; // Anexa os dados do usuário à requisição
    next();
  });
};

// Rotas protegidas de Tarefas
app.get('/tasks', authenticateToken, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks); // `shortId` será incluído automaticamente
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar tarefas' });
  }
});


app.post('/tasks', authenticateToken, async (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'O título é obrigatório' });
  }

  try {
    const task = new Task({
      title,
      description,
      user: req.user.id, // Associa a tarefa ao usuário autenticado
    });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar tarefa' });
  }
});


app.put('/tasks/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  try {
    const task = await Task.findOne({ _id: id, user: req.user.id }); // Verifica se a tarefa pertence ao usuário

    if (!task) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }

    // Atualiza somente os campos preenchidos, mantendo os valores anteriores caso estejam vazios
    task.title = title?.trim() || task.title; // Usa o valor atual se o novo for vazio
    task.description = description?.trim() || task.description;
    task.completed =
      typeof completed === 'boolean' ? completed : task.completed;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar tarefa' });
  }
});


app.delete('/tasks/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findOneAndDelete({ _id: id, user: req.user.id }); // Verifica se a tarefa pertence ao usuário

    if (!task) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }

    res.json({ message: 'Tarefa excluída com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir tarefa' });
  }
});


// Rota de Registro
app.post('/register', async (req, res) => {
  const { username, password, confirmPassword } = req.body;

  // Verifica se a senha e a confirmação correspondem
  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'As senhas não coincidem' });
  }

  // Verifica o tamanho mínimo da senha
  if (password.length < 6) {
    return res
      .status(400)
      .json({ error: 'A senha deve ter no mínimo 6 caracteres' });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Usuário já existe' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
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
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const token = jwt.sign({ id: user._id }, 'secreto', { expiresIn: '1h' });
    res.status(200).json({ token, message: 'Login realizado com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
});

// Rota /user/me
app.get('/user/me', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // Exclui o campo password
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter informações do usuário' });
  }
});

// Iniciar Servidor
const PORT = 5000;
mongoose
  .connect('mongodb://127.0.0.1:27017/taskmanager')
  .then(() => {
    console.log('Conectado ao MongoDB');
    app.use(errorHandler);
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
  })
  .catch((error) => console.log(`Erro ao conectar ao MongoDB: ${error.message}`));
