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
/**
 * @function createQuestion
 * @description This creates questions
 * @returns {Object} Object
*/
export const createQuestion = requestBody => (`
INSERT INTO questions 
(user_id, title, question_body, tag)
VALUES
(${requestBody.userId}, '${requestBody.title}', '${requestBody.questionBody}', '${requestBody.tag}')
RETURNING *
`);
/**
 * @method fetchAllQuestions
 * @description This returns all questions
 * @returns {Object} Object
*/
export const fetchAllQuestions = () => ('SELECT * from questions');
/**
 * @method fetchUserQuestions
 * @description This fetches all questions belonging to a single user
 * @returns {Object} Object
*/
export const fetchUserQuestions = userId => (`
SELECT * from questions
WHERE user_id = ${userId} ORDER BY id DESC
`);
/**
 * @method fetchAQuestion
 * @description This gets a question by id
 * @returns {Object} Object
*/
export const fetchAQuestion = questionId => (`
SELECT q.title, q.question_body, q.user_id as questionOwner, a.answer_body, a.user_id as answerOwner FROM questions q LEFT OUTER JOIN answers a ON a.question_id = q.id
WHERE q.id = ${questionId}`);

/**
 * @method findQuestion
 * @description This gets a question by id
 * @returns {Object} Object
*/
export const findQuestion = questionId => (` SELECT * FROM questions WHERE id = ${questionId}`);
/**
 * @function removeQuestion
 * @description This deletes a question
 * @returns {Object} Object
*/
export const removeQuestion = (questionId, userId) => (`
DELETE FROM questions
WHERE questions.id = ${questionId} AND questions.user_id = ${userId}`);
/**
 * @function postAnswer
 * @description This posts a question
 * @returns {Object} Object
*/
export const postAnswer = (answerBody, userId, questionId) => (`
INSERT INTO answers 
(answer_body, user_id, question_id) 
VALUES 
('${answerBody}', ${userId}, ${questionId}) RETURNING *`);

/**
 * @method fetchQuestionByAnswerId
 * @description This fetches the questions based on the answer id
 * @returns {Object} Object
*/
export const fetchQuestionByAnswerId = answerId => (
  `SELECT  question_body, 
    q.user_id as question_creator, 
    answer_body, 
    a.user_id as answer_creator 
    FROM questions q 
    INNER JOIN 
    answers a ON q.id = a.question_id 
    WHERE a.id = ${answerId}`);
/**
 * @method setPreferedAnswer
 * @description This sets an answer to preferred
 * @returns {Boolean} Boolean
*/
export const setPreferedAnswer = answerId => (`
  UPDATE answers
  SET is_preferred = 'yes'
  WHERE id = ${answerId}
  RETURNING *
  `);
/**
 * @function updateAnswer
 * @description This updates answer
 * @returns {Object} Object
*/
export const updateAnswer = (body, answerId, userId) => (`
  UPDATE answers
  SET answer_body = '${body}'
  WHERE id = ${answerId} AND 
  user_id = ${userId}
  RETURNING *
  `);
/**
 * @function checkQuestionId
 * @description This gets a question by id
 * @returns {Object} Object
*/
export const checkQuestionId = questionId => (
  `SELECT id FROM questions WHERE questions.id = ${questionId}`
);
/**
 * @method checkAnswer
 * @description This gets an answer by id
 * @returns {Object} Object
*/
export const checkAnswer = answerId => (
  `SELECT id FROM answers WHERE answers.id = ${answerId}`
);
/**
 * @method checkAnswerId
 * @description This gets a question by id
 * @returns {Object} Object
*/
export const checkAnswerId = (questionId, answerId) => (
  `SELECT * FROM answers a WHERE a.question_id = ${questionId} AND
  a.id = ${answerId}
  `
);
/**
 * @function findAnswersByQuestionId
 * @description This gets answers by questionId
 * @returns {Object} Object
*/
export const findAnswersByQuestionId = questionId => (
  `SELECT * FROM answers a WHERE a.question_id = ${questionId}
  `
);
/**
 * @method findCount
 * @description This gets the question with the most answers
 * @returns {Object} Object
*/
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
/**
 * @method postComment
 * @description This posts comment an answer
 * @returns {Object} Object
*/
export const postComment = (commentBody, userId, answerId) => (`
INSERT INTO comments
(body, user_id, answer_id)
VALUES ('${commentBody}', ${userId}, ${answerId}) RETURNING *`);
