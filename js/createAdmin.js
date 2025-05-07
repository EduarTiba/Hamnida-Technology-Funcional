const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/user.model');
require('dotenv').config();

const crearAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const email = 'admin@admin.com'; // Cambia si usas otro
    const existente = await User.findOne({ email });
    if (existente) {
      console.log('El administrador ya existe.');
      return;
    }

    const hashedPassword = await bcrypt.hash('admin123', 10);

    const admin = new User({
      name: 'Administrador',
      email,
      password: hashedPassword,
      role: 'admin'
    });

    await admin.save();
    console.log('✅ Usuario administrador creado correctamente.');
    mongoose.disconnect();
  } catch (error) {
    console.error('❌ Error al crear el usuario admin:', error);
    mongoose.disconnect();
  }
};

crearAdmin();
