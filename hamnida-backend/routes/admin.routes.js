const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario.model');
const Servicio = require('../models/servicio.model');
const { verifyToken } = require('../middleware/auth.middleware');
const { isAdmin } = require('../middleware/role.middleware');

// Obtener todos los usuarios
router.get('/usuarios', verifyToken, isAdmin, async (req, res) => {
  const usuarios = await Usuario.find({}, '-password');
  res.json(usuarios);
});

// Eliminar usuario
router.delete('/usuarios/:id', verifyToken, isAdmin, async (req, res) => {
  await Usuario.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Usuario eliminado' });
});

// Agregar nuevo servicio
router.post('/servicios', verifyToken, isAdmin, async (req, res) => {
  const nuevo = new Servicio(req.body);
  await nuevo.save();
  res.status(201).json({ msg: 'Servicio agregado' });
});

// Editar servicio
router.put('/servicios/:id', verifyToken, isAdmin, async (req, res) => {
  await Servicio.findByIdAndUpdate(req.params.id, req.body);
  res.json({ msg: 'Servicio actualizado' });
});

// Eliminar servicio
router.delete('/servicios/:id', verifyToken, isAdmin, async (req, res) => {
  await Servicio.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Servicio eliminado' });
});

module.exports = router;
