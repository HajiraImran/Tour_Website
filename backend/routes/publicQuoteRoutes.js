import express from "express";
import Quote from "../models/Quote.js";
import { sendEmail } from "../utils/sendEmail.js";

const router = express.Router();

router.post("/get-quote", async (req, res) => {
  try {
    const { name, email, tourId, tourTitle, travelDates, message } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name & Email required" });
    }

    const quote = await Quote.create({
      name,
      email,
      tourId,
      tourTitle,
      travelDates,
      message,
    });

    // ✅ Send email to admin
    const adminEmail = process.env.ADMIN_EMAIL;
    await sendEmail({
      to: adminEmail,
      subject: `New Quote Request: ${tourTitle}`,
      text: `You have received a new quote request.\n\nName: ${name}\nEmail: ${email}\nTour: ${tourTitle}\nTravel Dates: ${travelDates}\nMessage: ${message}`,
      html: `
        <h2>New Quote Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Tour:</strong> ${tourTitle}</p>
        <p><strong>Travel Dates:</strong> ${travelDates}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    res.status(201).json({ success: true, message: "Quote sent successfully", quote });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
