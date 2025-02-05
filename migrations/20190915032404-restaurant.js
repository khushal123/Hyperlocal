'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    /*  Add altering commands here.
     Return a promise to correctly handle asynchronicity.

     Example: */
    return queryInterface.createTable('restaurants', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
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
      latitude: {
        type: Sequelize.FLOAT
      },
      longitude: {
        type: Sequelize.FLOAT
      },
      location:{
        type:Sequelize.GEOGRAPHY
      },
      status: {
        type: Sequelize.INTEGER //closed, open, inactive,
      },
      gst: {
        type: Sequelize.STRING
      },
      cgst: {
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
    return queryInterface.dropTable('restaurants');

  }
};
