import { LeadService } from "../src/services/leadService";
import { prisma } from "../src/db";

jest.mock("../src/db", () => ({
  prisma: {
    lead: {
      create: jest.fn()
    }
  }
}));

test("captures a lead with metadata", async () => {
  (prisma.lead.create as jest.Mock).mockResolvedValue({ id: "lead-id" });

  const service = new LeadService();
  const result = await service.captureLead({
    email: "user@example.com",
    willId: "will-id",
    metadata: { source: "pdf" }
  });

  expect(result.id).toBe("lead-id");
  expect(prisma.lead.create).toHaveBeenCalledWith({
    data: {
      email: "user@example.com",
      willId: "will-id",
      metadata: { source: "pdf" }
    }
  });
});
