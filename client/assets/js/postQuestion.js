
const form = document.getElementById('postQst');
const postQuestion = async (e) => {
  e.preventDefault();
  try {
    const title = document.getElementById('title').value;
    const questionBody = document.getElementById('questionBody').value;
    const tag = document.getElementById('tag').value;
    const token = localStorage.getItem('token');
    const ask = document.getElementById('askBtn');
    ask.disabled = true;
    ask.innerHTML = 'Asking .....';
    const url = '/api/v1/question';
    const header = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    };
    const requestBody = {
      title, questionBody, tag
    };
    const response = await fetch(url, {
      method: 'POST',
      headers: header,
      body: JSON.stringify(requestBody)
    });
    const result = await response.json();
    if (result.status === 'success') {
      window.location.reload(true);
    } else {
      // eslint-disable-next-line
          alert(result.message);
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 500);
    }
  } catch (error) {
    // eslint-disable-next-line
      console.log(error.message);
  }
};
form.addEventListener('submit', postQuestion);
