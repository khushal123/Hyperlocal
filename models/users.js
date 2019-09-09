module.exports = (sequelize, { STRING, BOOLEAN, INTEGER, DATE }) => {
    const users = sequelize.define('users', {
        name: {
            type: Sequelize.STRING  
        },
        email: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: true
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
        login_status: {
            type: Sequelize.INTEGER
        }
    }, {
        classMethods: {
            associate: (models) => {
                users.hasMany(models.users_address);
                users.hasMany(models.users_cart);
                users.hasMany(models.users_token);
                users.hasMany(models.orders);
            }
        }
    });
    return users;
};