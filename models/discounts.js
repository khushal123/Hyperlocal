module.exports = (sequelize, Sequelize) => {
    const discounts = sequelize.define('discounts', {
        discount_type: {
            type: Sequelize.STRING
        },
        minimum_value: {
            type: Sequelize.INTEGER,
        },
       
        status: {
            type: Sequelize.INTEGER
        },
        discount_value: {
            type: Sequelize.STRING
        }
    }, {
        classMethods: {
            associate: (models) => {
                discounts.belongsTo(models.orders, { foreignKey: 'order_id' });
                discounts.belongsTo(models.restaurants, { foreignKey: 'discount_id' });
            }
        }
    });
    return discounts;
};