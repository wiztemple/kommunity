document.onreadystatechange = async function getAll() {
  if (document.readyState === 'complete') {
    const url = '/api/v1/question';
    const response = await fetch(url, {
      method: 'GET',
    });
    const result = await response.json();
    if (result.status === 'success') {
      const questionsCard = document.getElementById('questionCard');
      const allQuestions = result.questions;
      allQuestions.forEach((question) => {
        const [yearCreated, monthCreated, dayCreated] = question.created_at.split('-');
        questionsCard.innerHTML += `
        <div class="card p-1">
            <div class="card-question">
                <a href="answer.html?${question.id}">${question.title}</a>
                <div class="card-hide">
                    <i class="fa fa-ellipsis-h"></i>
                    <div class="card-drop">
                    <a class=""><i class="fa fa-pencil"></i> Edit Question</a>
                    <a class=""><i class="fa fa-times"></i> Delete Question</a>
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
                    <span class="pl-2">${question.user}</span>
                    <span> 
                        <small class="text-grey">1 minute ago</small>
                        <small class="text-grey">${dayCreated.slice(0, 2)}-${monthCreated.slice(0, 2)}-${yearCreated.slice(0, 4)}</small>
                    </span>
                </div>
            </div>
            <div class="card-description">
                <p>${question.question_body}
                <a href="answer.html?${question.id}" class="card-description__link">Read more <i class="fa fa-angle-double-right"></i></a>
                </p>
            </div>
            <div class="card-reaction justify-content-space-between">
                <div class="card-views">
                    <div class="card-btn"><span>63</span> <i class="fa fa-eye"></i>
                    </div>
                </div>
                <div class="card-answer ml-2">
                    <div class="card-btn"><span>0 Answers</span> <i class="fa fa-pencil"></i>
                    </div>
                </div>
                <div class="card-tag ml-2">
                    <div class="card-btn"><span>${question.tag}</span>
                    </div>
                </div>
            </div>
    </div>
          `;
      });
    } else {
      console.log('no question found');
    }
  }
};
