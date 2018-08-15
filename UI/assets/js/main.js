// function App() {
const modal = document.getElementById('modal');
const modalBtn = document.getElementById('modalBtn');
const closeBtn = document.querySelector('.closeBtn');
const bar = document.querySelector('.navbar__nav-toggle');
const cardBtn = document.getElementById('cardBtn');
const commentTag = document.getElementById('commentTag');

eventListener();

function eventListener() {
  modalBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);
  bar.addEventListener('click', navToggle);
  cardBtn.addEventListener('click', dropAnswerBox);
  commentTag.addEventListener('click', dropCommentBox);
}

function openModal() {
    modal.style.display = 'block';
}
function closeModal() {
    modal.style.display = 'none';
}
function navToggle() {
    const navs = document.querySelector('.nav__items');
    navs.forEach(nav => nav.classList.add('navbar__toggleShow')); 
    console.log(navs);
}
function dropAnswerBox() {
    const answerBox = document.getElementById('answerBox');
    if (answerBox.style.display !== 'block') {
        answerBox.style.display = 'block';
    }
    answerBox.style.display = 'none';
    
}
function dropCommentBox() {
    const commentBox = document.getElementById('commentBox');
    if (commentBox.style.display !== 'block') {
        commentBox.style.display = 'block';
    }
    commentBox.style.display = 'none';
}


