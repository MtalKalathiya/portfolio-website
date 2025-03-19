const nodemailer = require("nodemailer");

exports.handler = async (event) => {
  try {
    // Parse the incoming form data
    const { name, company, email, phone, message } = JSON.parse(event.body);

    // Set up email transporter
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Change this to your email
        pass: process.env.EMAIL_PASS, // Generate an App Password from Google
      },
    });

    // Email options
    let mailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: `New Contact Form Message from ${name}`,
      text: `
        Name: ${name}
        Company: ${company || "N/A"}
        Email: ${email}
        Phone: ${phone}
        Message: ${message}`,
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
