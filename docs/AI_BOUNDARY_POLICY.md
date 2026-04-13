# AI Boundary Policy (Kenya-first Will Drafting)

## Scope

This policy governs all AI usage in Esheria Wills. Deterministic drafting remains the legal backbone.

## Allowed AI capabilities

- Structured extraction candidate suggestions from free text
- Explanations of fields/workflow in plain language
- Summaries and advocate handoff summaries
- Display-only drafting assistance

## Prohibited AI capabilities

- No autonomous generation of final dispositive clauses
- No replacement of deterministic complexity scoring
- No replacement of deterministic validity logic
- No autonomous escalation decisions
- No overwrite of confirmed user data
- No hidden uncertainty/confidence
- No AI-only final will text

## Safety controls

- Model outputs must pass schema validation
- Confidence threshold enforced (`AI_CONFIDENCE_THRESHOLD`)
- Auto-abstain on low confidence or schema failure
- Explicit user-visible uncertainty message when abstaining
- Manual structured flow remains available as fallback
- Feature flags and kill switches:
  - `AI_ASSIST_ENABLED`
  - `AI_ALLOW_LOCAL_STUB`

## Auditability requirements

Persist every AI interaction with:

- model identifier
- provider identifier
- prompt version
- input hash and preview
- structured output
- confidence
- abstained/status
- user decision (accepted/edited/rejected)
- draft session + draft version linkage

## Model posture

Hosted provider configured via `AZURE_MODEL_CONFIG` for bounded assist tasks only. Provider boundary remains model-agnostic for future swaps.
