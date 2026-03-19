// file: apps/api/tests/validityEngine.test.ts
import { getValidityChecklist } from "../src/engines/validityEngine";

test("returns a checklist", () => {
  const checklist = getValidityChecklist();
  expect(checklist.length).toBeGreaterThan(0);
  expect(checklist[0]).toMatch(/signed/);
});
