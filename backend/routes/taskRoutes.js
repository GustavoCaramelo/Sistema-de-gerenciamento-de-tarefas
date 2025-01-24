const express = require('express');
const router = express.Router();
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');
const validateTask = require('../middlewares/validateTask'); // Middleware de validação de tarefas

router.route('/')
    .get(getTasks)
    .post(validateTask, createTask); // Validações antes de criar tarefa

router.route('/:id')
    .put(validateTask, updateTask) // Validações antes de atualizar tarefa
    .delete(deleteTask);

module.exports = router;
