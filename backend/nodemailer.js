const nodemailer = require("nodemailer");
require("dotenv").config();

async function sendEmail(data) {
  const transporter = nodemailer.createTransport({
    host: "smtp.example.com",
    port: 587,
    auth: {
      name: "soniayushi345@gmail.com",
      password: process.env.GoogleKey,
    },
  });

  transporter
    .sendMail({
      to: `${data.email}`,
      from: "Ayushi@gmail.com",
      subject: data.subject,
      html: data.body,
    })
    .then(() => {
      console.log(`mail sended successfully`);
    })
    .catch((err) => {
      console.log(err.message);
    });
}

module.exports = sendEmail;
