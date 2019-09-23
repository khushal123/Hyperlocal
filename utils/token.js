let jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./constants")
let generateToken = async (userId) => {
    let token = jwt.sign({
        userId: userId
    }, JWT_SECRET);
    return token;
}

let validateToken = async (token) => {
    try {
        var decoded = jwt.verify(token, JWT_SECRET);
        return decoded;
    }
    catch (error) {
        console.log(error);
        return error;
    }

}

module.exports = { generateToken, validateToken }