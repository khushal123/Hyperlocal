module.exports = (sequelize, Sequelize) => {
    const order_cancellation = sequelize.define('order_cancellation', {
        order_id: {
            type: Sequelize.STRING
        },
        cancel_type: {
            type: Sequelize.STRING,
        },
        cancel_reason: {
            type: Sequelize.STRING
        },
        refund_status: {
            type: Sequelize.STRING
        },
        payments_id: {
            type: Sequelize.BIGINT,
        }
    }, {
        classMethods: {
            associate: (models) => {
                order_cancellation.belongsTo(models.orders, { foreignKey: 'order_id' });
            }
        }
    });
    return order_cancellation;
};