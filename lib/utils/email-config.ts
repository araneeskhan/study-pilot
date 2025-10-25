import { testEmailConnection } from "@/lib/utils/email";

export interface EmailConfigStatus {
  configured: boolean;
  smtpHost: string;
  smtpUser: string;
  smtpPort: number;
  connectionTested: boolean;
  connectionSuccessful: boolean;
  error?: string;
}

export async function checkEmailConfiguration(): Promise<EmailConfigStatus> {
  const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
  const smtpUser = process.env.SMTP_USER || '';
  const smtpPass = process.env.SMTP_PASS || '';
  const smtpPort = parseInt(process.env.SMTP_PORT || '587');

  // Check if basic configuration is present
  const configured = !!(smtpUser && smtpPass);

  if (!configured) {
    return {
      configured: false,
      smtpHost,
      smtpUser: smtpUser || 'Not configured',
      smtpPort,
      connectionTested: false,
      connectionSuccessful: false,
      error: 'SMTP_USER and/or SMTP_PASS not configured',
    };
  }

  // Test connection
  try {
    const connectionSuccessful = await testEmailConnection();
    return {
      configured: true,
      smtpHost,
      smtpUser,
      smtpPort,
      connectionTested: true,
      connectionSuccessful,
      error: connectionSuccessful ? undefined : 'Connection test failed',
    };
  } catch (error: any) {
    return {
      configured: true,
      smtpHost,
      smtpUser,
      smtpPort,
      connectionTested: true,
      connectionSuccessful: false,
      error: error.message,
    };
  }
}

export function getEmailConfigurationAdvice(): string[] {
  const advice: string[] = [];

  if (!process.env.SMTP_USER) {
    advice.push('Set SMTP_USER environment variable (your email address)');
  }

  if (!process.env.SMTP_PASS) {
    advice.push('Set SMTP_PASS environment variable (your email password or app-specific password)');
  }

  if (process.env.SMTP_HOST === 'smtp.gmail.com' || !process.env.SMTP_HOST) {
    advice.push('For Gmail: Use an App Password instead of your regular password');
    advice.push('Enable 2-factor authentication on your Gmail account');
    advice.push('Generate an app-specific password at: https://myaccount.google.com/apppasswords');
  }

  advice.push('Restart your development server after setting environment variables');

  return advice;
}