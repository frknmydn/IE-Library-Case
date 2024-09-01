'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Reviews', 'score', {
      type: Sequelize.INTEGER,
      allowNull: true,  // score alanını nullable hale getiriyoruz
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Reviews', 'score', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  }
};