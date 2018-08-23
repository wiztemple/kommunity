
import db from '../models/connection';

const createUserTable = `
CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP Default Now(),
    updated_at TIMESTAMP Default Now()
    
)`;

const createQuestionTable = `
CREATE TABLE IF NOT EXISTS questions(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) UNIQUE NOT NULL,
    question_body TEXT NOT NULL,
    tag VARCHAR(50) DEFAULT NULL,
    created_at TIMESTAMP Default Now(),
    updated_at TIMESTAMP Default Now(),
    user_id int, 
    CONSTRAINT FK_UserQuestions FOREIGN KEY (user_id) REFERENCES users(id)
)`;

const createAnswerTable = `
CREATE TABLE IF NOT EXISTS answers(
  id SERIAL PRIMARY KEY,
  answer_body TEXT,
  is_preferred BOOLEAN DEFAULT false,
  question_id int,
  CONSTRAINT FK_QuestionAnswers FOREIGN KEY (question_id) REFERENCES questions(id),
  created_at TIMESTAMP Default Now(),
  updated_at TIMESTAMP Default Now(),
  user_id int, 
  CONSTRAINT FK_UserAnswers FOREIGN KEY (user_id) REFERENCES users(id)
  
)`;

const createCommentTable = `
CREATE TABLE IF NOT EXISTS comments(
  id SERIAL PRIMARY KEY,
  body TEXT NOT NULL,
  answer_id int,
  CONSTRAINT FK_AnswerComments FOREIGN KEY (answer_id) REFERENCES answers(id),
  created_at TIMESTAMP Default Now(),
  updated_at TIMESTAMP Default Now(),
  user_id int, 
  CONSTRAINT FK_UserComments FOREIGN KEY (user_id) REFERENCES users(id)
  
)`;

db.query(createUserTable).then((response) => {
  if (response) {
    // eslint-disable-next-line
    console.log('User table created successfully');
  } else {
    // eslint-disable-next-line
    console.log('Error while creating users table');
  }
  db.query(createQuestionTable).then((response) => {
    if (response) {
      // eslint-disable-next-line
      console.log('Questions table created successfully');
    } else {
      // eslint-disable-next-line
      console.log('Error while creating Questions table');
    }
    db.query(createAnswerTable).then((response) => {
      if (response) {
        // eslint-disable-next-line
        console.log('Answers table created successfully');
      } else {
        // eslint-disable-next-line
        console.log('Error while creating Answers table');
      }
      db.query(createCommentTable).then((response) => {
        if (response) {
        // eslint-disable-next-line
          console.log('Comments table created successfully');
        } else {
          // eslint-disable-next-line
          console.log('Error while creating Comments table');
        }
      });
    });
  });
});
