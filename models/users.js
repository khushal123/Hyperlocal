module.exports = (sequelize, Sequelize) => {
    const users = sequelize.define('users', {
        name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING,
            unique: true
        },
        mobile: {
            type: Sequelize.BIGINT,
        },
        password: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.INTEGER
        },
        last_login: {
            type: Sequelize.DATE
        },
        user_type: {
            type: Sequelize.STRING
        },
        login_status: {
            type: Sequelize.INTEGER
        }
    }, {
        classMethods: {
            associate: (models) => {
                users.hasMany(models.users_address, { foreignKey: 'user_id' });
                users.hasMany(models.users_cart, { foreignKey: 'user_id' });
                users.hasMany(models.users_token, { foreignKey: 'user_id' });
                users.hasMany(models.orders, { foreignKey: 'user_id' });
            }
        }
    });
    return users;
};