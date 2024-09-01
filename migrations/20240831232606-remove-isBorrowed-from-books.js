module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Books', 'isBorrowed');
  },

  down: async (queryInterface, Sequelize) => {
   
  }
};