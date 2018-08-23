import jwt from 'jsonwebtoken';

/**
 * @description - Jwt Sign
 *
 * @param {Object} payload
 *
 * @returns {Object} token
 */
const jwtSign = payload => jwt.sign(payload, process.env.JWT_SECRET);

export default jwtSign;
