'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.createTable('UserBooks', {
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn('NOW')
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn('NOW')
        },
        UserId: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        BookId: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.INTEGER
        }
      })
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('UserBooks');
  }
};
