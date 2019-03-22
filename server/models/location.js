'use strict';
module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    longitude: DataTypes.STRING,
    latitude: DataTypes.STRING
  }, {});
  Location.associate = function(models) {
    Location.belongsTo(models.User, {foreignKey:'UserId'})
  };
  return Location;
};