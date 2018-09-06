const signup = document.getElementById('signup');

function createAccount(e) {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const msg = document.querySelector('.msg');
  const signBtn = document.getElementById('signBtn');
  const loginBtn = document.getElementById('loginBtn');
  const signupBtn = document.getElementById('signupBtn');
  signupBtn.disabled = true;
  signupBtn.innerHTML = 'Creating your account...';

  const requestBody = { username, email, password };
  const url = '/api/v1/auth/signup';

  const header = {
    'Content-Type': 'application/json'
  };

  fetch(url, {
    method: 'POST',
    headers: header,
    body: JSON.stringify(requestBody),
  }).then((response) => {
    response.json().then((result) => {
      if (result.status === 'success') {
        const token = result.data;
        localStorage.setItem('token', token);
        msg.style.display = 'block';
        msg.style.color = '#fff';
        msg.style.backgroundColor = '#0b7a03';
        msg.innerHTML = result.msg;
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
signup.addEventListener('submit', createAccount);
