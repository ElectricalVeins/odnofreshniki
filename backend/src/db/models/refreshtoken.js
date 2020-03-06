'use strict';
module.exports = (sequelize, DataTypes) => {
  const RefreshToken = sequelize.define('RefreshToken', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    refreshToken: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {});

  RefreshToken.associate = function (models) {
    RefreshToken.belongsTo(models.User, {
      targetKey: 'id',
      foreignKey: 'userId'
    });
  };
  return RefreshToken;
};