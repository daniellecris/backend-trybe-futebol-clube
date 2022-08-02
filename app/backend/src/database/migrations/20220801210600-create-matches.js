module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('matches', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        homeTeam: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: 'teams',
            key:'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          field: 'home_team',
        },
        homeTeamsGoals: {
          allowNull: false,
          type: Sequelize.INTEGER,
          field: 'home_team_goals',
        },
        awayTeam: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: 'teams',
            key:'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          field: 'away_team',
        },
        awayTeamsGoals: {
          allowNull: false,
          type: Sequelize.INTEGER,
          field: 'away_team_goals',
        },
        inProgress: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          field:'in_progress'
        },
      });
    },
    down: async (queryInterface) => {
      await queryInterface.dropTable('matches');
    },
  };   