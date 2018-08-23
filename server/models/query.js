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
WHERE user_id = '${userId}
`);
export const fetchAQuestion = questionId => (`
SELECT * FROM questions
WHERE questions.id = ${questionId}
`);
export const removeQuestion = (questionId, userId) => (`
DELETE FROM questions 
WHERE questions.id = ${questionId} AND questions.user_id = ${userId}`);

export const postAnswer = (answerBody, userId, questionId) => (`
INSERT INTO answers 
(answer_body, user_id, question_id) 
VALUES 
('${answerBody}', ${userId}, ${questionId}) RETURNING *`);
