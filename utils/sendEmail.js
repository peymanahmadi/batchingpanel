import nodemailer from "nodemailer";
import sgMail from "@sendgrid/mail";
import nodemailerConfig from "./nodemailerConfig.js";

const sendEmailEthereal = async ({ to, subject, html }) => {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport(nodemailerConfig);

  // send mail with defined transport object
  return transporter.sendMail({
    from: '"Things Solution" <register@thingssolution.com>', // sender address
    to,
    subject,
    html,
  });
};

const sendEmail = async ({ to, subject, html }) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to,
    from: "Things Solution <register@thingssolution.com>",
    subject,
    html,
  };

  await sgMail.send(msg);
};

export default sendEmail;
