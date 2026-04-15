// file: apps/api/src/app.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import pinoHttp from "pino-http";
import { willsRouter } from "./routes/wills";
import { draftSessionsRouter } from "./routes/draftSessions";
import { aiRouter } from "./routes/ai";
import { analyticsRouter } from "./routes/analytics";
import { healthRouter } from "./routes/health";

dotenv.config();

export const app = express();

app.use(pinoHttp());
app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/", (_req, res) => {
  if (shouldServeWeb && hasWebDist) {
    res.sendFile(path.join(webDistDir, "index.html"));
    return;
  }
  res.json({ status: "ok", service: "esheria-wills-api" });
});

app.use("/api/v1/wills", willsRouter);
app.use("/api/v1/draft-sessions", draftSessionsRouter);
app.use("/api/v1/ai", aiRouter);
app.use("/api/v1/analytics", analyticsRouter);
app.use("/health", healthRouter);

const webDistDir = process.env.WEB_DIST_DIR
  ? path.resolve(process.env.WEB_DIST_DIR)
  : path.resolve(process.cwd(), "..", "web", "dist");
const hasWebDist = fs.existsSync(webDistDir);
const shouldServeWeb =
  process.env.SERVE_WEB === "true" ||
  (process.env.NODE_ENV === "production" && hasWebDist);

if (shouldServeWeb && hasWebDist) {
  app.use(express.static(webDistDir));
  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api/") || req.path === "/health") {
      return next();
    }
    res.sendFile(path.join(webDistDir, "index.html"));
  });
}

app.use((
  err: unknown,
  _req: express.Request,
  res: express.Response,
  _next: express.NextFunction
) => {
  void _next;
  console.error(err);
  const isProd = process.env.NODE_ENV === "production";
  const details = err instanceof Error ? err.message : undefined;
  res.status(500).json({
    error: "Internal server error",
    ...(isProd ? {} : { details })
  });
});
