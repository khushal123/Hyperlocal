module.exports = (sequelize, Sequelize) => {
    const orders = sequelize.define('orders', {
        user_id: {
            type: Sequelize.STRING
        },
        address_id: {
            type: Sequelize.BIGINT,
        },
        product_id: {
            type: Sequelize.BIGINT,

        },
        quantity: {
            type: Sequelize.INTEGER
        },
        discount_id: {
            type: Sequelize.BIGINT,

        },
        payment_id: {
            type: Sequelize.BIGINT,

        },
        order_status: {
            type: Sequelize.STRING
        },
        order_pick_time: {
            type: Sequelize.DATE
        },
        total_price: {
            type: Sequelize.FLOAT
        }
    }, {
        classMethods: {
            associate: (models) => {
                orders.hasOne(models.discounts, { foreignKey: 'discount_id' });
                orders.hasOne(models.users_address, { foreignKey: 'address_id' });
                orders.hasMany(models.products, { foreignKey: 'product_id' });
            }
        }
    });
    return orders;
};