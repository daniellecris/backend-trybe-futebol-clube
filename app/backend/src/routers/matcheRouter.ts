import { Router, Request, Response } from 'express';
import authMiddleware from '../middlewares/auth';
import MatcheController from '../controllers/matcheController';

const matcheRouter = Router();

const matcheController = new MatcheController();

matcheRouter.get('/matches', (req: Request, res: Response) =>
  matcheController.getAllMatches(req, res));

matcheRouter.patch('/matches/:id/finish', (req: Request<{ id: number }>, res: Response) =>
  matcheController.patchController(req, res));

matcheRouter.post('/matches', authMiddleware, (req: Request, res: Response) =>
  matcheController.postController(req, res));

export default matcheRouter;
