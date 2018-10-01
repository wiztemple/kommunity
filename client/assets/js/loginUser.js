const token = localStorage.getItem('token');
console.log(token);
const toggleAuthButtons = () => {
  const toggleAuth = document.querySelector('.js__AuthButton');
  if (token) {
    toggleAuth.innerHTML = `<div class="navbar__nav pr-0 p__8">
    <a href="signin.html">
        <button type="button" class="btn btn-colorless" id="loginBtn">Logout <i class="fa fa-chevron-circle-right"></i></button>
    </a>
  </div>`;
    return toggleAuth;
  }
  toggleAuth.innerHTML = `<div class="navbar__nav pr-0 p__8">
      <a href="signup.html">
          <button type="button" class="btn btn-colorless" id="signBtn">Sign Up <i class="fa fa-dashcube"></i></button>
      </a>
  </div>
  <div class="navbar__nav pr-0 p__8">
      <a href="signin.html">
          <button type="button" class="btn btn-colorless" id="loginBtn">Login <i class="fa fa-chevron-circle-right"></i></button>
      </a>
  </div>
  `;
  return toggleAuth;
};
window.onload = toggleAuthButtons;
