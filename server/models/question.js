const questions = [
  {
    id: 1,
    userId: 1,
    topic: 'HTML',
    questionBody: 'what does the span tag do ?',
    created_at: Date.now(),
    answer: {
      userId: 1,
      answerBody: 'lets all join hands together',
    },
  },
  {
    id: 2,
    userId: 1,
    topic: 'JavaScript',
    questionBody: 'what is a closure in js?',
    created_at: Date.now(),
  },
  {
    id: 3,
    userId: 1,
    topic: 'JavaScript',
    questionBody: 'const and let, why should I neglect var?',
    created_at: Date.now(),
  },
  {
    id: 4,
    userId: 2,
    topic: 'Python',
    questionBody: 'OOP in Python and Java? which is more easier?',
    created_at: Date.now(),
  },
  {
    id: 5,
    userId: 4,
    topic: 'Haskell',
    question: 'What is the best use of haskell',
  },
  {
    id: 6,
    userId: 6,
    topic: 'CSS',
    questionBody: 'what ?',
    created_at: Date.now(),
  },
];
export default questions;
