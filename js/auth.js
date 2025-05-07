const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const apiBase = isLocalhost
  ? 'http://localhost:5000/api/users'
  : 'https://hamnida-tech.onrender.com/api/users';

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');

  const soloLetras = /^[a-zA-ZÀ-ÿ\s]{3,}$/;
  const correoValido = /^[^\s@]+@[^\s@]+\.[a-z]{2,4}$/i;

  // LOGIN
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('email');
      const password = document.getElementById('password');
      const loginMsg = document.getElementById('login-message');

      if (!correoValido.test(email.value.trim()) || password.value.trim() === '') {
        loginMsg.textContent = 'Datos inválidos.';
        return;
      }

      try {
        const res = await fetch(`${apiBase}/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: email.value,
            password: password.value
          })
        });

        const data = await res.json();

        console.log('Respuesta del servidor:', data);

        if (res.ok && data.token) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('username', data.user.name);
          localStorage.setItem('userRole', data.user.role);
          window.location.href = 'index.html';
        } else {
          loginMsg.textContent = data.msg || 'Error al iniciar sesión';
        }
      } catch (error) {
        loginMsg.textContent = 'Error de conexión al servidor.';
        console.error(error);
      }
    });
  }

  // REGISTRO
  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const password = document.getElementById('password');
      const registerMsg = document.getElementById('register-message');

      if (!soloLetras.test(name.value.trim()) || !correoValido.test(email.value.trim()) || password.value.length < 6) {
        registerMsg.textContent = 'Datos inválidos o incompletos.';
        return;
      }

      try {
        const res = await fetch(`${apiBase}/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: name.value,
            email: email.value,
            password: password.value,
          })
        });

        const data = await res.json();

        if (res.ok) {
          alert('Registro exitoso. Ahora puedes iniciar sesión.');
          window.location.href = 'login.html';
        } else {
          registerMsg.textContent = data.msg || 'Error al registrarte.';
        }
      } catch (error) {
        registerMsg.textContent = 'Error de conexión al servidor.';
        console.error(error);
      }
    });
  }
});
