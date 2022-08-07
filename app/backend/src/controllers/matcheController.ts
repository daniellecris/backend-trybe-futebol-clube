import { Request, Response } from 'express';
import HttpException from '../shared/HttpException';
import MatcheService from '../services/matcheService';
import TeamService from '../services/teamsService';

class MatcheController {
  private service: MatcheService;
  constructor() {
    this.service = new MatcheService();
  }

  public async getAllMatches(req: Request, res: Response) {
    const matche = await this.service.getAllMatches();
    return res.status(200).json(matche);
  }

  public async patchController(req: Request<{ id: number }>, res: Response) {
    const { id } = req.params;

    const update = await this.service.patchService(+id);

    if (update === true) {
      res.status(200).json({ message: 'Finished' });
    } else {
      throw new HttpException(401, 'match not updated');
    }
  }

  public async patchControllerId(req: Request<{ id: number }>, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    const update = await this.service.patchServiceId(+id, homeTeamGoals, awayTeamGoals);

    if (update === true) {
      res.status(200).json({ message: 'updated goals' });
    } else {
      throw new HttpException(401, 'not updated goals');
    }
  }

  public async postController(req: Request, res: Response) {
    const { homeTeam, awayTeam } = req.body;

    const team = new TeamService();

    const compareHome = await team.getById(homeTeam);
    const compareAway = await team.getById(awayTeam);

    console.log('TeamHome:', compareHome, 'TeamAway:', compareAway);

    const create = await this.service.postMatches(req.body);
    res.status(201).json(create);
  }
}

export default MatcheController;
