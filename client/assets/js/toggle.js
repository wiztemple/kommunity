document.querySelector('.navbar__nav-toggle').addEventListener('click', () => {
  const navs = document.querySelector('.nav__items');
  const navArray = Array.from(navs).join('');
  navArray.forEach(nav => nav.classList.toggle('navbar__toggleShow'));
});
