module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('professors', 'availability', {
      type: Sequelize.JSON,
      allowNull: true,
      defaultValue: null,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('professors', 'availability');
  },
};
