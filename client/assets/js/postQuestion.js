const questionForm = document.getElementById('postQuestion');

async function postQuestion(e) {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const questionBody = document.getElementById('questionBody').value;
  const tag = document.getElementById('tag').value;
  const token = localStorage.getItem('token');
  console.log(token);
  const ask = document.getElementById('askBtn');
  ask.disabled = true;
  ask.innerHTML = 'Asking ...............';
  const url = '/api/v1/question';
  try {
    const requestBody = {
      title, questionBody, tag
    };

    const header = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    };
    const response = await fetch(url, {
      method: 'POST',
      headers: header,
      body: JSON.stringify(requestBody),
    });
    const result = await response.json();
    console.log(result);
    if (result.status === 'success') {
      window.location.reload(true);
    } else {
      alert(result.message);
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 500);
    }
  } catch (error) {
    console.log(error);
  }
}
questionForm.addEventListener('submit', postQuestion);
