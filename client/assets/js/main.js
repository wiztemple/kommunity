const bar = document.querySelector('.navbar__nav-toggle');


function navToggle() {
  const navs = document.querySelector('.nav__items');
  navs.forEach(nav => nav.classList.toggle('navbar__toggleShow'));
}
bar.addEventListener('click', navToggle);

