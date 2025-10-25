import nodemailer from 'nodemailer';

// Email configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Email templates
export const emailTemplates = {
  verifyEmail: (name: string, token: string) => ({
    subject: 'Verify your email address',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Welcome to StudyPilot!</h2>
        <p>Hi ${name},</p>
        <p>Thank you for registering with StudyPilot. Please verify your email address by clicking the button below:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.NEXT_PUBLIC_SITE_URL}/verify-email?token=${token}" 
             style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Verify Email
          </a>
        </div>
        <p>Or copy and paste this link into your browser:</p>
        <p style="word-break: break-all; color: #007bff;">${process.env.NEXT_PUBLIC_SITE_URL}/verify-email?token=${token}</p>
        <p>This verification link will expire in 24 hours.</p>
        <p>If you didn't create this account, please ignore this email.</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
        <p style="color: #666; font-size: 12px;">Best regards,<br>The StudyPilot Team</p>
      </div>
    `,
  }),

  passwordReset: (name: string, token: string) => ({
    subject: 'Reset your password',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Password Reset Request</h2>
        <p>Hi ${name},</p>
        <p>We received a request to reset your password. Click the button below to reset it:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.NEXT_PUBLIC_SITE_URL}/reset-password?token=${token}" 
             style="background-color: #dc3545; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Reset Password
          </a>
        </div>
        <p>Or copy and paste this link into your browser:</p>
        <p style="word-break: break-all; color: #dc3545;">${process.env.NEXT_PUBLIC_SITE_URL}/reset-password?token=${token}</p>
        <p>This password reset link will expire in 1 hour.</p>
        <p>If you didn't request this password reset, please ignore this email.</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
        <p style="color: #666; font-size: 12px;">Best regards,<br>The StudyPilot Team</p>
      </div>
    `,
  }),

  welcomeEmail: (name: string) => ({
    subject: 'Welcome to StudyPilot!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Welcome to StudyPilot!</h2>
        <p>Hi ${name},</p>
        <p>Your account has been successfully verified. Welcome to StudyPilot!</p>
        <p>You can now access all features of our platform:</p>
        <ul style="color: #666;">
          <li>Access your personalized dashboard</li>
          <li>Track your study progress</li>
          <li>Join study groups</li>
          <li>Access premium content</li>
        </ul>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.NEXT_PUBLIC_SITE_URL}/dashboard" 
             style="background-color: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Go to Dashboard
          </a>
        </div>
        <p>If you have any questions, feel free to contact our support team.</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
        <p style="color: #666; font-size: 12px;">Best regards,<br>The StudyPilot Team</p>
      </div>
    `,
  }),
};

// Send email function
interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

export async function sendEmail({ to, subject, html, from }: EmailOptions): Promise<void> {
  try {
    const mailOptions = {
      from: from || process.env.SMTP_FROM || process.env.SMTP_USER,
      to,
      subject,
      html,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully to ${to}`);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
}

// Test email connection
export async function testEmailConnection(): Promise<boolean> {
  try {
    await transporter.verify();
    console.log('Email service connection verified');
    return true;
  } catch (error) {
    console.error('Email service connection failed:', error);
    return false;
  }
}