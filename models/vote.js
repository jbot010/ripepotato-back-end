'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Vote.belongsTo(models.Profile, { foreignKey: 'voterId' })
      Vote.belongsTo(models.Movie, { foreignKey: 'movieId' })
    }
  }
  Vote.init({
    value: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 100,
      },
    },
    movieId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'Movies',
        key: 'id',
      },
    },
    voterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Profiles',
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'Vote',
  });
  return Vote;
};