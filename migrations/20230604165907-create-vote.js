'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Votes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      value: {
        type: Sequelize.INTEGER,
        validate: {
          min: 0,
          max: 100,
        },
      },
      movieId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Movies',
          key: 'id',
        },
      },
      voterId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Profiles',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Votes');
  }
};