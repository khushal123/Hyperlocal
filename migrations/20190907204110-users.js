'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    /*  Add altering commands here.
     Return a promise to correctly handle asynchronicity.

     Example: */
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: true
      },
      password: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.INTEGER
      },
      last_login: {
        type: Sequelize.DATE
      },
      login_status: {
        type: Sequelize.INTEGER
      }
    });

  },

  down: (queryInterface, Sequelize) => {

    /*  Add reverting commands here.
     Return a promise to correctly handle asynchronicity.

     Example: */
    return queryInterface.dropTable('users');

  }
};
