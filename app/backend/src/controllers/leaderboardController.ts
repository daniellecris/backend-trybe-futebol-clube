import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboardService';

class LeaderboardController {
  private leadservice: LeaderboardService;

  static async leaderboard(req: Request, res: Response) {
    const leaderboard = await LeaderboardService.leaderboard();
    res.status(200).json(leaderboard);
  }
}

export default LeaderboardController;
