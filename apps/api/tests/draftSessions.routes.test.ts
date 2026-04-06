// file: apps/api/tests/draftSessions.routes.test.ts
import request from "supertest";
import { app } from "../src/app";

type DraftMocks = {
  createSession: jest.Mock;
  getSession: jest.Mock;
  updateSession: jest.Mock;
  finalizeSession: jest.Mock;
  rotateResumeToken: jest.Mock;
};

type EmailMocks = {
  sendResumeLink: jest.Mock;
  isConfigured: jest.Mock;
};

jest.mock("../src/services/draftSessionService", () => {
  const draftMocks: DraftMocks = {
    createSession: jest.fn(),
    getSession: jest.fn(),
    updateSession: jest.fn(),
    finalizeSession: jest.fn(),
    rotateResumeToken: jest.fn()
  };
  (globalThis as unknown as { __draftMocks?: DraftMocks }).__draftMocks = draftMocks;
  return {
    DraftSessionService: jest.fn().mockImplementation(() => draftMocks)
  };
});

jest.mock("../src/services/emailService", () => {
  const emailMocks: EmailMocks = {
    sendResumeLink: jest.fn(),
    isConfigured: jest.fn()
  };
  (globalThis as unknown as { __emailMocks?: EmailMocks }).__emailMocks = emailMocks;
  return {
    EmailService: jest.fn().mockImplementation(() => emailMocks)
  };
});

const sessionId = "8a2d1b1a-6d0a-4a4a-9f39-3c7f6e8f1e8b";
const baseSession = {
  id: sessionId,
  status: "IN_PROGRESS",
  sourceMode: "AI",
  inputSnapshot: { legalName: "Jane Doe" },
  updatedAt: "2026-04-06T00:00:00.000Z",
  createdAt: "2026-04-06T00:00:00.000Z"
};

function getDraftMocks() {
  return (globalThis as unknown as { __draftMocks: DraftMocks }).__draftMocks;
}

function getEmailMocks() {
  return (globalThis as unknown as { __emailMocks: EmailMocks }).__emailMocks;
}

describe("draft session routes", () => {
  beforeEach(() => {
    const draftMocks = getDraftMocks();
    draftMocks.createSession.mockResolvedValue({
      session: baseSession,
      resumeToken: "resume-token"
    });
    draftMocks.getSession.mockResolvedValue({
      session: baseSession,
      currentVersion: null
    });
    draftMocks.updateSession.mockResolvedValue({
      session: baseSession
    });
    draftMocks.finalizeSession.mockResolvedValue({
      session: baseSession,
      version: { version: 1, createdAt: "2026-04-06T00:00:00.000Z" },
      willProfile: { id: "will-id" },
      draft: "draft",
      complexity: { score: 1, level: "LOW", flags: [] },
      validity: ["check"]
    });
    draftMocks.rotateResumeToken.mockResolvedValue({
      session: baseSession,
      resumeToken: "new-token"
    });

    const emailMocks = getEmailMocks();
    emailMocks.sendResumeLink.mockResolvedValue(undefined);
    emailMocks.isConfigured.mockReturnValue(true);
  });

  test("POST /api/v1/draft-sessions", async () => {
    const res = await request(app).post("/api/v1/draft-sessions").send({
      sourceMode: "AI",
      inputSnapshot: { legalName: "Jane Doe" }
    });

    expect(res.status).toBe(201);
    expect(res.body.sessionId).toBe(sessionId);
    expect(res.body.resumeToken).toBe("resume-token");
  });

  test("GET /api/v1/draft-sessions/:id", async () => {
    const res = await request(app)
      .get(`/api/v1/draft-sessions/${sessionId}`)
      .set("x-draft-token", "resume-token");

    expect(res.status).toBe(200);
    expect(res.body.sessionId).toBe(sessionId);
  });

  test("PATCH /api/v1/draft-sessions/:id", async () => {
    const res = await request(app)
      .patch(`/api/v1/draft-sessions/${sessionId}`)
      .set("x-draft-token", "resume-token")
      .send({ inputSnapshot: { legalName: "Updated" } });

    expect(res.status).toBe(200);
    expect(res.body.sessionId).toBe(sessionId);
  });

  test("POST /api/v1/draft-sessions/:id/finalize", async () => {
    const res = await request(app)
      .post(`/api/v1/draft-sessions/${sessionId}/finalize`)
      .set("x-draft-token", "resume-token")
      .send({});

    expect(res.status).toBe(201);
    expect(res.body.willId).toBe("will-id");
  });

  test("POST /api/v1/draft-sessions/:id/resume-link", async () => {
    const res = await request(app)
      .post(`/api/v1/draft-sessions/${sessionId}/resume-link`)
      .set("x-draft-token", "resume-token")
      .send({ email: "user@example.com" });

    expect(res.status).toBe(202);
    expect(res.body.status).toBe("SENT");
    expect(res.body.resumeLink).toContain("drafting/resume");
  });

  test("POST /api/v1/draft-sessions/:id/resume-link handles email failure", async () => {
    const emailMocks = getEmailMocks();
    emailMocks.sendResumeLink.mockRejectedValueOnce(new Error("SMTP failure"));
    emailMocks.isConfigured.mockReturnValue(true);

    const res = await request(app)
      .post(`/api/v1/draft-sessions/${sessionId}/resume-link`)
      .set("x-draft-token", "resume-token")
      .send({ email: "user@example.com" });

    expect(res.status).toBe(503);
    expect(res.body.error).toBe("Email delivery failed");
    expect(res.body.resumeLink).toContain("drafting/resume");
  });
});
