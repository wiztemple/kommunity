function App() {
    const modal = document.getElementById('modal');
    const modalBtn = document.getElementById('modalBtn');
    const closeBtn = document.querySelector('.closeBtn');
    const cardBtn = document.querySelector('.card-btn');
    const bar = document.querySelector('.navbar__nav-toggle');

    this.openModal = () => modal.style.display = 'block';
    this.closeModal = () => modal.style.display = 'none';
    this.clickOutside = (e) => {
       if (e.target === modal) {
           modal.style.display = 'none';
       }
    }
    this.dropDown = () => {
       const answerBox = document.querySelector('.answer-box');
       if (answerBox.style.display === 'none') {
           answerBox.style.display = 'block';
       } else {
           answerBox.style.display = 'none';
       }
    }
    this.toggle = () => {
        const navs = document.querySelector('.nav__items');
        navs.forEach(nav => {
            nav.classList.add('navbar__toggleShow');
        })
    }
    cardBtn.addEventListener('click', this.dropDown);
    modalBtn.addEventListener('click', this.openModal);
    closeBtn.addEventListener('click', this.closeModal);
    bar.addEventListener('click', this.toggle);
    window.addEventListener('click', this.clickOutside);
}
const appInst = new App();
appInst();