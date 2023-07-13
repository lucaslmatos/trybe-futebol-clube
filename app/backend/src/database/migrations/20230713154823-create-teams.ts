module.exports = {
  async up (queryInterface:any, Sequelize:any) {
    await queryInterface.createTable('teams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      team_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },
  down: async (queryInterface:any, _Sequelize:any) => {
    await queryInterface.dropTable('teams');
  }
};