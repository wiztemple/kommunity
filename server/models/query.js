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
