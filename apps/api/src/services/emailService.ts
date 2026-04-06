// file: apps/api/src/services/emailService.ts
import nodemailer from "nodemailer";

type EmailConfig = {
  host: string;
  port: number;
  user: string;
  pass: string;
  from: string;
  fromName?: string;
  replyTo?: string;
  secure: boolean;
};

function readEmailConfig(): EmailConfig | null {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.EMAIL_FROM;
  const fromName = process.env.EMAIL_FROM_NAME;
  const replyTo = process.env.EMAIL_REPLY_TO;
  const secure =
    process.env.SMTP_SECURE !== undefined
      ? process.env.SMTP_SECURE === "true"
      : port === 465;

  if (!host || !port || !user || !pass || !from) {
    return null;
  }

  return { host, port, user, pass, from, fromName, replyTo, secure };
}

export class EmailService {
  private transporter: nodemailer.Transporter | null;
  private from: string | null;
  private replyTo: string | null;

  constructor() {
    const config = readEmailConfig();
    if (!config) {
      this.transporter = null;
      this.from = null;
      this.replyTo = null;
      return;
    }
    this.from = config.fromName ? `${config.fromName} <${config.from}>` : config.from;
    this.replyTo = config.replyTo ?? null;
    this.transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
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
    const subject = "Resume your Esheria will draft";
    const text = [
      "Hello,",
      "",
      "Use this secure link to resume your will draft:",
      link,
      "",
      "If you did not request this email, you can ignore it.",
      "",
      "Esheria Wills"
    ].join("\n");
    const html = `
      <div style="font-family: Arial, sans-serif; font-size: 14px; color: #1a1a1a;">
        <p>Hello,</p>
        <p>Use this secure link to resume your will draft:</p>
        <p><a href="${link}" target="_blank" rel="noopener noreferrer">${link}</a></p>
        <p>If you did not request this email, you can ignore it.</p>
        <p>Esheria Wills</p>
      </div>
    `;
    await this.transporter.sendMail({
      from: this.from,
      to,
      replyTo: this.replyTo ?? undefined,
      subject,
      text,
      html
    });
  }
}
