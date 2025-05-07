const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const userRoutes = require('./routes/user.routes');
const serviceRoutes = require('./routes/service.routes');
const agendamientoRoutes = require('./routes/agendamiento.routes');

const app = express();

// 🛠️ CORS configurado manualmente
app.use(cors({
  origin: [
    'https://eduartiba.github.io', // 👉 Tu frontend en GitHub Pages
    'http://127.0.0.1:5500'         // 👉 Para pruebas locales
  ],
  credentials: true
}));

// Conexión a Base de Datos
connectDB();

// Middlewares
app.use(express.json());

// Ruta base
app.get('/', (req, res) => {
  res.send('API Hamnida Technology funcionando');
});

// Rutas API
app.use('/api/users', userRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/agendamientos', agendamientoRoutes);

module.exports = app;
