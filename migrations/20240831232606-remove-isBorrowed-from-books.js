module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Books', 'isBorrowed');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Books', 'isBorrowed', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });
  }
};