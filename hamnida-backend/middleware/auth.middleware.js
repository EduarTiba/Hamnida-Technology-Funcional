// middleware/auth.middleware.js
const jwt = require('jsonwebtoken');

// Verificar que exista y sea válido el token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ msg: 'Token no proporcionado' });

  const token = authHeader.split(' ')[1]; // 'Bearer TOKEN'
  if (!token) return res.status(401).json({ msg: 'Token inválido' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Asegúrate de que `decoded` tiene el `role`
    next();
  } catch (err) {
    res.status(403).json({ msg: 'Token inválido o expirado' });
  }
};


// Verificar que el usuario sea administrador
const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ msg: 'Acceso denegado: No eres administrador' });
  }
  next();
};

module.exports = { verifyToken, isAdmin };
