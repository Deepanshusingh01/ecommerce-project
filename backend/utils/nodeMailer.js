const nodemailer = require('nodemailer')

const nodeMailer = (email,otp)=>{
    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'deepanshuthakur791@gmail.com',
            pass: "hlaqvssfwfyiedlc"
        },
        secure: true
    })
    mailOption = {
        from: 'ecommerce-project@gmail.com',
        to: `${email}`,
        subject: 'Recovering Password',
        text: `Follow the Instructions: use this otp ${otp} to generate new password `,
    }
    transport.sendMail(mailOption,(err,info)=>{
        if(err){
            console.log(err.message)
        } else {
            console.log(`message sent successfully`)
        }
    })
}

module.exports = {
    nodeMailer
}