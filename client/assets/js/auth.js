function signup(e) {
  console.log('am in');
  e.preventDefault();

  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const result = document.querySelector('.result');
  const resultMessage = document.querySelector('.resultMsg').value;
  const signupBtn = document.getElementById('account');
  signupBtn.disabled = true;
  signupBtn.innerHTML = 'Creating your account...';
  const requestBody = {
    username, email, password
  };
  console.log(requestBody);
  const url = '/api/v1/auth/signup';
  console.log(url);
  const header = {
    'Content-Type': 'application/json',
  };
  fetch(url, {
    method: 'POST',
    headers: header,
    body: JSON.stringify(requestBody)
  }).then((response) => {
    console.log('Got in');
    response.json().then((result) => {
      if (result.status === 'success') {
        const token = result.data;
        localStorage.setItem('token', token);
        window.location.replace('home.html');
      } else {
        resultMessage.innerHTML = result.message;
      }
    });
  });
}

document.getElementById('signup').addEventListener('submit', signup);
