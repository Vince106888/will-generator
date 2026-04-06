# AI Evaluation Harness (Assistive Only)

## Objective

Evaluate bounded AI assist quality for extraction/explanation/summary while preserving deterministic legal output authority.

## Test categories

1. Extraction schema validity
2. Confidence calibration + abstain behavior
3. Explanation relevance + uncertainty disclosure
4. Summary usefulness for advocate handoff
5. User confirmation path integrity

## Minimum assertions

- Invalid output fails schema and persists `FAILED_SCHEMA`
- Low confidence auto-abstains with explicit user-facing uncertainty
- Accepted suggestions require explicit user confirmation
- Deterministic draft generation ignores unconfirmed AI suggestions
- Audit rows include model/prompt/input hash/confidence/status

## Fixtures

- Kenya-first household with minors
- Multiple-household + conflict signal
- Foreign asset case
- Sparse/ambiguous free-text case (expected abstain)

## Rollout gate

No expansion to legal drafting generation until:

- extraction precision/recall and abstain quality meet targets
- deterministic backbone remains unchanged as final source
- advocate escalation signals remain deterministic