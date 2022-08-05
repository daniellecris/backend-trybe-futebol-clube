import { Request, Response } from 'express';
import HttpException from '../shared/HttpException';
import MatcheService from '../services/matcheService';

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

  public async postController(req: Request, res: Response) {
    const create = await this.service.postMatches(req.body);
    res.status(201).json(create);
  }
}

export default MatcheController;
