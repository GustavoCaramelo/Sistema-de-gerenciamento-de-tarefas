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
    console.log('Usuário autenticado:', user); // Log para verificar o ID do usuário
    next();
  });
};
