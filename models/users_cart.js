module.exports = (sequelize, Sequelize) => {
    const users_cart = sequelize.define('users_cart', {
        product_id: {
            type: Sequelize.BIGINT
        },
        quantity: {
            type: Sequelize.INTEGER
        },
        user_id: {
            type: Sequelize.BIGINT
        }
    }, {
        classMethods: {
            associate: (models) => {
                users_cart.belongsTo(models.users, { foreignKey: 'user_id' });
                users_cart.belongsTo(models.products, {foreignKey: 'product_id'});
            }
        }
    });
    return users_cart;
};