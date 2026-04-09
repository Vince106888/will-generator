import { Router } from "express";
import { AiService } from "../services/ai/aiService";
import {
  aiExplainSchema,
  aiExtractSchema,
  aiInteractionDecisionSchema,
  aiInteractionIdParamSchema,
  aiSummarizeSchema
} from "../utils/validators";

export const aiRouter = Router();
const aiService = new AiService();

aiRouter.post("/extract", async (req, res, next) => {
  try {
    const parsed = aiExtractSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid input", details: parsed.error.flatten() });
    }

    const resumeToken = req.header("x-draft-token") || undefined;
    const result = await aiService.extract({
      draftSessionId: parsed.data.draftSessionId,
      freeText: parsed.data.freeText,
      inputSnapshot: parsed.data.inputSnapshot,
      resumeToken
    });

    if ("disabled" in result) {
      return res.status(503).json({ error: "AI assist is currently disabled" });
    }
    if ("unavailable" in result) {
      return res.status(503).json({ error: "AI provider is not configured", details: result.reason });
    }
    if ("providerUnavailable" in result) {
      return res.status(503).json({ error: "AI provider is unavailable", details: result.reason });
    }
    if ("notFound" in result) {
      return res.status(404).json({ error: "Draft session not found" });
    }
    if ("forbidden" in result) {
      return res.status(403).json({ error: "Invalid resume token" });
    }
    if ("abstained" in result) {
      return res.status(result.abstained ? 202 : 200).json(result);
    }

    return res.status(500).json({ error: "Unexpected AI extract response" });
  } catch (error) {
    return next(error);
  }
});

aiRouter.post("/explain", async (req, res, next) => {
  try {
    const parsed = aiExplainSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid input", details: parsed.error.flatten() });
    }

    const resumeToken = req.header("x-draft-token") || undefined;
    const result = await aiService.explain({
      draftSessionId: parsed.data.draftSessionId,
      topic: parsed.data.topic,
      context: parsed.data.context,
      resumeToken
    });

    if ("disabled" in result) {
      return res.status(503).json({ error: "AI assist is currently disabled" });
    }
    if ("unavailable" in result) {
      return res.status(503).json({ error: "AI provider is not configured", details: result.reason });
    }
    if ("providerUnavailable" in result) {
      return res.status(503).json({ error: "AI provider is unavailable", details: result.reason });
    }
    if ("notFound" in result) {
      return res.status(404).json({ error: "Draft session not found" });
    }
    if ("forbidden" in result) {
      return res.status(403).json({ error: "Invalid resume token" });
    }
    if ("abstained" in result) {
      return res.status(result.abstained ? 202 : 200).json(result);
    }

    return res.status(500).json({ error: "Unexpected AI explain response" });
  } catch (error) {
    return next(error);
  }
});

aiRouter.post("/summarize", async (req, res, next) => {
  try {
    const parsed = aiSummarizeSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid input", details: parsed.error.flatten() });
    }

    const resumeToken = req.header("x-draft-token") || undefined;
    const result = await aiService.summarize({
      draftSessionId: parsed.data.draftSessionId,
      freeText: parsed.data.freeText,
      resumeToken
    });

    if ("disabled" in result) {
      return res.status(503).json({ error: "AI assist is currently disabled" });
    }
    if ("unavailable" in result) {
      return res.status(503).json({ error: "AI provider is not configured", details: result.reason });
    }
    if ("providerUnavailable" in result) {
      return res.status(503).json({ error: "AI provider is unavailable", details: result.reason });
    }
    if ("notFound" in result) {
      return res.status(404).json({ error: "Draft session not found" });
    }
    if ("forbidden" in result) {
      return res.status(403).json({ error: "Invalid resume token" });
    }
    if ("abstained" in result) {
      return res.status(result.abstained ? 202 : 200).json(result);
    }

    return res.status(500).json({ error: "Unexpected AI summarize response" });
  } catch (error) {
    return next(error);
  }
});

aiRouter.patch("/interactions/:id/decision", async (req, res, next) => {
  try {
    const params = aiInteractionIdParamSchema.safeParse(req.params);
    if (!params.success) {
      return res.status(400).json({ error: "Invalid interaction id" });
    }
    const body = aiInteractionDecisionSchema.safeParse(req.body);
    if (!body.success) {
      return res.status(400).json({ error: "Invalid input", details: body.error.flatten() });
    }

    const updated = await aiService.recordInteractionDecision({
      interactionId: params.data.id,
      status: body.data.status,
      userDecision: body.data.userDecision,
      structuredOutput: body.data.structuredOutput
    });

    return res.json({
      interactionId: updated.id,
      status: updated.status,
      updatedAt: updated.createdAt
    });
  } catch (error) {
    return next(error);
  }
});
