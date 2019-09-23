module.exports = (sequelize, Sequelize) => {
    const users_cart = sequelize.define('products', {
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
        },
        name: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.INTEGER //0 = inactive, 1=available, 2=not available
        },
        product_type: {
            type: Sequelize.STRING
        }
    }, {
        classMethods: {
            associate: (models) => {
                users_cart.hasOne(models.discounts, { foreignKey: 'discount_id' });
            }
        }
    });
    return users_cart;
};