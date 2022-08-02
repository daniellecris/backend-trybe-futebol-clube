import { NextFunction, Request, Response } from 'express';
import HttpException from '../shared/HttpException';

const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email) {
    throw new HttpException(400, 'All fields must be filled');
  }

  if (typeof email !== 'string') {
    throw new HttpException(400, 'Field must receive string');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new HttpException(400, 'Invalid email format');
  }

  if (!password || password.length < 6) {
    throw new HttpException(400, 'Password must be at least 6 characters');
  }
  next();
};

export default validateLogin;
