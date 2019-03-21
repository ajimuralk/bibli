'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.createTable('UserBooks', {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.STRING
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
          unique: true,
          // references: {
          //   model: 'user',
          //   key: 'id'
          // }
        },
        BookId: {
          allowNull: false,
          type: Sequelize.INTEGER,
          unique: true,
          // references: {
          //   model: 'book',
          //   key: 'BookId'
          // }
        }
      })
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('UserBooks');
  }
};
