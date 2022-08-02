import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';
import Matches from './Matche';

class Teams extends Model {
  public id!: number;
  public teamName!: string;
}

Teams.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: STRING,
    allowNull: false,
  },
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  timestamps: false,
});

Matches.belongsTo(Teams, {
  as: 'teamAway',
  foreignKey: 'awayTeam',
});
Matches.belongsTo(Teams, {
  as: 'teamHome',
  foreignKey: 'homeTeam',
});

export default Teams;
