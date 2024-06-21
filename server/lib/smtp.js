import nodemailer from 'nodemailer';

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASSWORD,
  SMTP_ALLOW_UNAUTHORIZED,
} = process.env;

export const config = {
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_PORT === '465',
  // pool: true,
  maxConnections: 1,
  rateDelta: 86400000,
  rateLimit: 1000,
};

if (SMTP_USER && SMTP_PASSWORD) {
  config.auth = {
    user: SMTP_USER,
    pass: SMTP_PASSWORD,
  };
}

if (SMTP_ALLOW_UNAUTHORIZED) {
  config.tls = {
    rejectUnauthorized: false,
  };
}

const transports = {
  smtp: nodemailer.createTransport(config),
};

export default transports;
