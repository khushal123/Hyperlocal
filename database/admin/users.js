let models = require("../../models");
let users = models.users;
const Op = models.Sequelize.Op;
let create = async (full_name, email, password, mobile) => {
    try {
        console.log(typeof users);
        let getUser = await users.findAll({
            where: {
                [Op.or]: {
                    email: email,
                    mobile: mobile
                }
            }
        })
        console.log("got user");
        console.log("----------getuser-----------");
        console.log(getUser);
        console.log("----------getuser-----------");
        if (getUser && getUser.length > 0) {
            return Promise.reject({
                message: "user exists"
            });
        }
        let createUser = await users.create({
            name: full_name,
            email: email,
            password: password,
            mobile: mobile,
            status: 1,
            user_type: "admin",
            login_status: 0 //
        }, {
            plane: true
        });
        console.log("----------createUser-----------");
        console.log(createUser);
        console.log("----------createUser-----------");
        return createUser;
    } catch (error) {
        console.log("----------error-----------");
        console.log(error);
        console.log("----------error-----------");
        return Promise.reject({
            message: error.original.sql,
            stack: "database/user.js/39"
        });
    }

}



module.exports = { create, loginEmail, loginMobile, refreshToken, getUserInfo, updateUserInfo }