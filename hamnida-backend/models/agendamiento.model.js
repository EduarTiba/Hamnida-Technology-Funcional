const mongoose = require('mongoose');

const AgendamientoSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  servicios: [
    {
      name: String,
      description: String,
      price: Number
    }
  ],
  fecha: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Agendamiento', AgendamientoSchema);
    