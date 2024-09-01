module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Reviews', 'status', {
      type: Sequelize.ENUM('borrowed', 'returned', 'rated'),
      allowNull: false,
      defaultValue: 'borrowed',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Reviews', 'status');
  }
};