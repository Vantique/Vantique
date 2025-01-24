const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// Route to handle subscription
app.post("/subscribe", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    // Set up Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail", // or any other email provider
      auth: {
        user: "your-email@gmail.com", // Replace with your email
        pass: "your-email-password", // Replace with your email password
      },
    });

    // Email options
    const mailOptions = {
      from: "your-email@gmail.com",
      to: "your-email@gmail.com", // Replace with your recipient email
      subject: "New Newsletter Subscription",
      text: `New subscriber email: ${email}`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Subscription successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
