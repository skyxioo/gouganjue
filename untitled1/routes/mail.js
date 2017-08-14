/**
 * Created by Administrator on 2017/6/14.
 */
var nodeMailer = require('nodemailer');
var user = '70558195@qq.com',
    pass = 'nyjptbipywtscaaa';
var transporter = nodeMailer.createTransport({
    host:'smtp.qq.com',
    secureConnection: true,
    port: 465,
    auth: {
        user:user,
        pass:pass
    }
});

var sendMail = function (to, title, content) {
    transporter.sendMail({
        from: '70558195@qq.com',
        to: to,
        subject: title,
        html: content
    }, function (err, res) {
        "use strict";
        console.log(res);
    });
};

module.exports = sendMail;