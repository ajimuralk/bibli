'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserBook = sequelize.define('UserBook', {
    UserId: DataTypes.INTEGER,
    BookId: DataTypes.INTEGER,

  }, {});
  UserBook.associate = function(models) {
  };
  return UserBook;
};