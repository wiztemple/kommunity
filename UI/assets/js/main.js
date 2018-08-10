function App() {
    const modal = document.getElementById('modal');
    const modalBtn = document.getElementById('modalBtn');
    const closeBtn = document.querySelector('.closeBtn');
    const cardBtn = document.getElementById('cardBtn');
    const commentBtn = document.getElementById('commentTag');
    const bar = document.querySelector('.navbar__nav-toggle');
   
    this.openModal = () => modal.style.display = 'block';
    this.closeModal = () => modal.style.display = 'none';
    this.clickOutside = (e) => {
       if (e.target === modal) {
           modal.style.display = 'none';
       }
    }
    this.dropAnswerBox = () => {
       const answerBox = document.getElementById('answer-box');
       if (answerBox.style.display !== 'block') {
           answerBox.style.display = 'block';
       } else {
           answerBox.style.display = 'none';
       }
    }
    this.dropCommentBox = () => {
        const answerBox = document.getElementById('comment-box');
        if (answerBox.style.display !== 'block') {
            answerBox.style.display = 'block';
        } else {
            answerBox.style.display = 'none';
        }
     }
    this.toggle = () => {
        const navs = document.querySelector('.nav__items');
        navs.forEach(nav => {
            nav.classList.add('navbar__toggleShow');
        });
    }
    cardBtn.addEventListener('click', this.dropAnswerBox);
    commentBtn.addEventListener('click', this.dropCommentBox);
    modalBtn.addEventListener('click', this.openModal);
    closeBtn.addEventListener('click', this.closeModal);
    window.addEventListener('click', this.clickOutside);
    bar.addEventListener('click', this.toggle);
}
const appInst = new App();
appInst();