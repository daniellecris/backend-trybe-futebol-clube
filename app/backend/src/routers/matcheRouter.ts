import { Router, Request, Response } from 'express';
import MatcheController from '../controllers/matcheController';

const matcheRouter = Router();

const matcheController = new MatcheController();

matcheRouter.get('/matches', (req: Request, res: Response) =>
  matcheController.getAllMatches(req, res));

export default matcheRouter;
