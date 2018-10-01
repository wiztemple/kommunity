const cardBtn = document.querySelector('.cardBtn');

function dropAnswer() {
  const answerBox = document.querySelector('.answer-box');
  if (answerBox.style.display !== 'block') {
    answerBox.style.display = 'block';
  } else {
    answerBox.style.display = 'none';
  }
}
if (cardBtn) {
  cardBtn.addEventListener('click', dropAnswer, false);
}
