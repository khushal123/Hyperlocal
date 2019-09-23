module.exports = (sequelize, Sequelize) => {
    const users_device_token = sequelize.define('users_device_token', {
        device_id: {
            type: Sequelize.STRING
        },
        user_id: {
            type: Sequelize.BIGINT,

        },
    }, {
        classMethods: {
            associate: (models) => {
                users_device_token.belongsTo(models.users, { foreignKey: 'user_id' });
            }
        }
    });
    return users_device_token;
};