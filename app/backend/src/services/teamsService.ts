import ITeams from '../interfaces/ITeams';
import Teams from '../database/models/Team';
import HttpExpection from '../shared/HttpException';

class TeamService {
  public getAll = async (): Promise<ITeams[]> => {
    const teamsSearch = await Teams.findAll();
    return teamsSearch as ITeams[];
  };

  public getById = async (id: number): Promise<ITeams> => {
    const teamsSearch = await Teams.findByPk(id);
    if (!teamsSearch) {
      throw new HttpExpection(404, 'There is no team with such id!');
    }
    return teamsSearch as ITeams;
  };
}

export default TeamService;
