// file: apps/api/src/routes/draftSessions.ts
import { Router } from "express";
import { DraftSessionService } from "../services/draftSessionService";
import {
  draftSessionCreateSchema,
  draftSessionIdParamSchema,
  draftSessionUpdateSchema
} from "../utils/validators";

export const draftSessionsRouter = Router();
const draftSessionService = new DraftSessionService();

draftSessionsRouter.post("/", async (req, res, next) => {
  try {
    const parsed = draftSessionCreateSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        error: "Invalid input",
        details: parsed.error.flatten()
      });
    }

    const result = await draftSessionService.createSession(parsed.data);
    return res.status(201).json({
      sessionId: result.session.id,
      status: result.session.status,
      sourceMode: result.session.sourceMode,
      inputSnapshot: result.session.inputSnapshot,
      resumeToken: result.resumeToken,
      updatedAt: result.session.updatedAt,
      createdAt: result.session.createdAt
    });
  } catch (error) {
    return next(error);
  }
});

draftSessionsRouter.get("/:id", async (req, res, next) => {
  try {
    const params = draftSessionIdParamSchema.safeParse(req.params);
    if (!params.success) {
      return res.status(400).json({ error: "Invalid id" });
    }

    const resumeToken = req.header("x-draft-token") || undefined;
    const result = await draftSessionService.getSession(params.data.id, resumeToken);
    if (!result) {
      return res.status(404).json({ error: "Draft session not found" });
    }
    if ("forbidden" in result) {
      return res.status(403).json({ error: "Invalid resume token" });
    }

    return res.json({
      sessionId: result.session.id,
      status: result.session.status,
      sourceMode: result.session.sourceMode,
      inputSnapshot: result.session.inputSnapshot,
      updatedAt: result.session.updatedAt,
      createdAt: result.session.createdAt,
      currentVersion: result.currentVersion
        ? {
            id: result.currentVersion.id,
            version: result.currentVersion.version,
            generatedDraft: result.currentVersion.generatedDraft,
            complexityResult: result.currentVersion.complexityResult,
            validityResult: result.currentVersion.validityResult,
            createdAt: result.currentVersion.createdAt
          }
        : null
    });
  } catch (error) {
    return next(error);
  }
});

draftSessionsRouter.patch("/:id", async (req, res, next) => {
  try {
    const params = draftSessionIdParamSchema.safeParse(req.params);
    if (!params.success) {
      return res.status(400).json({ error: "Invalid id" });
    }
    const parsed = draftSessionUpdateSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        error: "Invalid input",
        details: parsed.error.flatten()
      });
    }

    const resumeToken = req.header("x-draft-token") || undefined;
    const result = await draftSessionService.updateSession(
      params.data.id,
      parsed.data,
      resumeToken
    );
    if (!result) {
      return res.status(404).json({ error: "Draft session not found" });
    }
    if ("forbidden" in result) {
      return res.status(403).json({ error: "Invalid resume token" });
    }

    return res.json({
      sessionId: result.session.id,
      status: result.session.status,
      sourceMode: result.session.sourceMode,
      inputSnapshot: result.session.inputSnapshot,
      updatedAt: result.session.updatedAt,
      createdAt: result.session.createdAt
    });
  } catch (error) {
    return next(error);
  }
});

draftSessionsRouter.post("/:id/finalize", async (req, res, next) => {
  try {
    const params = draftSessionIdParamSchema.safeParse(req.params);
    if (!params.success) {
      return res.status(400).json({ error: "Invalid id" });
    }

    const resumeToken = req.header("x-draft-token") || undefined;
    const result = await draftSessionService.finalizeSession(params.data.id, resumeToken);
    if (!result) {
      return res.status(404).json({ error: "Draft session not found" });
    }
    if ("forbidden" in result) {
      return res.status(403).json({ error: "Invalid resume token" });
    }

    return res.status(201).json({
      sessionId: result.session.id,
      status: result.session.status,
      sourceMode: result.session.sourceMode,
      version: result.version.version,
      id: result.willProfile.id,
      willId: result.willProfile.id,
      draft: result.draft,
      complexity: result.complexity,
      validity: result.validity,
      finalizedAt: result.version.createdAt
    });
  } catch (error) {
    return next(error);
  }
});
