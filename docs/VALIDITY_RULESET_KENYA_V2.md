# Validity Ruleset Kenya v2

## Baseline execution checks

- Testator signature acknowledgement (critical)
- At least two competent witnesses (critical)
- Presence/execution session guidance (critical)
- Beneficiary-witness warning (warning)

## Scenario-aware warnings

- Minors with guardian gaps
- Executor gaps
- High deterministic complexity
- Foreign asset presence
- Multiple-household context
- Family conflict/disinheritance signals

## Outputs

- Structured checklist with severity
- Warnings array
- Execution guidance array
- Storage/update guidance array
- `advocateReviewRecommended` boolean
- Deterministic advocate review reasons

## Design principles

- Kenya-first conservative guidance
- Deterministic, explainable triggers
- No dynamic legal advice substitution