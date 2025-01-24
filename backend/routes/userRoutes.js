const express = require('express');
const { registerUser, loginUser, getUserProfile } = require('../controllers/userController');
const authenticateToken = require('../middlewares/authenticateToken');

const router = express.Router();

// Rotas de usuários
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', authenticateToken, getUserProfile);

module.exports = router;
