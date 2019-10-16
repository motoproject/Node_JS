// const nodemailer = require('nodemailer');

// let transporter = nodemailer.createTransport({
//     host: '',
//     port: 465,
//     secure: true,
//     auth:{
//         user: '',
//         pass: ''
//     }
// });

// // transporter.use('compile', ehb({
// //     viewEngine: 'express-hnadlebars',
// //     viewPath: '../templates/'
// // }))

// let mailOptions = {
//     from: '',
//     to:'',
//     cc:'',
//     bcc:'',
//     subject:'',
//     text:'----',
//     attachments:[{

//     }],
//     template:'fileName without extention'
// }

// module.exports.EMAIL_with_template = transporter.sendMail(mailOptions, async (err, info)=>{
//     if(err){
//       console.log("\n--Email------err--"+err);        
//     }else{
//         console.log("\n-------SENT--EMAIL----");
//     }
// });

