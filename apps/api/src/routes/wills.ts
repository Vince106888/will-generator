// file: apps/api/src/routes/wills.ts
import { Router } from "express";
import { WillService } from "../services/willService";
import { LeadService } from "../services/leadService";
import { ensureDraftVersionPdf, ensureWillPdf } from "../engines/outputEngine";
import {
  draftSessionIdParamSchema,
  leadSchema,
  willGenerateSchema,
  willIdParamSchema
} from "../utils/validators";

export const willsRouter = Router();

const willService = new WillService();
const leadService = new LeadService();

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
