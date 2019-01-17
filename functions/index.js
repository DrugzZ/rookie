const functions = require('firebase-functions');

const nodemailer = require('nodemailer');

const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

exports.contacts = functions.https.onRequest((req, res) => {
  // Grab the text parameter.
  const msg = req.query.text;

  const mailOptions = {
    from: '"Rookie Digital" <noreply@rookiedigital.com>',
    to: 'casper.ru@gmail.com',
    subject: 'Test mail from form',
    text: msg,
  };
  
  mailTransport.sendMail(mailOptions)
  .then(res.send(`Email sent to ${msg}`))
  .catch(error => res.send(`There was an error while sending the email: ${error}`)) 
  return null;
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
