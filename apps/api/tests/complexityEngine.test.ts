// file: apps/api/tests/complexityEngine.test.ts
import { computeComplexity } from "../src/engines/complexityEngine";

const baseInput = {
  name: "Jane Doe",
  executor: "John Doe",
  assets: ["House"],
  beneficiaries: ["Alice"],
  hasMinors: false,
  multipleHouseholds: false
};

test("returns LOW complexity for simple case", () => {
  const result = computeComplexity(baseInput);
  expect(result.level).toBe("LOW");
  expect(result.score).toBe(0);
});

test("flags minors and multiple households", () => {
  const result = computeComplexity({
    ...baseInput,
    hasMinors: true,
    multipleHouseholds: true,
    assets: ["A", "B", "C", "D", "E", "F"]
  });

  expect(result.flags).toEqual(expect.arrayContaining(["MINORS_PRESENT", "MULTIPLE_HOUSEHOLDS", "MANY_ASSETS"]));
  expect(result.level).toBe("HIGH");
});
