import db from '../models/connection';

const dropUsers = `
DROP TABLE IF EXISTS users cascade`;

const dropQuestions = `
DROP TABLE IF EXISTS questions cascade`;

const dropAnswers = `
DROP TABLE IF EXISTS answers cascade`;

const dropComments = `
DROP TABLE IF EXISTS comments cascade`;

db.query(dropComments).then((response) => {
  if (response) {
    // eslint-disable-next-line
    console.log('comments table dropped  successfully');
  } else {
    // eslint-disable-next-line
    console.log('Error dropping comments table');
  }
  db.query(dropAnswers).then((response) => {
    if (response) {
      // eslint-disable-next-line
      console.log('answers table dropped successfully');
    } else {
      // eslint-disable-next-line
      console.log('Error dropping answers table');
    }
    db.query(dropQuestions).then((response) => {
      if (response) {
        // eslint-disable-next-line
        console.log('questions table dropped successfully');
      } else {
        // eslint-disable-next-line
        console.log('Error dropping questions table');
      }
      db.query(dropUsers).then((response) => {
        if (response) {
          // eslint-disable-next-line
          console.log('users table dropped successfully');
        } else {
          // eslint-disable-next-line
          console.log('Error dropping users table');
        }
        db.end();
      });
    });
  });
});
