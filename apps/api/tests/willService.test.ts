// file: apps/api/tests/willService.test.ts
import { WillService } from "../src/services/willService";
import { prisma } from "../src/db";

jest.mock("../src/db", () => ({
  prisma: {
    willProfile: {
      create: jest.fn(),
      findUnique: jest.fn()
    },
    lead: {
      create: jest.fn()
    }
  }
}));

test("creates a will profile and returns draft", async () => {
  (prisma.willProfile.create as jest.Mock).mockResolvedValue({
    id: "will-id",
    draft: "draft"
  });

  const service = new WillService();
  const result = await service.generate({
    name: "Jane Doe",
    executor: "John Doe",
    assets: ["House"],
    beneficiaries: ["Alice"],
    hasMinors: false,
    multipleHouseholds: false
  });

  expect(result.id).toBe("will-id");
  expect(prisma.willProfile.create).toHaveBeenCalled();
});

test("captures a lead when leadEmail is provided", async () => {
  (prisma.willProfile.create as jest.Mock).mockResolvedValue({
    id: "will-id",
    draft: "draft"
  });
  (prisma.lead.create as jest.Mock).mockResolvedValue({ id: "lead-id" });

  const service = new WillService();
  await service.generate(
    {
      name: "Jane Doe",
      executor: "John Doe",
      assets: ["House"],
      beneficiaries: ["Alice"],
      hasMinors: false,
      multipleHouseholds: false
    },
    "lead@example.com"
  );

  expect(prisma.lead.create).toHaveBeenCalledWith({
    data: {
      email: "lead@example.com",
      willId: "will-id",
      metadata: {
        source: "generate",
        hasMinors: false
      }
    }
  });
});
