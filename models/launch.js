'use strict';
module.exports = (sequelize, DataTypes) => {
  const Launch = sequelize.define('Launch', {
    name: DataTypes.STRING
  }, {});
  Launch.associate = function(models) {
    // associations can be defined here
  };
  return Launch;
};