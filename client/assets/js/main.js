const app = {};

app.getItem = itemName => localStorage.getItem(itemName);

app.navToggle = () => {
  const bar = document.querySelector('.navbar__nav-toggle');
  bar.addEventListener('click', () => {
    const navs = document.querySelector('.nav__items');
    navs.forEach(nav => nav.classList.toggle('navbar__toggleShow'));
  });
};

app.toggleAuthButtons = () => {
  const toggleAuthButtons = document.querySelector('.js__AuthButton');
  if (app.getItem('currentUser')) {
    toggleAuthButtons.innerHTML = `<div class="navbar__nav pr-0 p__8">
  <a href="signin.html">
      <button type="button" class="btn btn-colorless" id="loginBtn">Logout <i class="fa fa-chevron-circle-right"></i></button>
  </a>
</div>`;
    return toggleAuthButtons;
  }
  toggleAuthButtons.innerHTML = `<div class="navbar__nav pr-0 p__8">
    <a href="signup.html">
        <button type="button" class="btn btn-colorless" id="signBtn">Sign Up <i class="fa fa-dashcube"></i></button>
    </a>
</div>
<div class="navbar__nav pr-0 p__8">
    <a href="signin.html">
        <button type="button" class="btn btn-colorless" id="loginBtn">Login <i class="fa fa-chevron-circle-right"></i></button>
    </a>
</div>
`;
  return toggleAuthButtons;
};

app.openModal = () => {
  const modal = document.querySelector('.modal');
  const modalBtn = document.getElementById('modalBtn');
  modalBtn.addEventListener('click', () => {
    modal.style.display = 'block';
  });
};
app.closeModal = () => {
  const modal = document.querySelector('.modal');
  const closeBtn = document.querySelector('.closeBtn');
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });
};
app.getFormData = (form) => {
  const inputs = form.getElementsByTagName('input');
  const formData = {};
  for (let i = 0; i < inputs.length; i += 1) {
    formData[inputs[i].name] = inputs[i].value;
  }
  return formData;
};
/**
 * @method signup creates user account
 * @description This handles user's account creation
 * @returns user details and token information temporarily stored in the browser
 */
app.signup = () => {
  const form = document.getElementsByTagName('form')[0];
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const msg = document.querySelector('.msg');
    const signBtn = document.getElementById('signBtn');
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    signupBtn.disabled = true;
    signupBtn.innerHTML = 'Creating your account...';
    const url = '/api/v1/auth/signup';
    const header = {
      'Content-Type': 'application/json',
    };
    const formData = JSON.stringify(app.getFormData(form));
    const response = await fetch(url, {
      method: 'POST',
      headers: header,
      body: formData
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
        signBtn.style.display = 'none';
        loginBtn.style.display = 'none';
      }, 1000);
    } else {
      msg.style.display = 'block';
      msg.style.backgroundColor = '#f99aa9';
      msg.innerHTML = result.message;
      setTimeout(() => {
        window.location.href = 'signup.html';
      }, 2000);
    }
  });
};
/**
 * @method signin logs a user in
 * @description This handles user login
 * @returns user details and token information temporarily stored in the browser
 */
app.signin = () => {
  const form = document.getElementsByTagName('form')[0];
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const msg = document.querySelector('.msg');
    const loginButton = document.getElementById('login');
    loginButton.disabled = true;
    loginButton.innerHTML = 'Signing you in...';
    const url = '/api/v1/auth/login';
    const header = {
      'Content-Type': 'application/json',
    };
    const formData = JSON.stringify(app.getFormData(form));
    const response = await fetch(url, {
      method: 'POST',
      headers: header,
      body: formData
    });
    const result = await response.json();
    if (result.status === 'success') {
      const Usertoken = result.data.token;
      const { id } = result.data;
      console.log(id);
      localStorage.setItem('token', Usertoken);
      localStorage.setItem('currentUser', id);
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
        window.location.href = 'signin.html';
      }, 1000);
    }
  });
};

app.getAll = async () => {
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
              <a href="answer.html?${question.id}" class="card-description__link">
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
    // eslint-disable-next-line
    console.log('no question found');
  }
};

app.postQuestion = async () => {
  const form = document.getElementsByTagName('form')[0];
  try {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
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
    });
  } catch (error) {
    // eslint-disable-next-line
    console.log(error.message);
  }
};

app.userProfile = async () => {
  const url = '/api/v1/auth/users/profile';
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    if (result.status === 'success') {
      const cardProfile = document.getElementById('cardProfile');
      const userDetails = result.user;
      cardProfile.innerHTML = `
          <div class="profile-card p-1">
              <div class="profile-card__image">
                  <img src="./assets/images/boy.png" class="img-circle">
              </div>
              <div class="profile-card__user">
                  <h2 class="text-center" id="username">${userDetails.username}</h2>
              </div>
              <div class="profile-card__user-details">
                  <span id="email">${userDetails.email}</span>
              </div>
              <div class="profile-card__user-details">
                  <span>Number of Question asked:</span> <span>100</span>
              </div>
              <div class="profile-card__user-details">
                  <span>Number of Question answered:</span> <span>130</span>
              </div>
              <div class="profile-card__user-details">
                  <span>Questions asked with most answers:</span> <span>10</span>
              </div> 
          </div>
      `;
    }
  } catch (error) {
    // eslint-disable-next-line
    console.log(error.message);
  }
};

app.getSingleQuestion = async () => {
  const questionId = window.location.search.split('')[1];
  const questionUrl = `/api/v1/question/${questionId}`;
  try {
    const response = await fetch(questionUrl, {
      method: 'GET',
    });
    const result = await response.json();
    console.log(result);
    if (result.status === 'success') {
      const questionCard = document.getElementById('singleCard');
      const singleQuestion = result.data.question[0];
      console.log(singleQuestion);
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
  } catch (error) {
    console.log(error.message);
  }
};

app.dropAnswerBox = () => {
  const cardBtn = document.getElementById('cardBtn');
  cardBtn.addEventListener('click', () => {
    const answerBox = document.getElementById('answerBox');
    if (answerBox.style.display !== 'block') {
      answerBox.style.display = 'block';
    // console.log(answerBox);
    } else {
      answerBox.style.display = 'none';
    }
  });
};

app.dropCommentBox = () => {
  const commentTag = document.getElementById('commentTag');
  commentTag.addEventListener('click', () => {
    const commentBox = document.getElementById('commentBox');
    if (commentBox.style.display !== 'block') {
      commentBox.style.display = 'block';
    } else {
      commentBox.style.display = 'none';
    }
  });
};
app.logout = () => {
  const log = document.querySelector('.logoutBtn');
  log.addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.replace('index.html');
  });
};
