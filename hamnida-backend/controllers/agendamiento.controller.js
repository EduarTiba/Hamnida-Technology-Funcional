const Agendamiento = require('../models/agendamiento.model');

const crearAgendamiento = async (req, res) => {
  try {
    const nuevoAgendamiento = new Agendamiento({
      usuario: req.user.id,
      servicios: req.body.servicios
    });

    await nuevoAgendamiento.save();
    res.status(201).json({ msg: 'Servicios agendados correctamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al agendar los servicios.' });
  }
};

const obtenerAgendamientosDelUsuario = async (req, res) => {
  try {
    const agendamientos = await Agendamiento.find({ usuario: req.user.id });
    res.json(agendamientos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los agendamientos.' });
  }
};

const actualizarFechaAgendamiento = async (req, res) => {
  try {
    const { id } = req.params;
    const { fecha } = req.body;
    await Agendamiento.findByIdAndUpdate(id, { fecha });
    res.json({ msg: 'Fecha actualizada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar fecha' });
  }
};

const eliminarAgendamiento = async (req, res) => {
  try {
    const { id } = req.params;
    await Agendamiento.findByIdAndDelete(id);
    res.json({ msg: 'Agendamiento eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar agendamiento' });
  }
};

// ✅ Exporta todo junto y solo una vez
module.exports = {
  crearAgendamiento,
  obtenerAgendamientosDelUsuario,
  actualizarFechaAgendamiento,
  eliminarAgendamiento
};
