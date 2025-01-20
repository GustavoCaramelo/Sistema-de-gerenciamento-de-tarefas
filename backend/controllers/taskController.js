const Task = require('../models/Task');

const getTasks = async (req, res) => {
    const tasks = await Task.find();
    res.status(200).json(tasks);
};

const createTask = async (req, res) => {
    const { title, description } = req.body;

    if (!title) {
        return res.status(400).json({ message: 'O título é obrigatório' });
    }

    const task = await Task.create({ title, description });
    res.status(201).json(task);
};

const updateTask = async (req, res) => {
    const task = await Task.findById(req.params.id);

    if (!task) {
        return res.status(404).json({ message: 'Tarefa não encontrada' });
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedTask);
};

const deleteTask = async (req, res) => {
    const task = await Task.findById(req.params.id);

    if (!task) {
        return res.status(404).json({ message: 'Tarefa não encontrada' });
    }

    await task.remove();
    res.status(200).json({ message: 'Tarefa excluída' });
};

module.exports = { getTasks, createTask, updateTask, deleteTask };