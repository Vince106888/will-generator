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
  expect(draft).toContain("DRAFT WILL DOCUMENT");
  expect(draft).toContain("APPOINTMENT OF PERSONAL REPRESENTATIVES");
  expect(draft).toContain("GIFTS AND DISTRIBUTION");
  expect(draft).toContain("RESIDUARY ESTATE");
  expect(draft).toContain("Keep it simple");
});

test("generates guardianship language when minors are present", () => {
  const draft = generateDraft({
    ...input,
    hasMinors: true,
    metadata: {
      guardians: [{ name: "Mary Guardian", relationship: "Sister", contact: "0700000000" }],
      minorChildren: ["Child One"]
    }
  });

  expect(draft).toContain("SECTION 4: GUARDIANSHIP FOR MINOR CHILDREN");
  expect(draft).toContain("Mary Guardian");
  expect(draft).toContain("Child One");
});

test("handles sparse input with cautious fallback wording", () => {
  const draft = generateDraft({
    name: "Unknown",
    executor: "",
    assets: [],
    beneficiaries: [],
    hasMinors: false,
    multipleHouseholds: false
  });

  expect(draft).toContain("I, Unknown, make this draft as my Last Will and Testament");
  expect(draft).toContain("An Executor has not yet been clearly identified");
  expect(draft).toContain("Beneficiary names are still being confirmed");
  expect(draft).toContain("APPENDIX A: EXECUTION GUIDANCE (KENYA)");
});
