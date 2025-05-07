const express = require('express');
const router = express.Router();
const {
  crearAgendamiento,
  obtenerAgendamientosDelUsuario,
  actualizarFechaAgendamiento,
  eliminarAgendamiento
} = require('../controllers/agendamiento.controller');
const { verifyToken } = require('../middleware/auth.middleware'); // ✅ aquí corregido

// Rutas protegidas
router.post('/', verifyToken, crearAgendamiento);
router.get('/', verifyToken, obtenerAgendamientosDelUsuario);
router.put('/:id', verifyToken, actualizarFechaAgendamiento);
router.delete('/:id', verifyToken, eliminarAgendamiento);

module.exports = router;
