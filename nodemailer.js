// const nodemailer = require("nodemailer");
import nodemailer from "nodemailer";
export const sendMail = ({
  service,
  userEmail,
  userPassword,
  recipient,
  subject,
  text,
}) => {
  const mailService = service.toLowerCase();
  const transporter = nodemailer.createTransport({
    service: mailService,
    auth: {
      user: userEmail,
      pass: userPassword,
    },
  });
  const mailOptions = {
    from: userEmail,
    to: recipient,
    subject: subject || "",
    text: text,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.info(
        "Email not sent. Check internet connectivtiy and resend or create a new mail."
      );
    } else {
      console.info(`Email to ${recipient} was sent.`);
    }
  });
};
