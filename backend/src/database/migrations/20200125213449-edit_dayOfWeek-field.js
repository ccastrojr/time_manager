module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('class', 'day_of_week', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('class', 'day_of_week', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },
};
