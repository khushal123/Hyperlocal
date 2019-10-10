let request = require("request");
let { sendEmailOtp } = require("./mailer");
let msgUrl = process.env.MSG91_URL;

let sendOtp = async (mobile, otp, email) => {
    console.log(mobile)
    console.log(otp);
    msgUrl = msgUrl.replace("{senderid}", "ButtiOOTA");
    msgUrl = msgUrl.replace("{message}", "Your otp is: " + otp);
    msgUrl = msgUrl.replace("{mobile_no}", mobile);
    msgUrl = msgUrl.replace("{authkey}", process.env.MSG91_KEY);
    msgUrl = msgUrl.replace("{otp}", otp);
    console.log(msgUrl)
    request.post({
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        url: msgUrl,
    }, function (error, response, body) {
        if (error) {
            return Promise.reject(error);
        }
        console.log(body);
    });
    return await sendEmailOtp(otp, email);
}

module.exports = { sendOtp }

