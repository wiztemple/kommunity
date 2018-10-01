document.getElementById('logoutBtn').addEventListener('click', () => {
  alert(document.getElementById('logoutBtn'));
  localStorage.removeItem('token');
  window.location.replace('/client/index.html');
});
