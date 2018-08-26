export const createUserAccount = requestBody => (`
INSERT INTO users
(email, username, password)
 VALUES ('${requestBody.email}',
 '${requestBody.username}',
 '${requestBody.hashedPassword}')
 RETURNING *
`);

export const findUser = username => `SELECT * FROM users WHERE username = '${username}'`;

export const checkUser = (username, email) => `
SELECT * FROM users 
WHERE username = '${username}' or email = '${email}'
`;

export const findById = userId => `SELECT * FROM users WHERE id = ${userId}`;

export const checkTitle = (title, userId) => (`
SELECT title 
FROM questions  
WHERE questions.user_id = ${userId}
AND 
title = '${title}' `);

export const createQuestion = requestBody => (`
INSERT INTO questions 
(user_id, title, question_body, tag)
VALUES
(${requestBody.userId}, '${requestBody.title}', '${requestBody.questionBody}', '${requestBody.tag}')
RETURNING *
`);
export const fetchAllQuestions = () => (`
SELECT * from questions 
`);
export const fetchUserQuestions = userId => (`
SELECT * from questions
WHERE user_id = ${userId} ORDER BY id DESC
`);
export const fetchAQuestion = questionId => (`
SELECT q.title, q.question_body, q.user_id as questionOwner, a.answer_body, a.user_id as answerOwner FROM questions q LEFT OUTER JOIN answers a ON a.question_id = q.id
WHERE q.id = ${questionId}

`);
export const removeQuestion = (questionId, userId) => (`
DELETE FROM questions
WHERE questions.id = ${questionId} AND questions.user_id = ${userId}`);

export const postAnswer = (answerBody, userId, questionId) => (`
INSERT INTO answers 
(answer_body, user_id, question_id) 
VALUES 
('${answerBody}', ${userId}, ${questionId}) RETURNING *`);


export const fetchQuestionByAnswerId = answerId => (
  `SELECT  question_body, 
    q.user_id as question_creator, 
    answer_body, 
    a.user_id as answer_creator 
    FROM questions q 
    INNER JOIN 
    answers a ON q.id = a.question_id 
    WHERE a.id = ${answerId}`);

export const setPreferedAnswer = answerId => (`
  UPDATE answers
  SET is_preferred = 'yes'
  WHERE id = ${answerId}
  RETURNING *
  `);

export const updateAnswer = (body, answerId, userId) => (`
  UPDATE answers
  SET answer_body = '${body}'
  WHERE id = ${answerId} AND 
  user_id = ${userId}
  RETURNING *
  `);
export const checkQuestionId = questionId => (
  `SELECT id FROM questions WHERE questions.id = ${questionId}`
);
export const checkAnswer = answerId => (
  `SELECT id FROM answers WHERE answers.id = ${answerId}`
);
export const checkAnswerId = (questionId, answerId) => (
  `SELECT id FROM answers a WHERE a.question_id = ${questionId} AND
  a.id = ${answerId}
  `
);
export const any = questionId => (
  `SELECT q.title, q.question_body, q.user_id as questionOwner, a.answer_body, a.user_id as answerOwner FROM questions q INNER JOIN answers a ON a.question_id = q.id
  WHERE a.question_id = ${questionId}
  SELECT * FROM questions, answers a WHERE questions.id = ${questionId}
  `);
export const findCount = () => (`
select q.id, q.title, count(a.id) as answerCount 
from
 questions q LEFT OUTER JOIN answers a 
 ON 
 a.question_id = q.id 
 GROUP BY q.id
  ORDER BY 
  count(a.id) DESC 
`);

export const postComment = (commentBody, userId, answerId) => (`
INSERT INTO comments
(body, user_id, answer_id)
VALUES ('${commentBody}', ${userId}, ${answerId}) RETURNING *`);
