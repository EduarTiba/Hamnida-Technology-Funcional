// frontend/js/navbar.js

document.addEventListener("DOMContentLoaded", () => {
  const loginLink = document.getElementById("login-link");
  const logoutBtn = document.getElementById("logout-btn");
  const userInfo = document.getElementById("user-info");
  const adminLink = document.getElementById("admin-link");
  const nombreUsuario = document.getElementById("nombreUsuario");

  // Validar sesión activa por cookies
  fetch("http://localhost:3000/auth/usuario", {
    method: "GET",
    credentials: "include"
  })
    .then(res => {
      if (!res.ok) throw new Error("No autenticado");
      return res.json();
    })
    .then(data => {
      loginLink.style.display = "none";
      logoutBtn.style.display = "inline";
      userInfo.style.display = "inline";

      if (nombreUsuario) {
        nombreUsuario.textContent = data.usuario.nombre;
      } else {
        userInfo.textContent = data.usuario.nombre;
      }

      if (data.usuario.rol === "admin") {
        adminLink.style.display = "inline";
      }
    })
    .catch(() => {
      console.warn("Sesión no válida o expirada");
    });

  // Cerrar sesión
  logoutBtn.addEventListener("click", async () => {
    try {
      await fetch("http://localhost:3000/auth/logout", {
        method: "POST",
        credentials: "include"
      });
      window.location.href = "index.html";
    } catch (err) {
      console.error("Error al cerrar sesión", err);
    }
  });
});
