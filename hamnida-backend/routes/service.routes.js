// routes/service.routes.js
const express = require('express');
const router = express.Router();
const { createService, getAllServices, updateService, deleteService } = require('../controllers/service.controller');
const { verifyToken, isAdmin } = require('../middleware/auth.middleware');

// Crear servicio (solo admin)
router.post('/', verifyToken, isAdmin, createService);

// Actualizar servicio (solo admin)
router.put('/:id', verifyToken, isAdmin, updateService);

// Eliminar servicio (solo admin)
router.delete('/:id', verifyToken, isAdmin, deleteService);

// Ver servicios (público)
router.get('/', getAllServices);

module.exports = router;
