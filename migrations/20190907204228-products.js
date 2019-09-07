'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    /*  Add altering commands here.
     Return a promise to correctly handle asynchronicity.

     Example: */
    return queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      restaurant_id: {
        type: Sequelize.BIGINT,
        references: {
          model: 'restaurants',
          key: 'id'
        },
      },
      availability_start_hours: {
        type: Sequelize.DATE
      },
      availability_hours: {
        type: Sequelize.FLOAT
      },
      price: {
        type: Sequelize.FLOAT,
      },
      description: {
        type: Sequelize.STRING
      },
      is_discount_available: {
        type: Sequelize.INTEGER
      },
      discount_id: {
        type: Sequelize.BIGINT,
        references: {
          model: 'discounts',
          key: 'id'
        },
      }
    });

  },

  down: (queryInterface, Sequelize) => {

    /*  Add reverting commands here.
     Return a promise to correctly handle asynchronicity.

     Example: */
    return queryInterface.dropTable('products');

  }
};
