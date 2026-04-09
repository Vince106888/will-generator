# AI Boundaries and Orchestration

Date: 2026-03-30

## What AI Should Do
- Extract entities from user input (assets, beneficiaries, executors, guardians).
- Summarize user intent in plain language for confirmation.
- Ask clarifying questions to fill missing details.
- Propose structured fields for user review and correction.

## What AI Must Not Do
- Provide legal advice or interpret Kenyan law.
- Decide who should inherit or how disputes should be resolved.
- Override user-confirmed structured data.
- Generate or finalize a will without user confirmation.

## Orchestration Pipeline (Target)
1. Intake: capture user conversational input.
2. Extraction: parse assets, people, relationships, and wishes.
3. Summarization: produce a reviewable summary in plain language.
4. Correction: user edits and confirms extracted data.
5. Structuring: map to canonical structured fields.
6. Draft generation: deterministic backend engine uses structured data.
7. Review: validity checklist and signing guidance (deterministic).

## Deterministic Legal Boundary
- Validity checklist, witness rules, and signing guidance must remain deterministic and policy-controlled.
- AI output must be treated as suggestions until confirmed.

## Fallback Rules
- If AI extraction confidence is low, route to structured flow and require manual entry.
- If user declines AI, structured drafting remains available end-to-end.
- If AI output conflicts with user edits, user edits win.

## Trust and Disclaimers
- Always display: "This is not legal advice" and "You must review before signing."
- Explicitly state that AI summaries may be incomplete.
- No sensitive identifiers (ID scans, account numbers) should be accepted in AI prompts.

## Current Reality
- AI extraction uses a local Ollama model (default qwen3:8b, fallback qwen3:4b) with JSON-only structured output.
- Extraction outputs include summary, extracted facts, missing information, ambiguity warnings, complexity signals, and next questions.
- The deterministic draft engine remains the only source of truth for final will generation.

## Future Orchestration Direction
- Use a dedicated AI service with versioned prompts and audited outputs.
- Log extraction outputs and user confirmations for traceability.
- Separate PII handling from model prompts wherever possible.
