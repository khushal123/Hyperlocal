module.exports = (sequelize, Sequelize) => {
    const restaurants = sequelize.define('restaurants', {
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
        lattitude: {
            type: Sequelize.FLOAT
        },
        longitude: {
            type: Sequelize.FLOAT
        },
        location:{
          type:Sequelize.GEOGRAPHY('POINT', 4326)
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

        }
    }, {
        classMethods: {
            associate: (models) => {
                restaurants.hasMany(models.discounts, { foreignKey: 'discount_id' });
            }
        }
    });
    return restaurants;
};
