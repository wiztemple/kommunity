import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.JWT_SECRET;

const verifyToken = (request, response, next) => {
  try {
    const token = request.headers.authorization.split(' ')[1];
    if (!token) {
      return response.status(401).json({
        status: 'fail',
        message: 'No Token provided'
      });
    }
    const decoded = jwt.verify(token, secret);
    request.userId = decoded;
    next();
  } catch (error) {
    return response.status(401).json({
      status: 'unauthorized',
      message: 'you are not authorized to perform this operation'
    });
  }
  return null;
};


export default verifyToken;
