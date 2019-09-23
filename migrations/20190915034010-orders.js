'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    /*  Add altering commands here.
     Return a promise to correctly handle asynchronicity.

     Example: */
    return queryInterface.createTable('orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.STRING
      },
      address_id: {
        type: Sequelize.BIGINT,
        references: {
          model: 'users_address',
          key: 'id'
        },
      },
      product_id: {
        type: Sequelize.BIGINT,
        references: {
          model: 'products',
          key: 'id'
        },
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      discount_id: {
        type: Sequelize.BIGINT,
        references: {
          model: 'discounts',
          key: 'id'
        },
      },
      payment_id: {
        type: Sequelize.BIGINT,
        references: {
          model: 'payments',
          key: 'id'
        },
      },
      order_status: {
        type: Sequelize.STRING
      },
      order_pick_time: {
        type: Sequelize.DATE
      },
      total_price: {
        type: Sequelize.FLOAT
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
    return queryInterface.dropTable('orders');

  }
};
