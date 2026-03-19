// file: apps/api/src/engines/validityEngine.ts
import { ValidityChecklist } from "../types";

export function getValidityChecklist(): ValidityChecklist {
  return [
    "Must be signed by the testator",
    "Must have at least 2 witnesses",
    "Witnesses should not be beneficiaries",
    "Must be signed in the presence of witnesses",
    "Keep the original will in a safe place"
  ];
}
