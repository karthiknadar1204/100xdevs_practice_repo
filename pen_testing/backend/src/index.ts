import express from 'express';
import cors from "cors";

const SECRET_KEY = "your_site_secret"; //secret key from cloudflare.

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

// Store OTPs in a simple in-memory object
// A simple object to temporarily store OTPs associated with email addresses.
const otpStore: Record<string, string> = {};

// Endpoint to generate and log OTP
// Request: Client sends an email address.
// Action:
// The server generates a 6-digit OTP.
// Stores the OTP in otpStore with the email address as the key.
// Logs the OTP to the console for debugging purposes.
// Response: The server sends a success message indicating that the OTP has been generated and logged.
app.post('/generate-otp', (req, res) => {
  console.log(req.body)
  const email = req.body.email;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // generates a 6-digit OTP
  otpStore[email] = otp;

  console.log(`OTP for ${email}: ${otp}`); // Log the OTP to the console
  res.status(200).json({ message: "OTP generated and logged" });
});



// Endpoint to reset password
// Request: Client sends an email, OTP, new password, and a reCAPTCHA token.
// Action:
// The server verifies the reCAPTCHA token by sending it to Cloudflare's verification endpoint along with a secret key.
// Checks if the reCAPTCHA verification is successful.
// If successful, it checks if the provided OTP matches the stored OTP for the email address.
// If the OTP is correct, it simulates a password reset by logging the new password to the console and clears the OTP from otpStore.
// Response:
// If reCAPTCHA fails, it returns a "403 Forbidden" response.
// If OTP is invalid or missing required fields, it returns "400 Bad Request".
// If OTP is valid and password reset is successful, it returns a "200 OK" response.
app.post('/reset-password', async (req, res) => {
  const { email, otp, newPassword, token } = req.body;
  console.log(token);

  let formData = new FormData();
	formData.append('secret', SECRET_KEY);
	formData.append('response', token);

  const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
	const result = await fetch(url, {
		body: formData,
		method: 'POST',
	});
  const challengeSucceeded = (await result.json()).success;

  if (!challengeSucceeded) {
    return res.status(403).json({ message: "Invalid reCAPTCHA token" });
  }

  if (!email || !otp || !newPassword) {
    return res.status(400).json({ message: "Email, OTP, and new password are required" });
  }
  if (Number(otpStore[email]) === Number(otp)) {
    console.log(`Password for ${email} has been reset to: ${newPassword}`);
    delete otpStore[email]; // Clear the OTP after use
    res.status(200).json({ message: "Password has been reset successfully" });
  } else {
    res.status(401).json({ message: "Invalid OTP" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

