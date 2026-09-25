require("dotenv").config();
const http = require("http");

const PORT = process.env.PORT || 3000;
const APP_NAME = process.env.APP_NAME || "lab-node18";
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PASSWORD = process.env.DB_PASSWORD || "";
const API_KEY = process.env.API_KEY || "";

const server = http.createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "ok", uptime: process.uptime() }));
    return;
  }

  const maskedSecret = (val) => (val ? "***" + val.slice(-4) : "(not set)");

  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(`
    <h1>Hello World from ${APP_NAME}!</h1>
    <p>Node.js ${process.version} running on port ${PORT}</p>
    <hr>
    <h3>Environment Config</h3>
    <ul>
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
  console.log(`  DB_PASSWORD = ${DB_PASSWORD ? "***" + DB_PASSWORD.slice(-4) : "(not set)"}`);
  console.log(`  API_KEY = ${API_KEY ? "***" + API_KEY.slice(-4) : "(not set)"}`);
});
