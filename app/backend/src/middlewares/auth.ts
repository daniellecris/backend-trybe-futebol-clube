import { NextFunction, Request, Response } from 'express';
import TokenGenerator from '../shared/TokenGenerator';
import HttpException from '../shared/HttpException';

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization || '';

  if (!token) {
    throw new HttpException(401, 'Token must be a valid token');
  }

  const tokenGenerator = new TokenGenerator();
  const decode = await tokenGenerator.authenticateToken(token);

  res.locals.decode = decode;

  next();
};

export default authMiddleware;
