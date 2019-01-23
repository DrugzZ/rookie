const functions = require('firebase-functions');

const nodemailer = require('nodemailer');
const cors = require('cors')({
  "origin": 'https://rookiedigital.com',
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
      from: 'Rookie Digital <reachroutrookie@gmail.com>',
      to: ['rumen@rookiemedia.net'],
      subject: 'От контактната форма на rookiedigital.com',
      text: `Посоченият адрес иска да се свърже с вас: ${msg}`,
    };
  
    mailTransport.sendMail(mailOptions)
    .then(info => {
      console.log('Message sent: ' + info.response);
      res.sendStatus(200)
    })
    .catch(error => {
      console.log(error);
      res.status(403).send('There was an error while sending the email')
    })
  });
});