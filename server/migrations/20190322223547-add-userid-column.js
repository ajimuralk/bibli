'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Locations', 'UserId', {
        type: Sequelize.INTEGER,
        unique: true,
        allowNull: false,
        after: 'id'
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Locations', 'UserId');
  }
};
