import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 5050;

const corsOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map((value) => value.trim())
  : true;

app.set("trust proxy", 1);
app.use(helmet());
app.use(express.json({ limit: "1mb" }));
app.use(
  cors({
    origin: corsOrigins,
    credentials: false,
  })
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 60,
});
app.use(limiter);

function createTransport() {
  const host = process.env.SMTP_HOST;
  const portValue = Number(process.env.SMTP_PORT || 0);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const servername = process.env.SMTP_SERVERNAME;

  if (!host || !portValue || !user || !pass) {
    return null;
  }

  const secureEnv = process.env.SMTP_SECURE;
  const secure = secureEnv ? secureEnv === "true" : portValue === 465;

  return nodemailer.createTransport({
    host,
    port: portValue,
    secure,
    auth: { user, pass },
    tls: servername ? { servername } : undefined,
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,
  });
}

function validatePayload(payload) {
  if (!payload) return "Invalid payload";
  const { orgName, email, phone, message } = payload;
  if (!orgName || orgName.trim().length < 2) return "Organization name is required";
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return "Valid email is required";
  if (!phone || phone.trim().length < 6) return "Phone is required";
  if (!message || message.trim().length < 3) return "Message is required";
  return null;
}

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/contact", async (req, res) => {
  const error = validatePayload(req.body);
  if (error) {
    return res.status(400).json({ error });
  }

  const transporter = createTransport();
  if (!transporter) {
    return res.status(500).json({ error: "SMTP is not configured" });
  }

  const to = process.env.MAIL_TO;
  const from = process.env.SMTP_FROM || process.env.SMTP_USER;
  if (!to || !from) {
    return res.status(500).json({ error: "MAIL_TO or SMTP_FROM is not configured" });
  }

  const { orgName, email, phone, message } = req.body;

  try {
    await transporter.sendMail({
      from,
      to,
      subject: "Новая заявка с сайта",
      text: `Организация: ${orgName}\nEmail: ${email}\nТелефон: ${phone}\nСообщение: ${message}`,
      replyTo: email,
    });

    return res.json({ status: "sent" });
  } catch (sendError) {
    console.error("Contact form send failed", sendError);
    return res.status(500).json({ error: "Failed to send message" });
  }
});

app.listen(port, () => {
  console.log(`Contact server listening on ${port}`);
});
