const functions = require('firebase-functions');

const nodemailer = require('nodemailer');
const cors = require('cors')({origin: true});

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
  if (req.method !== 'GET') {
    return res.status(403).send('Forbidden!');
  }

  return cors(req, res, () => {
    const msg = req.query.text;

    const mailOptions = {
      from: '"Rookie Digital"',
      to: ['casper.ru@gmail.com', 'yanevm@mail.ru'],
      subject: 'Писмо от контактната форма на rookiedigital.com',
      text: msg,
    };
  
    mailTransport.sendMail(mailOptions)
    .then(res.status(200).send(`Email sent to ${msg}`))
    .catch(error => res.status(400).send(`There was an error while sending the email: ${error}`)) 
    });
});