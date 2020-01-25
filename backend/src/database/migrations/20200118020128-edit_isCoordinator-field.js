module.exports = {
  up: queryInterface => {
    return queryInterface.renameColumn(
      'professors',
      'isCoordinator',
      'is_coordinator'
    );
  },

  down: queryInterface => {
    return queryInterface.renameColumn(
      'professors',
      'is_coordinator',
      'isCoordinator'
    );
  },
};
