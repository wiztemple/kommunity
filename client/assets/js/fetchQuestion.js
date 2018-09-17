const token = localStorage.getItem('token');
const deleteBtn = document.getElementById('deleteBtn');

async function getQuestion(questionId) {
  const questionUrl = `/api/v1/question/${questionId}`;
  const response = await fetch(questionUrl, {
    method: 'GET',
  });
  const result = await response.json();
  if (result.status === 'success') {
    const questionCard = document.getElementById('singleCard');
    const singleQuestion = result.data.question;
    questionCard.innerHTML = `
        <div class="card p-1">
            <div class="card-question">
                <a href="answer.html?${singleQuestion.id}">${singleQuestion.title}</a>
                <div class="card-hide">
                    <i class="fa fa-ellipsis-h"></i>
                    <div class="card-drop">
                        <a class="" id="editQUestion"><i class="fa fa-pencil"></i> Edit Question</a>
                        <a class="" id="deleteBtn"><i class="fa fa-times"></i> Delete Question</a>
                        <a class=""><i class="fa fa-map-pin"></i> Pin Question</a>
                        <a class=""><i class="fa fa-share"></i> Share Question</a>
                    </div>
                </div>
            </div>
            <div class="justify-content-start">
                <div class="card-user">
                    <img class="avatar" src="./assets/images/alarm-clock.png">
                </div>
                <div class="card-user__job flex">
                    <span class="pl-2">Wiztemple</span>
                    <span> 
                        <small class="text-grey">1 minute ago</small>
                        <small class="text-grey">9-12-2018</small>
                    </span>
                </div>
            </div>
            <div class="card-description">
                <p>${singleQuestion.question_body}</p>
            </div>
            <div class="card-reaction justify-content-space-between">
                <div class="card-views">
                    <div class="card-btn"><span>63</span> <i class="fa fa-eye"></i>
                    </div>
                </div>
                <div class="card-answer ml-2">
                    <div class="card-btn" id="cardBtn" title="Click to answer"><span>0 Answers</span> <i class="fa fa-pencil"></i>
                    </div>
                </div>
                <div class="card-tag ml-2">
                    <div class="card-btn"><span>${singleQuestion.tag}</span></div>
                </div>
            </div>
            <div class="answer-box" id="answerBox">
                <div class="justify-content-start">
                    <div>
                        <img src="./assets/images/girl.png" class="avatar">
                    </div>
                    <div class="ml-1 answer-input">
                        <textarea class="box" placeholder="Answer"></textarea>
                        <button class="button ripple" type="button">Post</button>
                    </div>
                </div>
            </div>
        </div>
    `;
  }
}
async function deleteQuestion(questionId) {
  try {
    const deleteUrl = `/api/v1/question/${questionId}`;
    // eslint-disable-next-line
    const approve = confirm('Are you sure you want to delete this question?');
    if (approve) {
      const response = await fetch(deleteUrl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      });
      const result = response.json();
      if (result.status === 'success') {
        // eslint-disable-next-line
        alert('Question successfully deleted');
        window.location.reload(true);
      }
    }
  } catch (error) {
    // eslint-disable-next-line
    console.log(error.message);
  }
}
deleteBtn.addEventListener('click', deleteQuestion);
