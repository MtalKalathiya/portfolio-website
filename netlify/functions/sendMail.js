const nodemailer = require("nodemailer");

exports.handler = async (event) => {
  try {
    // Parse the incoming form data
    const { name, email, message } = JSON.parse(event.body);

    // Set up email transporter
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "mitukalathiya@gmail.com", // Change this to your email
        pass: "fdlz ilny jsin knvo", // Generate an App Password from Google
      },
    });

    // Email options
    let mailOptions = {
      from: email,
      to: "mitukalathiya@gmail.com",
      subject: `New Contact Form Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email sent successfully!" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
