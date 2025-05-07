const Service = require('../models/service.model');

const createService = async (req, res) => {
  try {
    const newService = new Service(req.body);
    await newService.save();
    res.status(201).json(newService);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el servicio' });
  }
};

const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los servicios' });
  }
};

const updateService = async (req, res) => {
  try {
    const updated = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ msg: 'Servicio no encontrado' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el servicio' });
  }
};

const deleteService = async (req, res) => {
  try {
    const deleted = await Service.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ msg: 'Servicio no encontrado' });
    res.json({ msg: 'Servicio eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el servicio' });
  }
};

module.exports = {
  createService,
  getAllServices,
  updateService,
  deleteService
};
