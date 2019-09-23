module.exports = (sequelize, Sequelize) => {
    const payments = sequelize.define('payments', {
        payment_type: {
            type: Sequelize.STRING
        },
        amount: {
            type: Sequelize.FLOAT,
        },
        transaction_id: {
            type: Sequelize.BIGINT
        },
        status: {
            type: Sequelize.INTEGER //0=failed, 1= done
        },
    }, {
        classMethods: {
            associate: (models) => {
                payments.hasMany(models.discounts, { foreignKey: 'discount_id' });
            }
        }
    });
    return payments;
};