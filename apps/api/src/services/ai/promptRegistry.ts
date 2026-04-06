export const PROMPT_REGISTRY = {
  extract: {
    version: "extract_v1",
    purpose:
      "Extract candidate structured fields (assets, beneficiaries, executors, guardians, wishes) from free text."
  },
  explain: {
    version: "explain_v1",
    purpose: "Explain drafting fields and process in plain language without providing legal advice."
  },
  summarize: {
    version: "summarize_v1",
    purpose: "Summarize user notes for review and advocate handoff context."
  }
} as const;

export type PromptType = keyof typeof PROMPT_REGISTRY;