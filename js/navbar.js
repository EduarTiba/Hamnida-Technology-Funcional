const role = localStorage.getItem('userRole');
if (role === 'admin') {
  const adminLink = document.createElement('a');
  adminLink.href = 'admin.html';
  adminLink.textContent = 'Panel Admin';
  document.querySelector('nav').appendChild(adminLink);
}
