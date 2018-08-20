const bar = document.querySelector('.navbar__nav-toggle');

function navToggle() {
  const navs = document.querySelectorAll('.nav__items');
  navs.forEach(nav => nav.classList.toggle('navbar__toggleShow'));
//   console.log(navs);
}
bar.addEventListener('click', navToggle);
