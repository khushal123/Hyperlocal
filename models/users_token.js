module.exports = (sequelize, Sequelize) => {
    const users_token = sequelize.define('users_token', {
        token: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.INTEGER
        },
        user_id: {
            type: Sequelize.BIGINT,
        }
    }, {
        classMethods: {
            associate: (models) => {
                users_token.belongsTo(models.users, { foreignKey: 'user_id' });
            }
        }
    });
    return users_token;
};