const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Token no formato "Bearer token"

  if (!token) {
    return res.status(401).json({ error: 'Acesso negado, token não fornecido' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido ou expirado' });
    }

    req.user = user; // Anexa os dados do usuário à requisição
    next();
  });
};

module.exports = authenticateToken;
