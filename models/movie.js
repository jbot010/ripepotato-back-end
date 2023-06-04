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
      Movie.belongsTo(models.Profile, { foreignKey: 'createdById' })

      Movie.hasMany(models.Vote, {
        as: 'votesReceived',
        foreignKey: 'movieId',
      })
      
    }
  }
  Movie.init({
    title: {
      type: DataTypes.STRING,
    },
    rtScore: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 60,
      },
    },
    createdById: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Profiles',
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};