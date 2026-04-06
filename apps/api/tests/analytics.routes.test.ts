// file: apps/api/tests/analytics.routes.test.ts
import request from "supertest";
import { app } from "../src/app";

const createEvent = jest.fn();

jest.mock("../src/db", () => ({
  prisma: {
    analyticsEvent: {
      create: (...args: unknown[]) => createEvent(...args)
    }
  }
}));

describe("analytics routes", () => {
  beforeEach(() => {
    createEvent.mockResolvedValue({ id: "event-id" });
  });

  test("POST /api/v1/analytics/events allowlisted event", async () => {
    const res = await request(app).post("/api/v1/analytics/events").send({
      event: "draft_session_created",
      payload: { sessionId: "8a2d1b1a-6d0a-4a4a-9f39-3c7f6e8f1e8b" }
    });

    expect(res.status).toBe(201);
    expect(res.body.id).toBe("event-id");
  });

  test("POST /api/v1/analytics/events blocks unknown events", async () => {
    const res = await request(app).post("/api/v1/analytics/events").send({
      event: "unknown_event",
      payload: { foo: "bar" }
    });

    expect(res.status).toBe(400);
  });
});
