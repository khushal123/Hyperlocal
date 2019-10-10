const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
var sendEmailOtp = async (otp, email) => {
    const msg = {
        to: email,
        from: 'test@example.com',
        subject: 'Your Login OTP',
        text: `Your otp is: ${otp}`,
        html: `<strong>Your otp is: ${otp}</strong>`,
    };
   return sgMail.send(msg);
}


var sendPasswordReset = async (token, email) => {

}

module.exports = { sendEmailOtp }