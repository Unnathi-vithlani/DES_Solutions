# DES Solutions v3 — Full Website

## 📁 Pages Included
| Page | File |
|------|------|
| Home | index.html |
| About | about.html |
| Services | services.html |
| Products | products.html |
| Trainings | trainings.html |
| Markets | markets.html |
| Success Stories | success-stories.html |
| News | news.html |
| Careers | careers.html |
| Contact | contact.html |

## ✨ Features
- **Day / Night theme toggle** (☀️ / 🌙) — persists across pages via localStorage
- **Fonts:** Playfair Display (headings) + Plus Jakarta Sans (body) + Fira Code (mono/labels)
- Animated counters, scroll reveals, hero parallax
- Fully responsive (mobile / tablet / desktop)
- Tab system on Markets page
- Working contact form with success state
- Zero npm dependencies — pure HTML/CSS/JS

---

## 🚀 Run Locally with HTTPS

### Requirements
- **Node.js** v14 or later
- **OpenSSL** (pre-installed on macOS and most Linux; included with Git for Windows)

### Quick Start (Self-Signed Cert — one browser warning)

```bash
# 1. Navigate into the project folder
cd des-solutions-website

# 2. Start the server (auto-generates SSL cert on first run)
node server.js

# 3. Open your browser
#    → https://localhost:3443
```

> **First visit:** Your browser shows "Your connection is not private."  
> Click **Advanced** → **Proceed to localhost (unsafe)**  
> This is expected and safe — the cert is locally generated, not CA-signed.

---

## 🔒 Fully Trusted HTTPS (No Warning) — Recommended

Use **mkcert** to create a locally trusted certificate authority.  
Takes about 2 minutes. Works on macOS, Windows, and Linux.

### macOS
```bash
# Install mkcert
brew install mkcert

# Install local CA (one-time — you'll be prompted for your password)
mkcert -install

# Generate cert for localhost
cd des-solutions-website
mkdir .ssl && cd .ssl
mkcert localhost
cd ..

# Rename to match what server.js expects
mv .ssl/localhost.pem .ssl/cert.pem
mv .ssl/localhost-key.pem .ssl/key.pem

# Start the server
node server.js
# → https://localhost:3443  (no warning!)
```

### Windows (PowerShell — requires Chocolatey)
```powershell
# Install mkcert
choco install mkcert

# Install local CA
mkcert -install

# Navigate to project and generate cert
cd des-solutions-website
mkdir .ssl
cd .ssl
mkcert localhost
cd ..

# Rename files
Rename-Item .ssl\localhost.pem .ssl\cert.pem
Rename-Item .ssl\localhost-key.pem .ssl\key.pem

# Start server
node server.js
```

### Windows (without Chocolatey)
1. Download mkcert.exe from: https://github.com/FiloSottile/mkcert/releases
2. Place it somewhere in your PATH (e.g. `C:\Windows\System32\`)
3. Open Command Prompt as Administrator:
   ```
   mkcert -install
   ```
4. Navigate to project, then:
   ```
   mkdir .ssl
   cd .ssl
   mkcert localhost
   cd ..
   rename .ssl\localhost.pem .ssl\cert.pem
   rename .ssl\localhost-key.pem .ssl\key.pem
   node server.js
   ```

### Ubuntu / Debian / Linux
```bash
# Install dependencies
sudo apt install libnss3-tools curl -y

# Download mkcert
curl -JLO "https://dl.filippo.io/mkcert/latest?for=linux/amd64"
chmod +x mkcert-v*-linux-amd64
sudo mv mkcert-v*-linux-amd64 /usr/local/bin/mkcert

# Install local CA
mkcert -install

# Generate cert
cd des-solutions-website
mkdir .ssl && cd .ssl
mkcert localhost
cd ..

# Rename files
mv .ssl/localhost.pem .ssl/cert.pem
mv .ssl/localhost-key.pem .ssl/key.pem

# Start server
node server.js
# → https://localhost:3443
```

---

## 🛠️ Port Configuration

Default ports: **HTTPS → 3443**, **HTTP redirect → 3080**

To change ports, open `server.js` and edit:
```js
const PORT      = 3443;   // ← HTTPS port
const HTTP_PORT = 3080;   // ← HTTP redirect port
```

---

## 📂 Project Structure

```
des-solutions-website/
├── index.html
├── about.html
├── services.html
├── products.html
├── trainings.html
├── markets.html
├── success-stories.html
├── news.html
├── careers.html
├── contact.html
├── server.js          ← Local HTTPS server (no npm needed)
├── README.md
├── css/
│   └── style.css      ← Full two-theme stylesheet
├── js/
│   ├── layout.js      ← Header/footer/nav injector
│   └── main.js        ← Theme toggle, counters, tabs, form
└── .ssl/              ← Auto-generated SSL certs (gitignore this!)
    ├── cert.pem
    └── key.pem
```

---

## 🎨 Customization

### Replacing placeholder data
- **Phone/email:** Edit in `js/layout.js` (footer) and `contact.html`
- **Statistics:** Edit `data-count` attributes in HTML files
- **Logo:** Replace the SVG in `js/layout.js` (`.logo-icon`)

### Changing theme default
In each `.html` file, change `<html data-theme="dark">` to `<html data-theme="light">` for light as default.

### In `js/main.js`:
```js
const savedTheme = localStorage.getItem('des-theme') || 'dark'; // change 'dark' to 'light'
```

---

## ✅ No Copyright Issues
- All images: **Unsplash** (free for commercial use, no attribution required)
- Fonts: **Google Fonts** (SIL Open Font License — free)
- All content: original, written specifically for DES Solutions
- Zero copied code or assets from Enero Solutions or any other company
