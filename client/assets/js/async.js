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
      const Usertoken = result.token;
      const Useremail = result.email;
      localStorage.setItem('token', Usertoken);
      localStorage.setItem('email', Useremail);
      setTimeout(() => {
        window.location.href = 'index.html';
        signBtn.style.display = 'none';
        loginBtn.style.display = 'none';
      }, 1000);
    } else {
      msg.style.display = 'block';
      msg.style.backgroundColor = '#db1313';
      msg.style.color = '#fff';
      msg.innerHTML = result.msg;
    }
  } catch (error) {
    console.log(error);
  }
}
signin.addEventListener('submit', login);
const signin = document.getElementById('signin');

function login(e) {
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

  fetch(url, {
    method: 'POST',
    headers: header,
    body: JSON.stringify(requestBody),
  }).then((response) => {
    response.json()
      .then((result) => {
        if (result.status === 'success') {
          const Usertoken = result.token;
          const Useremail = result.email;
          localStorage.setItem('token', Usertoken);
          localStorage.setItem('email', Useremail);
          setTimeout(() => {
            window.location.href = 'index.html';
            signBtn.style.display = 'none';
            loginBtn.style.display = 'none';
          }, 1000);
        } else {
          msg.style.display = 'block';
          msg.style.backgroundColor = '#db1313';
          msg.style.color = '#fff';
          msg.innerHTML = result.msg;
        }
      });
  });
}
signin.addEventListener('submit', login);
const signin = document.getElementById('signin');
