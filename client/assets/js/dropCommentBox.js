document.getElementById('commentTag').addEventListener('click', () => {
  const commentBox = document.getElementById('commentBox');
  if (commentBox.style.display !== 'block') {
    commentBox.style.display = 'block';
  } else {
    commentBox.style.display = 'none';
  }
});
