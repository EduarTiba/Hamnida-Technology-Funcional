// backend/app.js

const express = require('express');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const connectDB = require('./config/db');
require('dotenv').config();

const userRoutes = require('./routes/user.routes');
const serviceRoutes = require('./routes/service.routes');
const agendamientoRoutes = require('./routes/agendamiento.routes');
const adminRoutes = require('./routes/admin.routes');
const authRoutes = require('./routes/auth');

const app = express();

// 🔐 Sesiones con cookies almacenadas en MongoDB
app.use(session({
  secret: 'tu_secreto_seguro',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
  }),
  cookie: {
    httpOnly: true,
    secure: false, // Cambia a true si usas HTTPS
    maxAge: 1000 * 60 * 60 * 24, // 1 día
  }
}));

// 🌐 CORS para frontend local y GitHub Pages
app.use(cors({
  origin: [
    'https://eduartiba.github.io',
    'http://127.0.0.1:5500'
  ],
  credentials: true
}));

// Middlewares
app.use(express.json());

// Conexión a BD
connectDB();

// Ruta base
app.get('/', (req, res) => {
  res.send('API Hamnida Technology funcionando');
});

// Rutas API
app.use('/api/users', userRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/agendamientos', agendamientoRoutes);
app.use('/api/admin', adminRoutes);
app.use('/auth', authRoutes);

module.exports = app;
