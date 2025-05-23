const tablaBody = document.getElementById('agendamientos-list');
const token = localStorage.getItem('token');
let agendamientoSeleccionado = null;

if (!token) {
  alert('Debes iniciar sesión para ver tus agendamientos.');
  window.location.href = 'login.html';
}

fetch('https://hamnida-tech.onrender.com/api/agendamientos', {
  headers: {
    'Authorization': 'Bearer ' + token
  }
})
  .then(res => res.json())
  .then(data => {
    if (!Array.isArray(data)) {
      tablaBody.innerHTML = '<tr><td colspan="5">No se pudieron cargar los agendamientos.</td></tr>';
      return;
    }

    if (data.length === 0) {
      tablaBody.innerHTML = '<tr><td colspan="5">No tienes agendamientos aún.</td></tr>';
    } else {
      data.forEach((agendamiento) => {
        const fecha = new Date(agendamiento.fecha).toLocaleString('es-CO', {
          dateStyle: 'short',
          timeStyle: 'short'
        });

        const servicio = agendamiento.servicios[0];

        const fila = document.createElement('tr');
        fila.innerHTML = `
          <td>${servicio.name}</td>
          <td>${servicio.description}</td>
          <td>$${servicio.price}</td>
          <td>${fecha}</td>
          <td>
            <button class="edit-btn" onclick="mostrarModal('${agendamiento._id}')" title="Editar fecha">🖉</button>
            <button class="delete-btn" onclick="eliminarAgendamiento('${agendamiento._id}')" title="Eliminar">🗑</button>
          </td>
        `;
        tablaBody.appendChild(fila);
      });
    }
  })
  .catch(err => {
    console.error('Error al obtener agendamientos:', err);
    tablaBody.innerHTML = '<tr><td colspan="5">Error al cargar agendamientos.</td></tr>';
  });

// Modal de edición
function mostrarModal(id) {
  agendamientoSeleccionado = id;
  document.getElementById('modal-fecha').style.display = 'flex';
}

function cerrarModal() {
  agendamientoSeleccionado = null;
  document.getElementById('modal-fecha').style.display = 'none';
}

function confirmarFecha() {
  const nuevaFecha = document.getElementById('nueva-fecha').value;
  if (!nuevaFecha || !agendamientoSeleccionado) return;

  fetch(`https://hamnida-tech.onrender.com/api/agendamientos/${agendamientoSeleccionado}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify({ fecha: nuevaFecha })
  })
    .then(res => res.json())
    .then(data => {
      alert('Fecha actualizada');
      cerrarModal();
      location.reload();
    })
    .catch(err => {
      alert('Error al editar la fecha.');
      console.error(err);
    });
}

function eliminarAgendamiento(id) {
  if (!confirm('¿Seguro que deseas eliminar este agendamiento?')) return;

  fetch(`https://hamnida-tech.onrender.com/api/agendamientos/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
    .then(res => res.json())
    .then(data => {
      alert(data.msg || 'Agendamiento eliminado');
      location.reload();
    })
    .catch(err => {
      alert('Error al eliminar el agendamiento.');
      console.error(err);
    });
}
