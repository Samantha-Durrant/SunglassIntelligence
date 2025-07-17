import { MailService } from '@sendgrid/mail';

if (!process.env.SENDGRID_API_KEY) {
  console.warn("SENDGRID_API_KEY environment variable not set");
}

const mailService = new MailService();
if (process.env.SENDGRID_API_KEY) {
  mailService.setApiKey(process.env.SENDGRID_API_KEY);
}

interface EmailParams {
  to: string;
  from: string;
  subject: string;
  text?: string;
  html?: string;
}

export async function sendEmail(params: EmailParams): Promise<boolean> {
  try {
    if (!process.env.SENDGRID_API_KEY) {
      console.error("SendGrid API key not configured");
      return false;
    }

    await mailService.send({
      to: params.to,
      from: params.from,
      subject: params.subject,
      text: params.text,
      html: params.html,
    });
    return true;
  } catch (error) {
    console.error('SendGrid email error:', error);
    return false;
  }
}

export async function sendMarketReport(
  recipientEmail: string,
  reportContent: string,
  metrics: any
): Promise<boolean> {
  const subject = `SunglassMarket Weekly Analysis - ${new Date().toLocaleDateString()}`;
  const fromEmail = process.env.FROM_EMAIL || "reports@sunglassmarket.com";
  
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>SunglassMarket Analysis Report</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .header { background: #2563EB; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .metrics { background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0; }
        .footer { background: #f8f9fa; padding: 15px; text-align: center; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>SunglassMarket Analytics</h1>
        <p>Weekly Market Analysis Report</p>
      </div>
      <div class="content">
        <div class="metrics">
          <h3>Key Metrics</h3>
          <p><strong>Total Brands:</strong> ${metrics?.totalBrands || 'N/A'}</p>
          <p><strong>Market Size:</strong> $${metrics?.marketSize || 'N/A'}</p>
          <p><strong>Opportunities:</strong> ${metrics?.opportunities || 'N/A'}</p>
        </div>
        ${reportContent}
      </div>
      <div class="footer">
        <p>This report was generated automatically by SunglassMarket Analytics Platform</p>
        <p>© ${new Date().getFullYear()} SunglassMarket Analytics. All rights reserved.</p>
      </div>
    </body>
    </html>
  `;

  return await sendEmail({
    to: recipientEmail,
    from: fromEmail,
    subject: subject,
    html: htmlContent,
    text: reportContent.replace(/<[^>]*>/g, '') // Strip HTML for text version
  });
}
