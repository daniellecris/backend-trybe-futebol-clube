import { Request, Response } from 'express';
import TeamService from '../services/teamsService';

const getAll = async (req: Request, res: Response):Promise<Response> => {
  const team = new TeamService();
  const response = await team.getAll();

  return res.status(200).json(response);
};

const getById = async (req: Request, res: Response):Promise<Response> => {
  const { id } = req.params;
  const team = new TeamService();
  const response = await team.getById(+id);

  return res.status(200).json(response);
};

const teamsController = { getAll, getById };

export default teamsController;
