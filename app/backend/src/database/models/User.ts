import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class user extends Model {
  id!: number;
  username!: string;
  role!: string;
  email!: string;
  password!: string;
}

user.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: STRING(50),
    allowNull: false,
  },
  role: {
    type: STRING(),
    allowNull: false,
  },
  email: {
    type: STRING(250),
    allowNull: false,
  },
  password: {
    type: STRING(),
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'user',
  tableName: 'users',
  timestamps: false,
});

export default user;
