'use strict';

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var transporter = _nodemailer2.default.createTransport({
    service: 'outlook',
    secure: false,
    port: 25,
    auth: {
        user: 'itunesjc@hotmail.com',
        pass: '415688.Jc'
    },
    tls: {
        rejectUnauthorized: false
    }
});

var setMailOptions = function setMailOptions(fromOne, to, subject, text, html) {
    var mailOptions = {
        from: fromOne,
        to: to,
        subject: subject,
        text: text,
        html: html
    };
    return mailOptions;
};

var sendMail = function sendMail(mailOptions) {

    transporter.sendMail(mailOptions, function (err, info) {
        if (err) console.log(err);
        console.log("Mensaje enviado correctamente");
    });
};

module.exports = {
    sendMail: sendMail,
    setMailOptions: setMailOptions
};