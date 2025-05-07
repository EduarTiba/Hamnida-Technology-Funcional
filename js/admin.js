document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    const servicesList = document.getElementById('services-list');
    const usersList = document.getElementById('users-list');
  
    if (!token) {
      alert('Debes iniciar sesión para acceder a la administración.');
      window.location.href = 'login.html';
      return;
    }
  
    // Obtener los servicios y usuarios desde la API
    const getServices = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/services', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const services = await res.json();
        servicesList.innerHTML = services.map(service => `
          <li>
            ${service.name} - ${service.price}€
            <button onclick="deleteService('${service._id}')">Eliminar</button>
          </li>
        `).join('');
      } catch (error) {
        console.error('Error obteniendo servicios:', error);
      }
    };
  
    const getUsers = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/users', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const users = await res.json();
        usersList.innerHTML = users.map(user => `
          <li>
            ${user.name} - ${user.email}
            <button onclick="deleteUser('${user._id}')">Eliminar</button>
          </li>
        `).join('');
      } catch (error) {
        console.error('Error obteniendo usuarios:', error);
      }
    };
  
    // Eliminar servicio
    const deleteService = async (id) => {
      const res = await fetch(`http://localhost:5000/api/services/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        alert('Servicio eliminado.');
        getServices();  // Refrescar lista de servicios
      } else {
        alert('Error al eliminar el servicio.');
      }
    };
  
    // Eliminar usuario
    const deleteUser = async (id) => {
      const res = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        alert('Usuario eliminado.');
        getUsers();  // Refrescar lista de usuarios
      } else {
        alert('Error al eliminar el usuario.');
      }
    };
  
    // Cargar los servicios y usuarios al cargar la página
    getServices();
    getUsers();
  });
  