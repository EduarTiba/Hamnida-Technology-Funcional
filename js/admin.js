const token = localStorage.getItem('token');
const role = localStorage.getItem('userRole');

// Redirigir si no es admin
if (!token || role !== 'admin') {
  alert('Acceso denegado. Solo administradores.');
  window.location.href = 'index.html';
}

// API base
const apiBase = window.location.hostname === 'localhost'
  ? 'http://localhost:5000/api'
  : 'https://hamnida-tech.onrender.com/api';

// ======= USUARIOS =======
const usuariosList = document.getElementById('usuarios-list');

function cargarUsuarios() {
  fetch(`${apiBase}/users`, {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then(res => res.json())
    .then(users => {
      usuariosList.innerHTML = '';
      users.forEach(user => {
        const li = document.createElement('li');
        li.innerHTML = `
          <strong>${user.name}</strong> - ${user.email} (${user.role})
          <button onclick="eliminarUsuario('${user._id}')">Eliminar</button>
        `;
        usuariosList.appendChild(li);
      });
    })
    .catch(err => console.error('Error al cargar usuarios:', err));
}

function eliminarUsuario(id) {
  if (!confirm('¿Eliminar este usuario?')) return;

  fetch(`${apiBase}/users/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  })
    .then(res => res.json())
    .then(data => {
      alert(data.msg || 'Usuario eliminado');
      cargarUsuarios();
    })
    .catch(err => console.error('Error al eliminar:', err));
}

// ======= SERVICIOS =======
const servicioForm = document.getElementById('servicio-form');
const serviciosList = document.getElementById('servicios-list');

servicioForm.addEventListener('submit', e => {
  e.preventDefault();

  const name = document.getElementById('servicio-nombre').value.trim();
  const description = document.getElementById('servicio-descripcion').value.trim();
  const price = parseFloat(document.getElementById('servicio-precio').value);

  if (!name || !description || isNaN(price)) {
    alert('Datos inválidos');
    return;
  }

  fetch(`${apiBase}/servicios`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ name, description, price })
  })
    .then(res => res.json())
    .then(data => {
      alert('Servicio agregado');
      servicioForm.reset();
      cargarServicios();
    })
    .catch(err => console.error('Error al agregar servicio:', err));
});

function cargarServicios() {
  fetch(`${apiBase}/servicios`)
    .then(res => res.json())
    .then(servicios => {
      serviciosList.innerHTML = '';
      servicios.forEach(serv => {
        const li = document.createElement('li');
        li.innerHTML = `
          <strong>${serv.name}</strong>: ${serv.description} - $${serv.price}
          <button onclick="eliminarServicio('${serv._id}')">Eliminar</button>
        `;
        serviciosList.appendChild(li);
      });
    })
    .catch(err => console.error('Error al cargar servicios:', err));
}

function eliminarServicio(id) {
  if (!confirm('¿Eliminar este servicio?')) return;

  fetch(`${apiBase}/servicios/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  })
    .then(res => res.json())
    .then(data => {
      alert(data.msg || 'Servicio eliminado');
      cargarServicios();
    })
    .catch(err => console.error('Error al eliminar servicio:', err));
}

// Cargar al iniciar
document.addEventListener('DOMContentLoaded', () => {
  cargarUsuarios();
  cargarServicios();
});
