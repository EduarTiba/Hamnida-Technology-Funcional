document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  const loginLink = document.getElementById("login-link");
  const logoutBtn = document.getElementById("logout-btn");
  const userInfo = document.getElementById("user-info");
  const adminLink = document.getElementById("admin-link");

  if (token) {
    fetch("https://hamnida-tech.onrender.com/api/usuarios/perfil", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        userInfo.style.display = "inline";
        userInfo.textContent = data.email;
        loginLink.style.display = "none";
        logoutBtn.style.display = "inline";

        // Mostrar el enlace admin si el usuario tiene rol "admin"
        if (data.role === "admin") {
          adminLink.style.display = "inline";
        }
      })
      .catch(() => {
        console.warn("Error al validar token");
        localStorage.removeItem("token");
      });
  }

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "index.html";
  });

// frontend/js/navbar.js
(async () => {
  try {
    const res = await fetch('http://localhost:3000/auth/usuario', {
      method: 'GET',
      credentials: 'include'
    });

    if (!res.ok) throw new Error('No autenticado');

    const data = await res.json();
    document.getElementById('nombreUsuario').textContent = data.usuario.nombre;
  } catch (err) {
    console.error('Error al validar sesión:', err);
    // Opcional: redirigir a login si no autenticado
    // window.location.href = '/login.html';
  }
})();

  
});
