const answerForm = document.getElementById('answerForm');
const postAnswer = async (e) => {
  e.preventDefault();
  try {
    const answerBody = document.querySelector('.answer-text').value;
    const token = localStorage.getItem('token');
    const answer = document.querySelector('.answerBtn');
    answer.disabled = true;
    answer.innerHTML = 'Posting .....';
    const questionId = window.location.search.split('')[1];
    console.log(questionId);
    const answerUrl = `/api/v1/${questionId}/answer`;
    const header = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    };
    const requestBody = {
      answerBody
    };
    const response = await fetch(answerUrl, {
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
        window.location.href = 'answer.html';
      }, 500);
    }
  } catch (error) {
    // eslint-disable-next-line
    console.log(error.message);
  }
};
window.onload = answerForm.addEventListener('submit', postAnswer);
