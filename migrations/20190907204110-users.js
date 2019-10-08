'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {

        /*  Add altering commands here.
         Return a promise to correctly handle asynchronicity.

         Example: */
        return queryInterface.createTable('users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            email: {
                type: Sequelize.STRING,
                unique: true,
                allowNull: true
            },
            mobile: {
                type: Sequelize.BIGINT,
                unique: true
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
            },
            user_type: {
                type: Sequelize.STRING
            },
            otp: {
                type: Sequelize.INTEGER
            },
            otp_verified: {
                type: Sequelize.INTEGER,
                default: 0
            },
            createdAt: {
                allowNull: true,
                type: Sequelize.DATE,
                default: Sequelize.fn("NOW")
            },
            updatedAt: {
                allowNull: true,
                type: Sequelize.DATE,
                default: Sequelize.fn("NOW")
            },
        });

    },

    down: (queryInterface, Sequelize) => {

        /*  Add reverting commands here.
         Return a promise to correctly handle asynchronicity.

         Example: */
        return queryInterface.dropTable('users');

    }
};