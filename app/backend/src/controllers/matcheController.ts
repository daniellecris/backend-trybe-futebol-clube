import { Request, Response } from 'express';
import MatcheService from '../services/matcheService';

class MatcheController {
  private service: MatcheService;
  constructor() {
    this.service = new MatcheService();
  }

  public async getAllMatches(req: Request, res: Response) {
    const matche = await this.service.getMatches();
    return res.status(200).json(matche);
  }
}

export default MatcheController;
