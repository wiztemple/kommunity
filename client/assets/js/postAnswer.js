const answerForm = document.getElementById('answerForm');
async function postAnswer() {
  try {
    const answerBody = document.getElementById('answerBody').value;
    const token = localStorage.getItem('token');
    // const answer = document.getElementById('answerBtn');
    // answer.disabled = true;
    // answer.innerHTML = 'Posting .....';
    const questionId = window.location.search.split('')[1];
    console.log(location.search);
    console.log(questionId);
    const answerUrl = `/api/v1/question/${questionId}/answer`;
    const header = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    };
    const requestBody = {
      answerBody,
    };
    const response = await fetch(answerUrl, {
      method: 'POST',
      headers: header,
      body: JSON.stringify(requestBody)
    });
    const result = await response.json();
    console.log(result.status);
    if (result.status === 'success') {
      console.log(result.status);
      window.location.reload(true);
    } else {
      // eslint-disable-next-line
    console.log(result.status);
      setTimeout(() => {
        // window.location.href = 'answer.html';
      }, 500);
    }
  } catch (error) {
    // eslint-disable-next-line
    console.log(error.message);
  }
}
// answerForm.addEventListener('submit', postAnswer);
