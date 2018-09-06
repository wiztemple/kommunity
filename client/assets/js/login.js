const signin = document.getElementById('signin');

async function login(e) {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const msg = document.querySelector('.msg');
  const loginButton = document.getElementById('login');
  const signBtn = document.getElementById('signBtn');
  const loginBtn = document.getElementById('loginBtn');
  loginButton.disabled = true;
  loginButton.innerHTML = 'Logging you in...';
  const requestBody = { username, password };
  const url = '/api/v1/auth/login';
  const header = {
    'Content-Type': 'application/json'
  };
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: header,
      body: JSON.stringify(requestBody),
    });
    const result = await response.json();
    if (result.status === 'success') {
      const Usertoken = result.data.token;
      const Useremail = result.data.email;
      localStorage.setItem('token', Usertoken);
      localStorage.setItem('email', Useremail);
      setTimeout(() => {
        window.location.href = 'index.html';
        signBtn.style.display = 'none';
        loginBtn.style.display = 'none';
      }, 1000);
    } else {
      msg.style.display = 'block';
      msg.style.backgroundColor = '#f99aa9';
      msg.innerHTML = result.message;
      setTimeout(() => {
        window.location.href = 'signin.html';
      }, 1500);
    }
  } catch (error) {
    // eslint-disable-next-line
    console.log(error);
  }
}
signin.addEventListener('submit', login);
