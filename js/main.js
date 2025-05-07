// main.js (modo local)
const apiUrl = 'http://localhost:5000/api/services';
const agendamientoUrl = 'http://localhost:5000/api/agendamientos';
const serviceList = document.getElementById('service-list');
const userStatus = document.getElementById('user-status');
const userActions = document.getElementById('user-actions');
const username = localStorage.getItem('username') || 'usuario';
const userRole = localStorage.getItem('userRole') || 'user';

// Mostrar estado de usuario
function renderUserStatus() {
  const token = localStorage.getItem('token');
  const userBar = document.getElementById('user-bar');
  if (token) {
    userBar.innerHTML = `
      <span>Bienvenido/a, <strong>${username}</strong></span>
      <button onclick="location.href='agendamientos.html'" class="btn-primary">Mis agendamientos</button>
      <button onclick="logout()" class="btn-primary">Cerrar sesión</button>
      ${userRole === 'admin' ? '<button onclick="abrirModalServicio()" class="btn-primary">➕ Nuevo Servicio</button>' : ''}
    `;
  } else {
    userBar.innerHTML = `
      <a href="login.html">Iniciar sesión</a> | <a href="register.html">Registrarse</a>
    `;
  }
}


// Mostrar acciones de usuario
function renderUserActions() {
  const token = localStorage.getItem('token');
  if (!token) {
    userActions.innerHTML = '';
    return;
  }

  const isMainPage = window.location.pathname.includes('index.html');
  userActions.innerHTML = isMainPage
    ? `
      <button onclick="location.href='agendamientos.html'">Mis agendamientos</button>
      ${userRole === 'admin' ? '<button onclick="abrirModalServicio()">➕ Nuevo Servicio</button>' : ''}
    `
    : '';
}

// Abrir/Cerrar modal para nuevo servicio (solo admin)
function abrirModalServicio() {
  document.getElementById('modal-servicio').style.display = 'block';
}
function cerrarModalServicio() {
  const modal = document.getElementById('modal-servicio');
  modal.classList.add('fade-out');
  setTimeout(() => {
    modal.style.display = 'none';
    modal.classList.remove('fade-out');
  }, 300);
}

// Modal confirmación
function mostrarModalConfirmacion() {
  document.getElementById('modal-confirmacion').style.display = 'block';
}
function cerrarModalConfirmacion() {
  document.getElementById('modal-confirmacion').style.display = 'none';
}

// Crear nuevo servicio (admin)
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-nuevo-servicio');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const nombre = document.getElementById('nombre-servicio').value.trim();
      const descripcion = document.getElementById('descripcion-servicio').value.trim();
      const precio = parseFloat(document.getElementById('precio-servicio').value);
      const token = localStorage.getItem('token');

      if (!nombre || !descripcion || isNaN(precio) || precio <= 0) {
        alert('Completa todos los campos correctamente.');
        return;
      }

      try {
        const res = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify({ name: nombre, description: descripcion, price: precio })
        });

        const data = await res.json();
        if (res.ok) {
          cerrarModalServicio();
          mostrarModalConfirmacion();
          setTimeout(() => location.reload(), 1500);
        } else {
          alert(data.msg || 'Error al agregar el servicio');
        }
      } catch (error) {
        console.error(error);
        alert('Error al conectar al servidor.');
      }
    });
  }
});

// Cerrar modal haciendo clic fuera
window.onclick = function (event) {
  const modal = document.getElementById('modal-servicio');
  if (event.target === modal) cerrarModalServicio();
};

// Cerrar sesión
function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  localStorage.removeItem('userRole');
  alert('Has cerrado sesión.');
  window.location.reload();
}

// Cargar servicios con botón Agendar
function fetchServices() {
  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      serviceList.innerHTML = '';
      data.forEach(service => {
        const row = document.createElement('tr');
        row.innerHTML = `
  <td>${service.name}</td>
  <td>${service.description}</td>
  <td>$${service.price}</td>
  <td>
    <button class="btn-icon" onclick="agendarServicio(${JSON.stringify(service).replace(/"/g, '&quot;')})">
      <i class="fas fa-calendar-plus"></i>
    </button>
  </td>
   `;
        serviceList.appendChild(row);
      });
    })
    .catch(error => {
      console.error('Error al cargar servicios:', error);
    });
}

// Agendar servicio individualmente
function agendarServicio(service) {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Debes iniciar sesión para agendar servicios.');
    return;
  }

  fetch('http://localhost:5000/api/agendamientos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token  // 🔍 Este encabezado debe estar bien escrito
    },
    body: JSON.stringify({
      servicios: [service]
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.msg) {
        alert(data.msg);
      } else {
        alert('Error al agendar el servicio');
      }
    })
    .catch(err => {
      alert('Error al conectar con el servidor.');
      console.error(err);
    });
}

// Inicializar funciones
renderUserStatus();
renderUserActions();
fetchServices();
