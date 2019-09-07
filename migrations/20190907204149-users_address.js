'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    /*  Add altering commands here.
     Return a promise to correctly handle asynchronicity.

     Example: */
    return queryInterface.createTable('users_address', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.BIGINT,
        references: {
          model: 'users',
          key: 'id'
        },
      },
      address_line_1: {
        type: Sequelize.STRING
      },
      address_line_2: {
        type: Sequelize.STRING
      },
      address_line_3: {
        type: Sequelize.STRING
      },
      pincode: {
        type: Sequelize.INTEGER
      }
    });

  },

  down: (queryInterface, Sequelize) => {

    /*  Add reverting commands here.
     Return a promise to correctly handle asynchronicity.

     Example: */
    return queryInterface.dropTable('users_address');

  }
};
