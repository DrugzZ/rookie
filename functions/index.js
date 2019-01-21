const functions = require('firebase-functions');

const nodemailer = require('nodemailer');
const cors = require('cors')({
  "origin": true,
  "methods": "POST",
});

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
  return cors(req, res, () => {
    const msg = req.body.text;
    
    const mailOptions = {
      from: '"Rookie Digital"',
      to: ['casper.ru@gmail.com'],
      subject: 'Писмо от контактната форма на rookiedigital.com',
      text: msg,
    };
  
    mailTransport.sendMail(mailOptions)
    .then(res.sendStatus(200))
    .catch(error => res.status(400).send(`There was an error while sending the email: ${error}`)) 
  
  });
});