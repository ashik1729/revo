import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import type { ContactFormData, InquiryType } from "@/lib/api/contact";
import { getDb } from "@/lib/db";

const recipientEmail = process.env.MAIL_TO || "info@realpackpackaging.com";

type EmailConfig = {
  host: string;
  port: number;
  user: string;
  pass: string;
  secure: boolean;
  from: string;
};

function getEmailConfig(): EmailConfig {
  const host = process.env.SMTP_HOST;
  const portValue = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.MAIL_FROM;

  if (!host || !portValue || !user || !pass || !from) {
    throw new Error("Missing SMTP configuration");
  }

  const port = Number(portValue);

  if (!Number.isFinite(port)) {
    throw new Error("Invalid SMTP port");
  }

  return {
    host,
    port,
    user,
    pass,
    from,
    secure: port === 465,
  };
}

function sanitize(value: unknown): string {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

function parseBody(body: unknown): ContactFormData | null {
  if (!body || typeof body !== "object") {
    return null;
  }

  const payload = body as Record<string, unknown>;
  const inquiryType = sanitize(payload.inquiryType) as InquiryType;

  if (inquiryType !== "Product" && inquiryType !== "Service") {
    return null;
  }

  return {
    fullName: sanitize(payload.fullName),
    email: sanitize(payload.email),
    phone: sanitize(payload.phone),
    inquiryType,
    specificItem: sanitize(payload.specificItem),
    message: sanitize(payload.message),
  };
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function toHtml(form: ContactFormData): string {
  return `
    <h2>New Contact Inquiry</h2>
    <p><strong>Full Name:</strong> ${escapeHtml(form.fullName)}</p>
    <p><strong>Email:</strong> ${escapeHtml(form.email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(form.phone || "Not provided")}</p>
    <p><strong>Inquiry Type:</strong> ${escapeHtml(form.inquiryType)}</p>
    <p><strong>Specific Product / Service:</strong> ${escapeHtml(form.specificItem || "Not selected")}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(form.message || "No message provided")}</p>
  `;
}

function toText(form: ContactFormData): string {
  return [
    "New Contact Inquiry",
    "",
    `Full Name: ${form.fullName}`,
    `Email: ${form.email}`,
    `Phone: ${form.phone || "Not provided"}`,
    `Inquiry Type: ${form.inquiryType}`,
    `Specific Product / Service: ${form.specificItem || "Not selected"}`,
    "",
    "Message:",
    form.message || "No message provided",
  ].join("\n");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const form = parseBody(body);

    if (!form || !form.fullName || !form.email || !isValidEmail(form.email)) {
      return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
    }

    const db = getDb();
    if (db) {
      try {
        await db.inquiry.create({
          data: {
            fullName: form.fullName,
            email: form.email,
            phone: form.phone || null,
            inquiryType: form.inquiryType,
            specificItem: form.specificItem || null,
            message: form.message || null,
          },
        });
      } catch (error) {
        console.error("Unable to store inquiry in database", error);
      }
    }

    const config = getEmailConfig();
    const transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: {
        user: config.user,
        pass: config.pass,
      },
    });

    await transporter.sendMail({
      from: config.from,
      to: recipientEmail,
      replyTo: form.email,
      subject: `Realpack Website Inquiry - ${form.inquiryType}`,
      text: toText(form),
      html: toHtml(form),
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("Contact form submission error", error);
    return NextResponse.json({ error: "Unable to send message" }, { status: 500 });
  }
}
