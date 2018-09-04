const bar = document.querySelector('.navbar__nav-toggle');
const ellipis = document.querySelector('.card-hide');

function navToggle() {
  const navs = document.querySelector('.nav__items');
  navs.forEach(nav => nav.classList.toggle('navbar__toggleShow'));
}
bar.addEventListener('click', navToggle);

function dropEllips() {
  const cardDrop = document.querySelector('.card-drop');
  if (cardDrop.style.display !== 'block') {
   cardDrop.style.display = 'block';
  } else {
    cardDrop.style.display = 'none';
  }
}
ellipis.addEventListener('click', dropEllips);
