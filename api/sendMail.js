const nodemailer = require("nodemailer");

// Vercel serverless function: POST /api/sendMail
module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Vercel parses JSON bodies automatically
    const { name, company, email, phone, message } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email and message are required." });
    }

    // Set up email transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Gmail App Password
      },
    });

    // Email options: Gmail always sends from the logged-in account,
    // so the visitor's address goes in replyTo
    const mailOptions = {
      from: `"Mital Portfolio" <${process.env.EMAIL_USER}>`,
      replyTo: email,
      to: process.env.EMAIL_USER,
      subject: `New Contact Form Message from ${name}`,
      text: `
        Name: ${name}
        Company: ${company || "N/A"}
        Email: ${email}
        Phone: ${phone || "N/A"}
        Message: ${message}`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
