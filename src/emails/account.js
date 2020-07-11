const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");
dotenv.config();

const sendgridApiKey = process.env.SENDGRID_API_KEY

sgMail.setApiKey(sendgridApiKey);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'loi@coderschool.vn',
    subject: 'Welcome to Task Manager!',
    text: `Welcome to Task Manager ${name}. We'll email you again in a few weeks with 3 simple questions about your experience so we can improve it for everyone. Thank you for your cooperation!`
  })
}

const accountDeletionFollowupEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'loi@coderschool.vn',
    subject: 'So sad weve lost you',
    text: `Thank you for using our service ${name}. We sent a short survey to learn what we could do to make you want to stay. We'd appreciate it if you'd answer our question!`
  })
}

module.exports = {
  sendWelcomeEmail,
  accountDeletionFollowupEmail
}
