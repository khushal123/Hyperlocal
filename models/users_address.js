module.exports = (sequelize, Sequelize) => {
    const users_address = sequelize.define('users_address', {
        type: {
            type: Sequelize.BIGINT,
        },
        user_id: {
            type: Sequelize.BIGINT,
        },
        address_line_1: {
            type: Sequelize.STRING
        },
        address_line_2: {
            type: Sequelize.STRING
        },
        address_line_3: {
            type: Sequelize.STRING
        },
        pincode: {
            type: Sequelize.INTEGER
        }
    }, {
        classMethods: {
            associate: (models) => {
                users_address.hasOne(models.users, { foreignKey: 'user_id' });
                users_address.hasOne(models.address_types, { foreignKey: 'type' });
            }
        }
    });
    return users_address;
};