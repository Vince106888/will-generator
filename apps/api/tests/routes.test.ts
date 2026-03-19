// file: apps/api/tests/routes.test.ts
import request from "supertest";
import { app } from "../src/app";

jest.mock("../src/services/willService", () => ({
  WillService: jest.fn().mockImplementation(() => ({
    generate: jest.fn().mockResolvedValue({
      id: "will-id",
      draft: "draft",
      complexity: { score: 1, level: "LOW", flags: [] },
      validity: ["check"]
    }),
    getById: jest.fn().mockResolvedValue({ id: "will-id", draft: "draft" })
  }))
}));

jest.mock("../src/services/leadService", () => ({
  LeadService: jest.fn().mockImplementation(() => ({
    captureLead: jest.fn().mockResolvedValue({ id: "lead-id" })
  }))
}));

describe("wills routes", () => {
  test("POST /api/v1/wills/generate", async () => {
    const res = await request(app).post("/api/v1/wills/generate").send({
      name: "Jane Doe",
      executor: "John Doe",
      assets: ["House"],
      beneficiaries: ["Alice"],
      hasMinors: false,
      multipleHouseholds: false
    });

    expect(res.status).toBe(201);
    expect(res.body.id).toBe("will-id");
  });

  test("GET /api/v1/wills/:id", async () => {
    const res = await request(app).get("/api/v1/wills/8a2d1b1a-6d0a-4a4a-9f39-3c7f6e8f1e8b");
    expect(res.status).toBe(200);
  });

  test("POST /api/v1/wills/:id/lead", async () => {
    const res = await request(app)
      .post("/api/v1/wills/8a2d1b1a-6d0a-4a4a-9f39-3c7f6e8f1e8b/lead")
      .send({ email: "user@example.com" });

    expect(res.status).toBe(201);
    expect(res.body.id).toBe("lead-id");
  });
});
