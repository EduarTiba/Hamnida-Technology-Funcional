// navbar.js 
document.addEventListener('DOMContentLoaded', () => {
    const nombreUsuario = localStorage.getItem('username');
    const loginLink = document.getElementById('login-link');
    const logoutBtn = document.getElementById('logout-btn');
    const userInfo = document.getElementById('user-info');
  
    if (nombreUsuario) {
      userInfo.textContent = `Hola, ${nombreUsuario}`;
      userInfo.style.display = 'inline-block';
      loginLink.style.display = 'none';
      logoutBtn.style.display = 'inline-block';
    }
  
    logoutBtn?.addEventListener('click', () => {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('userRole');
      window.location.href = 'login.html';
    });
  });
  