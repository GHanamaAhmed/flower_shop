const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  //   secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.USER_NODE_MAILER,
    pass: process.env.PASS_NODE_MAILER,
  },
});
export { transporter };
