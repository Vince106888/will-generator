// file: apps/api/tests/draftEngine.test.ts
import { generateDraft } from "../src/engines/draftEngine";

const input = {
  name: "Jane Doe",
  executor: "John Doe",
  assets: ["House", "Car"],
  beneficiaries: ["Alice", "Bob"],
  hasMinors: false,
  multipleHouseholds: false,
  instructions: {
    notes: "Keep it simple",
    funeralWishes: "Private ceremony"
  }
};

test("generates draft with core sections", () => {
  const draft = generateDraft(input);
  expect(draft).toContain("LAST WILL AND TESTAMENT");
  expect(draft).toContain("EXECUTOR");
  expect(draft).toContain("ASSETS");
  expect(draft).toContain("BENEFICIARIES");
  expect(draft).toContain("Keep it simple");
});
