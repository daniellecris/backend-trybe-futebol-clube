/* eslint-disable max-lines-per-function */
import Teams from '../database/models/Team';
import Matches from '../database/models/Matche';

class LeaderboardService {
  static getAllTeams = async () => {
    const teams = await Teams.findAll();

    return teams.map((item) => ({
      id: item.getDataValue('id'),
      teamName: item.getDataValue('teamName'),
    }));
  };

  static getPoints = async (id: number, name: string) => {
    const newMatche = {
      name,
      totalPoints: 0,
      totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
      efficiency: 0,
    };

    const matches = await Matches.findAll({
      where: { inProgress: false },
    });

    matches.forEach((matche) => {
      if (matche.homeTeam === id) {
        newMatche.totalGames += 1;
        newMatche.goalsFavor += matche.homeTeamGoals;
        newMatche.goalsOwn += matche.awayTeamGoals;

        if (matche.homeTeamGoals === matche.awayTeamGoals) {
          // newMatche.goalsFavor += matche.homeTeamGoals;
          // newMatche.goalsOwn += matche.awayTeamGoals;
          newMatche.totalDraws += 1;
        }

        if (matche.homeTeamGoals > matche.awayTeamGoals) {
          newMatche.totalVictories += 1;
          // newMatche.goalsFavor += matche.homeTeamGoals;
          // newMatche.goalsOwn += matche.awayTeamGoals;
        }

        if (matche.homeTeamGoals < matche.awayTeamGoals) {
          // newMatche.goalsFavor += matche.homeTeamGoals;
          // newMatche.goalsOwn += matche.awayTeamGoals;
          newMatche.totalLosses += 1;
        }
      }
    });

    newMatche.totalPoints = newMatche.totalVictories * 3 + newMatche.totalDraws;
    newMatche.efficiency = +((newMatche.totalPoints / (newMatche.totalGames * 3)) * 100).toFixed(2);
    newMatche.goalsBalance = newMatche.goalsFavor - newMatche.goalsOwn;

    return newMatche;
  };

  static async leaderboard() {
    // console.log('leader service');
    const teams = await this.getAllTeams();
    const result = await Promise.all(teams.map((item) => this.getPoints(item.id, item.teamName)));

    console.log(result);

    return result.sort((a, b) => b.totalVictories - a.totalVictories
    || b.totalPoints - a.totalPoints
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor);
  }
}

export default LeaderboardService;
