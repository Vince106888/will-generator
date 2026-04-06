// file: apps/api/tests/health.routes.test.ts
import request from "supertest";
import { app } from "../src/app";

const queryRaw = jest.fn();

jest.mock("../src/db", () => ({
  prisma: {
    $queryRaw: (...args: unknown[]) => queryRaw(...args)
  }
}));

describe("health routes", () => {
  beforeEach(() => {
    queryRaw.mockResolvedValue(1);
  });

  test("GET /health/live", async () => {
    const res = await request(app).get("/health/live");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
  });

  test("GET /health/ready", async () => {
    const res = await request(app).get("/health/ready");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ready");
  });
});
