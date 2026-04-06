// file: apps/api/src/services/emailService.ts
import nodemailer from "nodemailer";

type EmailConfig = {
  host: string;
  port: number;
  user: string;
  pass: string;
  from: string;
};

function readEmailConfig(): EmailConfig | null {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.EMAIL_FROM;

  if (!host || !port || !user || !pass || !from) {
    return null;
  }

  return { host, port, user, pass, from };
}

export class EmailService {
  private transporter: nodemailer.Transporter | null;
  private from: string | null;

  constructor() {
    const config = readEmailConfig();
    if (!config) {
      this.transporter = null;
      this.from = null;
      return;
    }
    this.from = config.from;
    this.transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.port === 465,
      auth: {
        user: config.user,
        pass: config.pass
      }
    });
  }

  isConfigured() {
    return Boolean(this.transporter && this.from);
  }

  async sendResumeLink(to: string, link: string) {
    if (!this.transporter || !this.from) {
      throw new Error("Email service not configured");
    }
    await this.transporter.sendMail({
      from: this.from,
      to,
      subject: "Resume your will draft",
      text: `Use this secure link to resume your draft: ${link}`
    });
  }
}
