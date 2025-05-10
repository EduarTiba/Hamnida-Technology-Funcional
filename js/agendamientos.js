const tablaBody = document.getElementById('agendamientos-list');
const token = localStorage.getItem('token');

if (!token) {
  alert('Debes iniciar sesión para ver tus agendamientos.');
  window.location.href = 'login.html';
}

// Obtener y renderizar los agendamientos
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
          <td id="fecha-${agendamiento._id}">${fecha}</td>
          <td>
            <button class="edit-btn" onclick="mostrarSelectorFecha('${agendamiento._id}')" title="Editar fecha">🖉</button>
            <button class="delete-btn" onclick="eliminarAgendamiento('${agendamiento._id}')" title="Eliminar">🗑</button>
            <div id="selector-${agendamiento._id}" class="fecha-selector" style="display:none; margin-top: 5px;">
              <input type="datetime-local" id="input-${agendamiento._id}" />
              <button onclick="guardarNuevaFecha('${agendamiento._id}')">Guardar</button>
              <button onclick="cancelarEdicion('${agendamiento._id}')">Cancelar</button>
            </div>
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

function mostrarSelectorFecha(id) {
  document.getElementById(`selector-${id}`).style.display = 'block';
}

function cancelarEdicion(id) {
  document.getElementById(`selector-${id}`).style.display = 'none';
}

function guardarNuevaFecha(id) {
  const nuevaFecha = document.getElementById(`input-${id}`).value;
  if (!nuevaFecha) {
    alert('Por favor selecciona una fecha.');
    return;
  }

  fetch(`https://hamnida-tech.onrender.com/api/agendamientos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify({ fecha: nuevaFecha })
  })
    .then(res => res.json())
    .then(data => {
      alert('Fecha actualizada correctamente.');
      location.reload();
    })
    .catch(err => {
      alert('Error al actualizar la fecha.');
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

//Selector de fecha

let agendamientoIdActual = null;

function editarFecha(id) {
  agendamientoIdActual = id;
  document.getElementById('fecha-modal').style.display = 'block';
}

function cerrarModal() {
  document.getElementById('fecha-modal').style.display = 'none';
  agendamientoIdActual = null;
}

function guardarNuevaFecha() {
  const nuevaFecha = document.getElementById('nueva-fecha').value;
  if (!nuevaFecha || !agendamientoIdActual) return;

  fetch(`https://hamnida-tech.onrender.com/api/agendamientos/${agendamientoIdActual}`, {
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
