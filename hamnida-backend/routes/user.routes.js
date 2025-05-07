const express = require('express');
const router = express.Router();
const { registrarUsuario, loginUsuario, deleteUser } = require('../controllers/user.controller'); // Asegúrate de importar todos los controladores
const { verifyToken, isAdmin } = require('../middleware/auth.middleware');

// Rutas de usuarios
router.post('/register', registrarUsuario); // POST /api/users/register
router.post('/login', loginUsuario); // POST /api/users/login ✅
router.delete('/:id', verifyToken, isAdmin, deleteUser); // DELETE /api/users/:id ✅

module.exports = router;
