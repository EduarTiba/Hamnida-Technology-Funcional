const express = require('express');
const router = express.Router();
const { registrarUsuario, loginUsuario, deleteUser } = require('../controllers/user.controller');
const { verifyToken, isAdmin } = require('../middleware/auth.middleware');

// Rutas de usuarios
router.post('/register', registrarUsuario);
router.post('/login', loginUsuario);
router.delete('/:id', verifyToken, isAdmin, deleteUser);

// 🔐 Ruta solo para admins
router.get('/admin-only', verifyToken, isAdmin, (req, res) => {
  res.json({ msg: 'Acceso de administrador exitoso' });
});

module.exports = router;
