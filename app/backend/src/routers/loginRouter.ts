import { Router } from 'express';
import authMiddleware from '../middlewares/auth';
import loginController from '../controllers/loginController';
import validadeLogin from '../middlewares/validate.login';

const loginRouter = Router();

loginRouter.post('/login', validadeLogin, loginController.login);
loginRouter.get('/login/validate', authMiddleware, loginController.validate);

export default loginRouter;
