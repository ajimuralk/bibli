'use strict';
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    id: DataTypes.STRING,
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
    // associations can be defined here
  };
  return Book;
};