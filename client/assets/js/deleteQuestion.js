const deleteBtn = document.querySelector('.deleteBtn');

const deleteQuestion = async () => {
  try {
    const questionId = window.location.search.split('')[1];
    // eslint-disable-next-line
    console.log(questionId);
    const url = `/api/v1/question/${questionId}`;
    const token = localStorage.getItem('token');
    console.log(token);
    // eslint-disable-next-line
    const verify = confirm('Are you sure you want to delete this question');
    if (verify) {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      const result = await response.json();
      if (result.status === 'success') {
        // eslint-disable-next-line
        alert('question successfully deleted');
        window.location.reload(true);
      } else {
        // eslint-disable-next-line
        alert('Internal server error');
      }
    }
  } catch (error) {
    // eslint-disable-next-line
    alert(error.message);
  }
};
deleteBtn.addEventListener('click', deleteQuestion);
