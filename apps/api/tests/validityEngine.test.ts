// file: apps/api/tests/validityEngine.test.ts
import { getValidityChecklist } from "../src/engines/validityEngine";

test("returns a checklist", () => {
  const result = getValidityChecklist();
  expect(result.checklist.length).toBeGreaterThan(0);
  expect(result.checklist[0].message).toMatch(/sign/i);
  expect(result.executionGuidance.length).toBeGreaterThan(0);
});
