document.addEventListener("DOMContentLoaded", () => {
  const loginLink = document.getElementById("login-link");
  const logoutBtn = document.getElementById("logout-btn");
  const userInfo = document.getElementById("user-info");
  const adminLink = document.getElementById("admin-link");

  fetch("https://hamnida-tech.onrender.com/auth/usuario", {
    method: 'GET',
    credentials: 'include'
  })
    .then((res) => {
      if (!res.ok) throw new Error('No autenticado');
      return res.json();
    })
    .then((data) => {
      userInfo.style.display = "inline";
      userInfo.textContent = data.usuario.nombre;
      loginLink.style.display = "none";
      logoutBtn.style.display = "inline";

      if (data.usuario.role === "admin") {
        adminLink.style.display = "inline";
      }
    })
    .catch((err) => {
      console.warn("Sesión no válida o expirada", err);
    });

  logoutBtn.addEventListener("click", async () => {
    await fetch("https://hamnida-tech.onrender.com/auth/logout", {
      method: "POST",
      credentials: 'include'
    });
    window.location.href = "index.html";
  });
});
