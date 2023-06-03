'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Movie.belongsTo(models.Profile, { foreignKey: 'raterId' })
    }
  }
  Movie.init({
    value: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 5,
      },
    },
    raterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'Profiles',
        key: 'id',
      },
    },
    title: {
      type: DataTypes.STRING,
    },
    rtScore: {
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};