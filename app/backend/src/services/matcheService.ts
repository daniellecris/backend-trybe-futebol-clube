import Teams from '../database/models/Team';
import Matche from '../database/models/Matche';

class MatcheService {
  public getMatches = () => {
    const matches = Matche.findAll({
      include: [
        { model: Teams, as: 'teamHome' },
        { model: Teams, as: 'teamAway' },
      ],
    });
    return matches;
  };
}

export default MatcheService;
