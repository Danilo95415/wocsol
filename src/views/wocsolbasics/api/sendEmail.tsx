import nodemailer from 'nodemailer';


export default function sendEmail(req, res) {
    const { name, email, phone, message } = req.body;
  
    const transporter = nodemailer.createTransport({
      host: 'smtp.stackmail.com', // Replace with your SMTP host
      port: 465, // Replace with your SMTP port
      secure: true,
      auth: {
        user: 'info@wocsol.com', // Replace with your email address
        pass: 'Mr@04042021' // Replace with your email password
      }
    });
  
    const mailOptions = {
      from: email,
      to: 'info@wocsol.com', // Replace with your email address
      subject: `New message from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Message: ${message}
      `
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).send('Something went wrong.');
      } else {
        console.log(`Email sent: ${info.response}`);
        res.status(200).send('Message sent successfully.');
      }
    });
  }
  