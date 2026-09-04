import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3000;
const startTime = Date.now();

// US-8: basic request logging (structured console logs act as the log sink here;
// in a real deployment these would be shipped to a log aggregator).
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const durationMs = Date.now() - start;
    console.log(JSON.stringify({
      level: "info",
      msg: "request",
      method: req.method,
      path: req.path,
      status: res.statusCode,
      durationMs,
      time: new Date().toISOString(),
    }));
  });
  next();
});

// US-7: health endpoint for uptime/monitoring checks.
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    uptimeSeconds: Math.round((Date.now() - startTime) / 1000),
    timestamp: new Date().toISOString(),
  });
});

app.use(express.static(path.join(__dirname, "public")));

// US-8: centralized error logging + safe error response (never leaks stack traces).
app.use((err, req, res, next) => {
  console.error(JSON.stringify({
    level: "error",
    msg: err.message,
    path: req.path,
    time: new Date().toISOString(),
  }));
  res.status(500).json({ status: "error", message: "Internal server error" });
});

// Only bind to a port when this file is run directly (`node server.js`), not
// when it's imported — by tests (supertest) or by a serverless platform like
// Vercel, which invokes the exported `app` as a request handler instead of
// calling listen() itself. Sprint 2 retro flagged listening-at-import as tech
// debt because it forced tests to bind a real port; this removes that.
const isMain = process.argv[1] && path.resolve(process.argv[1]) === __filename;
if (isMain) {
  app.listen(PORT, () => {
    console.log(JSON.stringify({ level: "info", msg: "server_started", port: PORT }));
  });
}

export default app;
