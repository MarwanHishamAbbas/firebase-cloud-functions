const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
admin.initializeApp();
require("dotenv").config();

const { SENDER_EMAIL, SENDER_PASSWORD } = process.env;

exports.sendEmailNotification = functions.firestore
  .document("careers/{docId}")
  .onCreate((snap, ctx) => {
    const data = snap.data();
    let authData = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: SENDER_EMAIL,
        pass: SENDER_PASSWORD,
      },
    });
    authData
      .sendMail({
        from: "info@marwan.com",
        to: `marwanhiisham@gmail.com`,
        subject: "Your submission Info",
        text: `This is a text from Marwan Hisham`,
        html: `This is an HTML template from Marwan Hisham`,
      })
      .then((res) => console.log("successfully sent that mail"))
      .catch((err) => console.log(err));
  });
