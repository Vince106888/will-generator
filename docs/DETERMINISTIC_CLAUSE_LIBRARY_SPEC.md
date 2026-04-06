# Deterministic Clause Library Spec (MVP Hardening)

## Objective

Define a clause-based deterministic assembler for Kenya-first will drafting without creating a full legal expert system.

## Clause order (v2)

1. Will header and identity
2. Declaration and revocation
3. Executor appointment (primary + alternate where available)
4. Guardianship clause (conditional on minors)
5. Specific gifts / allocations
6. Survivorship and residuary estate
7. Funeral/special wishes (non-binding guidance)
8. Execution/attestation guidance

## Data inputs

- `name`, `country`
- executor from root + metadata
- guardian data for minors
- assets, beneficiaries, asset allocations
- remainder clause fallback behavior
- instructions + special wishes

## Deterministic consistency checks

Blocking:
- missing executor
- minors without guardian
- no clear residue direction and no fallback beneficiaries
- assets listed with no beneficiaries

Warning-level:
- allocation gaps
- incomplete allocation entries
- missing custom residue clause (fallback applied)

## Kenya-first wording posture

- Conservative language
- No unsupported legal claims
- Execution section focuses on witness/signature hygiene and advocate-review prompts for complex cases