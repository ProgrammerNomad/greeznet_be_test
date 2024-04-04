const nodemailer = require('nodemailer');

// Create a transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'akshat@mobrilz.com',
        pass: 'Mobrilz@1234!'
    }
});

// Define email options
const mailOptions = {
    from: 'akshat@mobrilz.com',
    to: receipent,
    subject: 'Test Email',
    text: 'This is a test email from Node.js using Gmail SMTP.'
};

// Send email
transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
        console.error('Error occurred while sending email:', error);
    } else {
        console.log('Email sent successfully:', info.response);
    }
});
