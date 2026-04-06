// file: apps/api/src/routes/analytics.ts
import { Router } from "express";
import { prisma } from "../db";
import { analyticsEventSchema } from "../utils/validators";

const ALLOWED_EVENTS = new Set([
  "draft_session_created",
  "draft_session_resumed",
  "draft_session_updated",
  "draft_finalize",
  "export_pdf",
  "advocate_request",
  "resume_link_requested"
]);

export const analyticsRouter = Router();

analyticsRouter.post("/events", async (req, res, next) => {
  try {
    const parsed = analyticsEventSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid analytics event", details: parsed.error.flatten() });
    }

    if (!ALLOWED_EVENTS.has(parsed.data.event)) {
      return res.status(400).json({ error: "Event not allowlisted" });
    }

    const event = await prisma.analyticsEvent.create({
      data: {
        event: parsed.data.event,
        payload: parsed.data.payload ?? null
      }
    });

    return res.status(201).json({ id: event.id });
  } catch (error) {
    return next(error);
  }
});
