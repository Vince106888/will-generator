// file: apps/api/src/routes/health.ts
import { Router } from "express";
import { prisma } from "../db";

export const healthRouter = Router();

healthRouter.get("/live", (_req, res) => {
  res.json({ status: "ok" });
});

healthRouter.get("/ready", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: "ready" });
  } catch (error) {
    res.status(503).json({ status: "not_ready" });
  }
});
