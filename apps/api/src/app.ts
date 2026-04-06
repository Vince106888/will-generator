// file: apps/api/src/app.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pinoHttp from "pino-http";
import { willsRouter } from "./routes/wills";

dotenv.config();

export const app = express();

app.use(pinoHttp());
app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/", (_req, res) => {
  res.json({ status: "ok", service: "esheria-wills-api" });
});

app.use("/api/v1/wills", willsRouter);

app.use((err: unknown, _req: express.Request, res: express.Response) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});
