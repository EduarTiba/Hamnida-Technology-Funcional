const apiUrl = 'https://hamnida-tech.onrender.com/api';
const token = localStorage.getItem('token');
const userRole = localStorage.getItem('userRole');

// Redirige si no es admin
if (userRole !== 'admin') {
  alert('Acceso denegado. Solo administradores.');
  window.location.href = 'index.html';
}

const usuariosBody = document.querySelector('#usuarios-table tbody');
const serviciosBody = document.querySelector('#servicios-table tbody');
const servicioForm = document.getElementById('servicio-form');

// Cargar usuarios
fetch(`${apiUrl}/users`, {
  headers: { 'Authorization': 'Bearer ' + token }
})
  .then(res => res.json())
  .then(users => {
    users.forEach(user => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.role}</td>
        <td><button onclick="eliminarUsuario('${user._id}')">Eliminar</button></td>
      `;
      usuariosBody.appendChild(row);
    });
  });

// Eliminar usuario
function eliminarUsuario(id) {
  if (!confirm('¿Eliminar este usuario?')) return;
  fetch(`${apiUrl}/users/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': 'Bearer ' + token }
  })
    .then(() => location.reload())
    .catch(err => console.error(err));
}

// Cargar servicios
fetch(`${apiUrl}/servicios`)
  .then(res => res.json())
  .then(servicios => {
    servicios.forEach(s => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${s.name}</td>
        <td>${s.description}</td>
        <td>$${s.price}</td>
        <td>
          <button onclick="editarServicio('${s._id}', '${s.name}', '${s.description}', ${s.price})">Editar</button>
          <button onclick="eliminarServicio('${s._id}')">Eliminar</button>
        </td>
      `;
      serviciosBody.appendChild(row);
    });
  });

// Agregar servicio
servicioForm.addEventListener('submit', e => {
  e.preventDefault();
  const servicio = {
    name: document.getElementById('nombre').value,
    description: document.getElementById('descripcion').value,
    price: document.getElementById('precio').value
  };

  fetch(`${apiUrl}/servicios`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify(servicio)
  }).then(() => location.reload());
});

// Eliminar servicio
function eliminarServicio(id) {
  if (!confirm('¿Eliminar este servicio?')) return;
  fetch(`${apiUrl}/servicios/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': 'Bearer ' + token }
  }).then(() => location.reload());
}

// Editar servicio (simple)
function editarServicio(id, nombre, descripcion, precio) {
  const nuevoNombre = prompt('Nuevo nombre:', nombre);
  const nuevaDescripcion = prompt('Nueva descripción:', descripcion);
  const nuevoPrecio = prompt('Nuevo precio:', precio);

  fetch(`${apiUrl}/servicios/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify({
      name: nuevoNombre,
      description: nuevaDescripcion,
      price: nuevoPrecio
    })
  }).then(() => location.reload());
}
