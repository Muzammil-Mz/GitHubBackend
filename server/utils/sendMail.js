import nodemailer from "nodemailer";
import fs from "fs";
import config from "config";

const userMail = config.get("EMAIL");
const pass = config.get("PASSWORD");

async function sendMail(emailData) {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: userMail,
        pass: pass,
      },
    });
    let info = await transporter.sendMail({
      from: `"INCORRECT "<${userMail}`,
      subject: emailData.subject,
      to: emailData.to,
      html: emailData.html,
      text: emailData.text,
    });
    console.log("email sent success", info.messageId);
  } catch (error) {
    console.log(error);
  }
}

export default sendMail;
