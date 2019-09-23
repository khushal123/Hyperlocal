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
      name: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.INTEGER //0 = inactive, 1=available, 2=not available
      },
      product_type: {
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
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE,
        default: Sequelize.fn("NOW")
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        default: Sequelize.fn("NOW")
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
