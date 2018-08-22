const cardBtn = document.getElementById('cardBtn');
const commentTag = document.getElementById('commentTag');

function dropAnswerBox() {
  const answerBox = document.getElementById('answerBox');
  if (answerBox.style.display !== 'block') {
    answerBox.style.display = 'block';
    // console.log(answerBox);
  } else {
    answerBox.style.display = 'none';
  }
}
function dropCommentBox() {
  const commentBox = document.getElementById('commentBox');
  if (commentBox.style.display !== 'block') {
    commentBox.style.display = 'block';
  } else {
    commentBox.style.display = 'none';
  }
}
cardBtn.addEventListener('click', dropAnswerBox);
commentTag.addEventListener('click', dropCommentBox);
