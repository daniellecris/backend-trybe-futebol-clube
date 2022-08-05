import Teams from '../database/models/Team';
import Matche from '../database/models/Matche';
import IMatche from '../interfaces/IMatche';
import HttpException from '../shared/HttpException';

class MatcheService {
  public getAllMatches = () => {
    const matches = Matche.findAll({
      include: [
        { model: Teams, as: 'teamHome' },
        { model: Teams, as: 'teamAway' },
      ],
    });
    return matches;
  };

  public patchService = async (id:number) => {
    const [update] = await Matche.update(
      { inProgress: false },
      { where: { id } },
    );

    return update > 0;
  };

  public postMatches = (matche: IMatche) => {
    const create = Matche.create({
      homeTeam: matche.homeTeam,
      homeTeamGoals: matche.homeTeamGoals,
      awayTeam: matche.awayTeam,
      awayTeamGoals: matche.awayTeamGoals,
      inProgress: true,
    });

    if (matche.awayTeam === matche.homeTeam) {
      throw new HttpException(401, 'It is not possible to create a match with two equal teams');
    }
    return create;
  };
}

export default MatcheService;
