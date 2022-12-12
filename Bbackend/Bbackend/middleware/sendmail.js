
var nodemailer = require('nodemailer');
const email = require('../config').get('staging').email;

export const sendemail=async(from,to,subject,text)=>{
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: email.user,
      pass: email.pass
    }
  });
  
  var mailOptions = {
    from: from,
    to: to,
    subject: subject,
    html: text
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        return false
    } else {
        console.log('Email sent: ' + info.response);
        return true
      
    }
  })
}
