import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class team extends Model {
  id!: number;
  username!: string;
  role!: string;
  email!: string;
  password!: string;
}

team.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: STRING(50),
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'team',
  tableName: 'teams',
  timestamps: false,
});

export default team;
