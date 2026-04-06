// file: apps/api/src/routes/wills.ts
import { Router } from "express";
import { WillService } from "../services/willService";
import { LeadService } from "../services/leadService";
import { DraftSessionService } from "../services/draftSessionService";
import { ensureDraftVersionPdf, ensureWillPdf } from "../engines/outputEngine";
import {
  advocateReviewRequestSchema,
  draftSessionIdParamSchema,
  leadSchema,
  willGenerateSchema,
  willIdParamSchema
} from "../utils/validators";

export const willsRouter = Router();

const willService = new WillService();
const leadService = new LeadService();
const draftSessionService = new DraftSessionService();

willsRouter.post("/generate", async (req, res, next) => {
  try {
    const parsed = willGenerateSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        error: "Invalid input",
        details: parsed.error.flatten()
      });
    }

    const { leadEmail, ...input } = parsed.data;
    const result = await willService.generate(input, leadEmail);

    return res.status(201).json(result);
  } catch (error) {
    if (error instanceof Error && error.message === "Draft consistency blocking issues") {
      const details = (error as Error & { details?: unknown }).details;
      return res.status(422).json({
        error: "Draft consistency issues must be resolved before generation",
        draftConsistency: details ?? null
      });
    }
    return next(error);
  }
});

willsRouter.get("/session/:id", async (req, res, next) => {
  try {
    const parsed = draftSessionIdParamSchema.safeParse(req.params);
    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid session id" });
    }

    const latest = await willService.getLatestBySession(parsed.data.id);
    if (!latest) {
      return res.status(404).json({ error: "No generated draft for this session" });
    }

    return res.json({
      sessionId: parsed.data.id,
      version: latest.version,
      draft: latest.generatedDraft,
      complexity: latest.complexityResult,
      validity: latest.validityResult,
      willId: latest.willProfileId ?? latest.willProfile?.id ?? null
    });
  } catch (error) {
    return next(error);
  }
});

willsRouter.get("/session/:id/pdf", async (req, res, next) => {
  try {
    const parsed = draftSessionIdParamSchema.safeParse(req.params);
    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid session id" });
    }

    const latest = await willService.getLatestBySession(parsed.data.id);
    if (!latest) {
      return res.status(404).json({ error: "No generated draft for this session" });
    }

    const downloadName = `will-${parsed.data.id}-v${latest.version}.pdf`;
    const filePath = await ensureDraftVersionPdf(
      latest.generatedDraft,
      parsed.data.id,
      latest.version
    );

    return res.download(filePath, downloadName, (err) => {
      if (err) {
        return next(err);
      }
      return undefined;
    });
  } catch (error) {
    return next(error);
  }
});

willsRouter.post("/session/:id/advocate-review-requests", async (req, res, next) => {
  try {
    const params = draftSessionIdParamSchema.safeParse(req.params);
    if (!params.success) {
      return res.status(400).json({ error: "Invalid session id" });
    }
    const body = advocateReviewRequestSchema.safeParse(req.body);
    if (!body.success) {
      return res.status(400).json({ error: "Invalid request", details: body.error.flatten() });
    }

    const resumeToken = req.header("x-draft-token") || undefined;
    const sessionResult = await draftSessionService.getSession(params.data.id, resumeToken);
    if (!sessionResult) {
      return res.status(404).json({ error: "Draft session not found" });
    }
    if ("forbidden" in sessionResult) {
      return res.status(403).json({ error: "Invalid resume token" });
    }

    const latest = await willService.getLatestBySession(params.data.id);
    const request = await leadService.captureAdvocateReview({
      draftSessionId: params.data.id,
      willDraftVersionId: latest?.id ?? null,
      contactName: body.data.contactName ?? null,
      contactEmail: body.data.contactEmail,
      contactPhone: body.data.contactPhone ?? null,
      notes: body.data.notes ?? null
    });

    return res.status(201).json({
      requestId: request.id,
      status: request.status,
      createdAt: request.createdAt
    });
  } catch (error) {
    return next(error);
  }
});

willsRouter.get("/session/:id/advocate-review-requests/:requestId", async (req, res, next) => {
  try {
    const params = draftSessionIdParamSchema.safeParse({ id: req.params.id });
    if (!params.success) {
      return res.status(400).json({ error: "Invalid session id" });
    }
    if (!req.params.requestId) {
      return res.status(400).json({ error: "Invalid request id" });
    }

    const resumeToken = req.header("x-draft-token") || undefined;
    const sessionResult = await draftSessionService.getSession(params.data.id, resumeToken);
    if (!sessionResult) {
      return res.status(404).json({ error: "Draft session not found" });
    }
    if ("forbidden" in sessionResult) {
      return res.status(403).json({ error: "Invalid resume token" });
    }

    const request = await leadService.getAdvocateReviewRequest(
      req.params.requestId,
      params.data.id
    );
    if (!request) {
      return res.status(404).json({ error: "Review request not found" });
    }

    return res.json({
      requestId: request.id,
      status: request.status,
      createdAt: request.createdAt,
      contactEmail: request.contactEmail,
      contactName: request.contactName,
      notes: request.notes
    });
  } catch (error) {
    return next(error);
  }
});

willsRouter.get("/:id/pdf", async (req, res, next) => {
  try {
    const parsed = willIdParamSchema.safeParse(req.params);
    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid id" });
    }

    const will = await willService.getById(parsed.data.id);
    if (!will) {
      return res.status(404).json({ error: "Will not found" });
    }

    const downloadName = `will-${will.id}.pdf`;
    const filePath = await ensureWillPdf(will.draft, will.id);

    return res.download(filePath, downloadName, (err) => {
      if (err) {
        return next(err);
      }
      return undefined;
    });
  } catch (error) {
    return next(error);
  }
});

willsRouter.get("/:id", async (req, res, next) => {
  try {
    const parsed = willIdParamSchema.safeParse(req.params);
    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid id" });
    }

    const will = await willService.getById(parsed.data.id);
    if (!will) {
      return res.status(404).json({ error: "Will not found" });
    }

    return res.json(will);
  } catch (error) {
    return next(error);
  }
});

willsRouter.post("/:id/lead", async (req, res, next) => {
  try {
    const paramsParsed = willIdParamSchema.safeParse(req.params);
    if (!paramsParsed.success) {
      return res.status(400).json({ error: "Invalid id" });
    }

    const bodyParsed = leadSchema.safeParse(req.body);
    if (!bodyParsed.success) {
      return res.status(400).json({ error: "Invalid lead data", details: bodyParsed.error.flatten() });
    }

    const lead = await leadService.captureLead({
      email: bodyParsed.data.email,
      willId: paramsParsed.data.id,
      metadata: bodyParsed.data.metadata
    });

    return res.status(201).json({ id: lead.id });
  } catch (error) {
    return next(error);
  }
});
