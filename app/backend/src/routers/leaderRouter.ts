import { Router, Request, Response } from 'express';
import LeaderboardController from '../controllers/leaderboardController';

const leaderRouter = Router();

// const leaderboardController = new LeaderboardController();

leaderRouter.get('/leaderboard/home', (req: Request, res: Response) =>
  LeaderboardController.leaderboard(req, res));

export default leaderRouter;
