module.exports = (sequelize, { STRING, BOOLEAN, INTEGER, DATE }) => {
    const users_token = sequelize.define('users_token', {
        fcm_token: {
            type: Sequelize.STRING
        },
        token_type: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.INTEGER
        },
        user_id: {
            type: Sequelize.BIGINT,
            references: {
                model: 'users',
                key: 'id'
            },
        }
    }, {
        classMethods: {
            associate: (models) => {
                users_token.belongsTo(models.users);
            }
        }
    });
    return users;
};