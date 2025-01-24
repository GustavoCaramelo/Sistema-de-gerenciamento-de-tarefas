const express = require('express');
const router = express.Router();
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware'); // Importa o middleware

router.route('/')
  .get(authMiddleware, getTasks) // Protege a rota GET
  .post(authMiddleware, createTask); // Protege a rota POST

router.route('/:id')
  .put(authMiddleware, updateTask) // Protege a rota PUT
  .delete(authMiddleware, deleteTask); // Protege a rota DELETE

module.exports = router;
