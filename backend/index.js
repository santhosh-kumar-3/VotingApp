const express = require("express");
const cors = require("cors");
const twilio = require("twilio");
require("dotenv").config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

let otpStore = {};

app.post("/send-otp", async (req, res) => {
  const { phoneNumber } = req.body;
  const otp = Math.floor(1000 + Math.random() * 9000);

  try {
    await client.messages.create({
      body: `Your VotingApp OTP is ${otp}. Please enter this code to complete your login. The code is valid for 5 minutes. Do not share it with anyone.`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber,
    });

    otpStore[phoneNumber] = otp.toString();
    console.log(`OTP for ${phoneNumber} is ${otp}`);
    res.json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
});

app.post("/verify-otp", (req, res) => {
  const { phoneNumber, otp } = req.body;
  if (otpStore[phoneNumber] === otp) {
    delete otpStore[phoneNumber];
    return res.json({ success: true, message: "OTP verified" });
  }
  res.status(400).json({ success: false, message: "Invalid OTP" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
