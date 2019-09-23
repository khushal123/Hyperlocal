module.exports = (sequelize, Sequelize) => {
    const address_types = sequelize.define('address_types', {
        type: {
            type: Sequelize.STRING
        }
       
    }, {
        classMethods: {
            associate: (models) => {
                address_types.belongsTo(models.users_address, { foreignKey: 'type' });
            }
        }
    });
    return address_types;
};