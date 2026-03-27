// Legacy: stepper flow used by archived drafting pages. Not part of active route map.
export type DraftStep = {
  id: string;
  label: string;
  description: string;
  path: string;
};

export const draftingSteps: DraftStep[] = [
  {
    id: "personal-details",
    label: "Personal details",
    description: "Identify yourself clearly for the will.",
    path: "/drafting/personal-details"
  },
  {
    id: "family",
    label: "Family & dependants",
    description: "Tell us about the people who depend on you.",
    path: "/drafting/family"
  },
  {
    id: "executors",
    label: "Executors",
    description: "Choose the people who carry out your wishes.",
    path: "/drafting/executors"
  },
  {
    id: "beneficiaries",
    label: "Beneficiaries",
    description: "Add the people you want to provide for.",
    path: "/drafting/beneficiaries"
  },
  {
    id: "assets",
    label: "Assets",
    description: "Add assets in clear categories.",
    path: "/drafting/assets"
  },
  {
    id: "distribution",
    label: "Distribution",
    description: "Decide who receives what.",
    path: "/drafting/distribution"
  },
  {
    id: "guardians",
    label: "Guardians",
    description: "Appoint guardians for minors.",
    path: "/drafting/guardians"
  },
  {
    id: "special-wishes",
    label: "Special wishes",
    description: "Optional notes to guide your family.",
    path: "/drafting/special-wishes"
  },
  {
    id: "review",
    label: "Review & confirm",
    description: "Review before generating your draft.",
    path: "/drafting/review"
  },
  {
    id: "draft-generated",
    label: "Draft generated",
    description: "Your draft is ready for signing.",
    path: "/drafting/generated"
  }
];

export const draftingStepIds = draftingSteps.map((step) => step.id);

export function getStepIndex(pathname: string) {
  const index = draftingSteps.findIndex((step) => step.path === pathname);
  return index >= 0 ? index : 0;
}

export function getStepById(id: string) {
  return draftingSteps.find((step) => step.id === id) ?? draftingSteps[0];
}
