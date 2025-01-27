const Task = require('../models/Task');

const getTasks = async (req, res) => {
    try {
      const tasks = await Task.find({ user: req.user.id }); // Busca tarefas apenas do usuário autenticado
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar tarefas' });
    }
  };

  const createTask = async (req, res) => {
    try {
      const { title, description } = req.body;
  
      if (!title) {
        return res.status(400).json({ message: 'O título é obrigatório' });
      }
  
      const task = await Task.create({
        title,
        description,
        user: req.user.id, // Associa a tarefa ao usuário autenticado
      });
  
      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao criar tarefa' });
    }
  };

  const updateTask = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, completed } = req.body;
  
      // Busca a tarefa pelo ID
      const task = await Task.findById(id);
  
      // Verifica se a tarefa existe
      if (!task) {
        return res.status(404).json({ message: 'Tarefa não encontrada' });
      }
  
      // Verifica se o usuário autenticado é o dono da tarefa
      if (task.user.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Acesso negado' });
      }
  
      // Atualiza os campos da tarefa
      task.title = title || task.title;
      task.description = description || task.description;
      task.completed = typeof completed === 'boolean' ? completed : task.completed;
  
      // Salva as alterações
      const updatedTask = await task.save();
      res.status(200).json(updatedTask);
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
      res.status(500).json({ message: 'Erro ao atualizar tarefa' });
    }
  };
  

  const deleteTask = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Busca a tarefa pelo ID
      const task = await Task.findById(id);
  
      // Verifica se a tarefa existe
      if (!task) {
        return res.status(404).json({ message: 'Tarefa não encontrada' });
      }
  
      // Verifica se o usuário autenticado é o dono da tarefa
      if (task.user.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Acesso negado' });
      }
  
      // Remove a tarefa
      await task.remove();
      res.status(200).json({ message: 'Tarefa excluída com sucesso' });
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error);
      res.status(500).json({ message: 'Erro ao excluir tarefa' });
    }
  };
  

module.exports = { getTasks, createTask, updateTask, deleteTask };