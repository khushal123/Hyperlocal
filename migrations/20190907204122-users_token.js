'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    /*  Add altering commands here.
     Return a promise to correctly handle asynchronicity.

     Example: */
    return queryInterface.createTable('users_token', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fcm_token: {
        type: Sequelize.STRING
      },
      token_type: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.BIGINT,
        references: {
          model: 'users',
          key: 'id'
        },
      }
    });

  },

  down: (queryInterface, Sequelize) => {

    /*  Add reverting commands here.
     Return a promise to correctly handle asynchronicity.

     Example: */
    return queryInterface.dropTable('users_token');

  }
};
