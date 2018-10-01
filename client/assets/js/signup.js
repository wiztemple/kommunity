const signup = document.getElementById('signup');

async function createAccount(e) {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const msg = document.querySelector('.msg');
  const signupBtn = document.getElementById('signupBtn');
  signupBtn.disabled = true;
  signupBtn.innerHTML = 'Creating your account...';

  const requestBody = { username, email, password };
  const url = '/api/v1/auth/signup';

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
      const user = result.data.username;
      localStorage.setItem('token', Usertoken);
      localStorage.setItem('username', user);
      msg.style.display = 'block';
      msg.style.color = '#fff';
      msg.style.backgroundColor = '#8fefaf';
      msg.innerHTML = result.message;
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1000);
    } else {
      msg.style.display = 'block';
      msg.style.backgroundColor = '#f99aa9';
      msg.innerHTML = result.message;
      setTimeout(() => {
        window.location.href = 'signup.html';
      }, 1000);
    }
  } catch (error) {
    // eslint-disable-next-line
    console.log(error);
  }
}
signup.addEventListener('submit', createAccount);
