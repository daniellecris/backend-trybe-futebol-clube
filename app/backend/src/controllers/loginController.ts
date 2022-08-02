import { Request, Response } from 'express';
import LoginService from '../services/loginService';

const login = async (req: Request, res: Response):Promise<Response> => {
  const { email, password } = req.body;
  const loginNew = new LoginService();
  const response = await loginNew.authMiddleware(email, password);
  return res.status(200).json({ token: response });
};

const validate = async (req: Request, res: Response) :Promise<Response> => {
  const { role } = res.locals.decode;
  return res.status(200).json({ role });
};
const loginController = { login, validate };

export default loginController;
