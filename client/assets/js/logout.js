const log = document.querySelector('.logoutBtn');
const logout = () => {
  localStorage.removeItem('token');
  window.location.replace('index.html');
};
log.addEventListener('click', logout);
