# HookahADK Deploy Guide (Project + Mail Server)

This guide describes how to deploy the HookahADK landing project and the mail server on a **new VPS**.

## 1) Server prerequisites
- Ubuntu 22.04/24.04
- DNS A records:
  - `adkk.kz` -> your VPS IP
  - `www.adkk.kz` -> your VPS IP
  - `mail.adkk.kz` -> your VPS IP

Install базовые пакеты:
```bash
apt-get update
apt-get install -y git curl ca-certificates
```

## 2) Install Node.js (for frontend/contact server)
```bash
apt-get install -y nodejs npm
```

## 3) Project structure on the new server
Copy the whole folder:
```
/root/hookahadk
```
It contains:
- `frontend` (Vite)
- `server/` (contact form backend)
- `mailserver/` (docker-mailserver)

## 4) Frontend (hookahadk)
Build the static site:
```bash
cd /root/hookahadk
npm install
cp .env.example .env
npm run build
```

The build output will be in `dist/`.

## 5) Contact backend (SMTP sender)
```bash
cd /root/hookahadk/server
npm install
cp .env.example .env
```

Edit `/root/hookahadk/server/.env`:
- `SMTP_HOST=mail.adkk.kz`
- `SMTP_PORT=465`
- `SMTP_USER=info@adkk.kz`
- `SMTP_PASS=your_password`
- `SMTP_FROM=info@adkk.kz`
- `MAIL_TO=info@adkk.kz`
- `CORS_ORIGIN=https://adkk.kz,https://www.adkk.kz`

Run:
```bash
npm run start
```

Optional: create a systemd service for auto-start.

## 6) Web server (Caddy) for HTTPS
Install Caddy:
```bash
apt-get install -y caddy
```

Create `/etc/caddy/Caddyfile`:
```
adkk.kz, www.adkk.kz {
  encode gzip zstd

  root * /root/hookahadk/dist
  file_server

  # Contact API
  reverse_proxy /api/contact 127.0.0.1:5050
}
```

Reload:
```bash
systemctl reload caddy
```

## 7) Mail server (docker-mailserver)
Install Docker/Podman (use your provider standard):
```bash
apt-get install -y docker.io docker-compose-plugin
```

Go to mailserver:
```bash
cd /root/hookahadk/mailserver
```

Create folders:
```bash
mkdir -p docker-data/dms/{mail-data,mail-state,mail-logs,config}
```

Prepare `mailserver.env`:
```
OVERRIDE_HOSTNAME=mail.adkk.kz
ENABLE_IMAP=1
ENABLE_POP3=1
ENABLE_CLAMAV=0
ENABLE_SPAMASSASSIN=0
ENABLE_FAIL2BAN=0
ENABLE_POSTGREY=0
ENABLE_RSPAMD=0
ONE_DIR=1
SSL_TYPE=letsencrypt
POSTMASTER_ADDRESS=postmaster@adkk.kz
TZ=Asia/Almaty
PERMIT_DOCKER=network
```

### TLS certificate for mail.adkk.kz
Stop Caddy temporarily if it binds 80:
```bash
systemctl stop caddy
```

Install and run certbot:
```bash
apt-get install -y certbot
certbot certonly --standalone -d mail.adkk.kz --non-interactive --agree-tos -m info@adkk.kz
```

Start Caddy again:
```bash
systemctl start caddy
```

### Start mailserver
```bash
docker compose up -d
```

Create mailbox:
```bash
docker compose exec -T mailserver setup email add info@adkk.kz 'YOUR_PASSWORD'
```

Generate DKIM:
```bash
docker compose exec -T mailserver setup config dkim domain 'adkk.kz'
```
The DKIM TXT value will be in:
```
/root/hookahadk/mailserver/docker-data/dms/config/opendkim/keys/adkk.kz/mail.txt
```

## 8) DNS records for mail
Add/Update:
- `MX`:
  - `adkk.kz. MX 10 mail.adkk.kz.`
- `A`:
  - `mail.adkk.kz -> VPS IP`
- `SPF`:
  - `v=spf1 ip4:YOUR_VPS_IP -all`
- `DKIM`:
  - `mail._domainkey.adkk.kz TXT <value from mail.txt>`
- `DMARC`:
  - `_dmarc.adkk.kz TXT v=DMARC1; p=none; rua=mailto:postmaster@adkk.kz; ruf=mailto:postmaster@adkk.kz; adkim=s; aspf=s; pct=100`

### PTR (Reverse DNS)
Ask VPS provider:
```
PTR  YOUR_VPS_IP -> mail.adkk.kz
```

## 9) Test SMTP
```bash
openssl s_client -connect mail.adkk.kz:465 -servername mail.adkk.kz -quiet </dev/null | head -n 1
```

## 10) End-to-end test (contact form)
Open `https://adkk.kz` and submit the form.
Check mailbox `info@adkk.kz`.

