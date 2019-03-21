'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.createTable('UserBooks', {
        id: {
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
          type: Sequelize.INTEGER
        },
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
          type: Sequelize.INTEGER,
          unique: true
        },
        BookId: {
          allowNull: false,
          type: Sequelize.INTEGER,
          unique: true
        }
      })
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('UserBooks');
  }
};
