module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Reviews', 'comment');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Reviews', 'comment', {
      type: Sequelize.TEXT,
      allowNull: true
    });
  }
};