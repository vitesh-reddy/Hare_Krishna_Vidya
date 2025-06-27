import { brevoTransporter } from "../config/brevoMailConfig.js";

export const sendResetEmail = async (to, url) => {
  await brevoTransporter.sendMail({
    from: `"Hare Krishna Vidya" <${process.env.BREVO_SMTP_FROM_MAIL}>`,
    to: to,
    subject: "Reset Your Password - Hare Krishna Vidya",
    html: `
    <div style="background: linear-gradient(135deg, #FFF7ED, #FEF3C7, #FEF9C3); padding: 2rem; border-radius: 12px; font-family: 'Segoe UI', sans-serif; color: #1F2937;">
      <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 12px; box-shadow: 0 5px 20px rgba(0,0,0,0.1); padding: 2rem;">
        <h1 style="color: #F97316; margin-bottom: 0.5rem;">Reset Your Password</h1>
        <p style="color: #4B5563; font-size: 15px; line-height: 1.6;"> You're receiving this email because a password reset was requested for your <strong>Hare Krishna Vidya</strong> admin account. </p>
        <div style="text-align: center; margin: 2rem 0;">
          <a href="${url}" style="display: inline-block; margin: 1.5rem 0; padding: 0.75rem 1.5rem; background: #F97316; color: #ffffff; text-align:center; text-decoration: none; border-radius: 6px; font-weight: bold;"> Reset Password </a>
        </div>
        <p style="color: #6B7280; font-size: 14px;"> This link is valid for 1 hour. If you did not request a password reset, you can safely ignore this message. </p>
        <hr style="margin: 2rem 0; border: none; border-top: 1px solid #E5E7EB;" />
        <footer style="font-size: 12px; color: #9CA3AF; text-align: center;"> © 2025 Hare Krishna Vidya. All rights reserved. <br /> Spreading Education & Values through Service </footer>
      </div>
    </div>
    `,
  });
};
