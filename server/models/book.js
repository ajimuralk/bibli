'use strict';
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    BookId: DataTypes.STRING,
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    publisher: DataTypes.STRING,
    publishedDate: DataTypes.STRING,
    description: DataTypes.STRING,
    categories: DataTypes.STRING,
    averageRating: DataTypes.STRING,
    ratingsCount: DataTypes.INTEGER
  }, {});
  Book.associate = function(models) {
    Book.belongsToMany(models.User, {through: 'UserBook'})
  };
  return Book;
};