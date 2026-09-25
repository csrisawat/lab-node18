require("dotenv").config();
const http = require("http");
const crypto = require("crypto");

const PORT = process.env.PORT || 3000;
const APP_NAME = process.env.APP_NAME || "lab-node18";
const APP_ENV = process.env.APP_ENV || "local";
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PASSWORD = process.env.DB_PASSWORD || "";
const API_KEY = process.env.API_KEY || "";

// Never print a secret. Show only whether it is set plus a short SHA-256
// fingerprint, so a rotation can be verified without revealing the value.
const maskedSecret = (val) =>
  val
    ? "set (sha256:" + crypto.createHash("sha256").update(val).digest("hex").slice(0, 8) + ")"
    : "(not set)";

const server = http.createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "ok", uptime: process.uptime() }));
    return;
  }

  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(`
    <h1>Hello World from ${APP_NAME}!</h1>
    <p>Node.js ${process.version} running on port ${PORT}</p>
    <hr>
    <h3>Environment Config</h3>
    <ul>
      <li><b>APP_ENV:</b> ${APP_ENV}</li>
      <li><b>APP_NAME:</b> ${APP_NAME}</li>
      <li><b>DB_HOST:</b> ${DB_HOST}</li>
      <li><b>DB_PASSWORD:</b> ${maskedSecret(DB_PASSWORD)}</li>
      <li><b>API_KEY:</b> ${maskedSecret(API_KEY)}</li>
    </ul>
  `);
});

server.listen(PORT, () => {
  console.log(`[${APP_NAME}] Server running on port ${PORT}`);
  console.log(`  DB_HOST = ${DB_HOST}`);
  console.log(`  APP_ENV = ${APP_ENV}`);
  console.log(`  DB_PASSWORD = ${maskedSecret(DB_PASSWORD)}`);
  console.log(`  API_KEY = ${maskedSecret(API_KEY)}`);
});
