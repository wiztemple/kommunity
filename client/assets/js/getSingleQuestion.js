const getSingleQuestion = async () => {
  const questionId = window.location.search.split('')[1];
  console.log(questionId);
  const questionUrl = `/api/v1/question/${questionId}`;
  try {
    const response = await fetch(questionUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json, text/plain',
      }
    });
    const result = await response.json();
    console.log(result);
    if (result.status === 'success') {
      const questionCard = document.getElementById('questionCard');
      const answerCard = document.getElementById('answerCard');
      const singleQuestion = result.data.question[0];
      const allAnswers = result.data.answers;
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
                    <div class="card-btn"><span>3</span> <i class="fa fa-eye"></i>
                    </div>
                </div>
                <div class="card-answer ml-2">
                    <div class="card-btn cardBtn" id="cardBtn" title="Click to answer"><span>0 Answers</span> <i class="fa fa-pencil"></i>
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
                        <form class="answerForm" id="answerBody">
                          <textarea class="box" placeholder="Answer"></textarea>
                        </form>
                        <button class="button ripple answerBtn" type="submit">Post</button>
                    </div>
                </div>
            </div> 
        </div>`;
      allAnswers.forEach((answer) => {
        answerCard.innerHTML += `
            <div class="mt-1 answer-block py-1">
                <div class="answer-bg">
                    <div class="justify-content-start">
                        <div class="card-user">
                            <img class="avatar" src="./assets/images/girl.png">
                        </div>
                        <div class="card-user__job flex">
                            <span class="pl-2">Lorem ipsum dolor sit amet.</span>
                            <span> 
                                <small class="text-grey">Answered 1 minute ago</small>
                            </span>
                        </div>
                    </div>
                    <div class="answer-text">
                        <p>${answer.answer_body}</p>
                    </div>
                    <div class="justify-content-start">
                        <div class="card-upvote">
                            <div class="card-reaction-icons" title="click to like"> <i class="fa fa-thumbs-up"></i> Like
                            </div>
                        </div>
                        <div class="card-downvote pl-1">
                            <div class="card-reaction-icons"><i class="fa fa-thumbs-down"></i> Dislike
                            </div>
                        </div>
                        <div class="card-views pl-1">
                            <div class="card-reaction-icons" id="commentTag" title="click to add your comment"><i class="fa fa-comments-o"></i> Comment
                            </div> 
                        </div> 
                    </div>
                </div>
            <div>
                <div class="comment-box" id="commentBox">
                    <div class="justify-content-start">
                        <div>
                            <img src="./assets/images/girl.png" class="avatar">
                        </div>
                        <div class="ml-1 answer-input">
                            <textarea class="box" placeholder="post comment"></textarea>
                            <button class="btn btn-blue ripple" type="button">Post</button>
                        </div>
                    </div>
                </div><!--end answer-box -->
                <div class="comment-content">
                    <div class="justify-content-start">
                        <span><img class="avatar-sm" src="./assets/images/boy.png"></span>
                        <span class="commenter_name">Sullivan</span>
                    </div>
                    <span>This comment belongs to this answer but its just a dummy text</span>
                </div>
            </div>
        </div>  
          `;
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};
window.onload = getSingleQuestion;
