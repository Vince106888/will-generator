# Product System Overview

Date: 2026-03-30
Owner: Documentation (source of truth)

## What Esheria Wills Is
Esheria Wills is a Kenya-first online will drafting platform that guides users through a clear, legally aware workflow to produce a draft will and understand when advocate review is advisable. It is the public-facing entry point to the broader Esheria ecosystem.

## Product Promise
A user can create a Kenya-oriented will draft online, understand what it means, and know whether they should get advocate review before signing.

## Target Users
- Kenyan adults who want a simple will draft without immediate advocate engagement.
- Users with complex estates who need early triage and advocate escalation.
- Mobile-first users who require clear, guided language.

## Key Product Pillars
- Guided drafting: clear steps, reduced legal jargon, and contextual guidance.
- Kenya-aware validity: basic checklist and witness rules, with explicit limitations.
- Trust and privacy: minimal sensitive data, transparent storage, and clear disclaimers.
- Advocate escalation: triage signals and optional review workflow.

## Drafting Models
- AI-assisted drafting: conversational intake that summarizes user inputs and proposes structured fields for review.
- Structured drafting: direct form-based capture of legal information without AI.

AI is used only for extraction and summarization. Deterministic legal logic (validity checklist, signing rules, witness constraints) remains separate and must not be delegated to AI.

## End-to-End Flow (Current Intended)
1. Landing
2. Entry choice (AI vs structured)
3. Existing will gate
4. Drafting mode
   - AI: AI drafting workspace -> AI summary review -> handoff to structured confirmation
   - Structured: structured flow shell -> assets/beneficiaries -> executors -> guardians -> review
5. Review and results
6. Export options
7. Signing guide
8. Advocate review (optional)
9. Support and recovery pages

## Result and Post-Result Logic
- Review screen is the single place to validate completeness and generate the draft.
- Export options provide tiered delivery (free, basic, premium).
- Signing guide explains Kenyan signing requirements and witness rules.
- Advocate review captures lead information and context for escalation.

## Trust and Legal Boundaries
- Esheria Wills does not provide legal advice.
- Users must review and confirm all details before signing.
- A will is only valid after correct signing and witnessing under Kenyan law.
- The system must clearly separate AI summaries from legal determinations.

## Current Reality Notes
- AI extraction and summarization are wired through the hosted provider configured by `AZURE_MODEL_CONFIG`. Deterministic draft generation remains the source of truth.
- Backend validity and complexity logic exists but is minimal and non-exhaustive.
- Save and retrieve is only via generate and get-by-id; no authenticated user persistence.
