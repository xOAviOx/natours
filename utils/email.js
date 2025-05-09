const nodemailer = require("nodemailer");
const pug = require("pug");
const htmltotext = require("html-to-text");
const { convert } = require("html-to-text");
const Transport = require("nodemailer-brevo-transport");

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(" ")[0];
    this.url = url;
    this.from = `Avi Shukla <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === "production") {
      //sendgrid
      return nodemailer.createTransport({
        // service: 'Brevo'
        host: process.env.BREVO_EMAIL_HOST,
        port: process.env.BREVO_EMAIL_PORT,
        auth: {
          user: process.env.BREVO_USERNAME,
          pass: process.env.BREVO_PASSWORD,
        },
      });
    }
    return nodemailer.createTransport({
      host: process.env.BREVO_EMAIL_HOST,
      port: process.env.BREVO_EMAIL_PORT,
      auth: {
        user: process.env.BREVO_USERNAME,
        pass: process.env.BREVO_PASSWORD,
      },
    });
  }

  //send the actual email
  async send(template, subject) {
    //1 render the html based on a pug template

    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject,
    });

    //2 define the email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      text: convert(html),
      html,
    };

    //3 create a transport and send email

    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send("welcome", "Welcome to the Natours Family!");
  }

  async sendPasswordReset() {
    await this.send(
      "passwordReset",
      "Your password reset token (valid for only 10 minutes"
    );
  }
};
// const { options } = require('../routes/userRoutes');
