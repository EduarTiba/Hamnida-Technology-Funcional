function isAdmin(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Acceso denegado. Requiere rol de administrador.' });
  }
  next();
}

module.exports = { isAdmin };
