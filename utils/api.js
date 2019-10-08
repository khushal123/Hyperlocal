let request = require("request");
let { sendEmailOtp } = require("./mailer");
let sendGridUrl = process.env.SENDGRID_OTP_URL;

let sendOtp = async (mobile, otp, email) => {
    sendGridUrl = sendGridUrl.replace("senderid", "ButtiOOTA");
    sendGridUrl = sendGridUrl.replace("message", "Your otp is: " + otp);
    sendGridUrl = sendGridUrl.replace("mobile_no", mobile);
    sendGridUrl = sendGridUrl.replace("authkey", process.env.SENDGRID_API_KEY);
    request.post({
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        url: sendGridUrl,
    }, function (error, response, body) {
        if (error) {
            return Promise.reject(error);
        }
    });
    return await sendEmailOtp(otp, email);
}

module.exports = { sendOtp }

