const token = localStorage.getItem('token');
const API = 'https://hamnida-tech.onrender.com/api';

if (!token) {
  alert('Acceso denegado. Inicia sesión como administrador.');
  window.location.href = 'login.html';
}

function mostrarSeccion(seccion) {
  document.getElementById('usuarios-section').style.display = 'none';
  document.getElementById('servicios-section').style.display = 'none';
  document.getElementById(`${seccion}-section`).style.display = 'block';
}

document.getElementById('logout-btn').addEventListener('click', () => {
  localStorage.removeItem('token');
  window.location.href = 'login.html';
});

// === Usuarios ===
fetch(`${API}/usuarios`, {
  headers: { Authorization: `Bearer ${token}` }
})
  .then(res => res.json())
  .then(usuarios => {
    const tbody = document.getElementById('usuarios-list');
    usuarios.forEach(user => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${user.email}</td>
        <td>${user.role}</td>
        <td>
          <button onclick="eliminarUsuario('${user._id}')">Eliminar</button>
        </td>`;
      tbody.appendChild(tr);
    });
  });

function eliminarUsuario(id) {
  if (!confirm('¿Eliminar este usuario?')) return;
  fetch(`${API}/usuarios/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  })
    .then(res => res.json())
    .then(() => location.reload())
    .catch(err => alert('Error al eliminar usuario.'));
}

// === Servicios ===
fetch(`${API}/servicios`)
  .then(res => res.json())
  .then(servicios => {
    const tbody = document.getElementById('servicios-list');
    servicios.forEach(servicio => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${servicio.name}</td>
        <td>${servicio.description}</td>
        <td>$${servicio.price}</td>
        <td>
          <button onclick="eliminarServicio('${servicio._id}')">Eliminar</button>
        </td>`;
      tbody.appendChild(tr);
    });
  });

function eliminarServicio(id) {
  if (!confirm('¿Eliminar este servicio?')) return;
  fetch(`${API}/servicios/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  })
    .then(res => res.json())
    .then(() => location.reload())
    .catch(err => alert('Error al eliminar servicio.'));
}

document.getElementById('form-servicio').addEventListener('submit', e => {
  e.preventDefault();
  const servicio = {
    name: document.getElementById('nombre').value,
    description: document.getElementById('descripcion').value,
    price: document.getElementById('precio').value
  };
  fetch(`${API}/servicios`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(servicio)
  })
    .then(res => res.json())
    .then(() => location.reload())
    .catch(() => alert('Error al agregar servicio.'));
});
