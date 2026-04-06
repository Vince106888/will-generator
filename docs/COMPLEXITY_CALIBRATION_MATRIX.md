# Complexity Calibration Matrix (v2)

## Deterministic factors and intent

| Factor | Signal | Weight intent |
|---|---|---|
| Minors present | `hasMinors` | Higher drafting/guardianship care |
| Multiple households | `multipleHouseholds` | Potential distribution complexity |
| Foreign assets | `assetDetails.isForeign` | Cross-border handling risk |
| Business interests | `assetDetails.isBusinessInterest` / type | Succession complexity uplift |
| Digital assets | `assetDetails.isDigitalAsset` / type | Access/custody planning complexity |
| Family conflict/disinheritance | metadata signal | Contest-risk uplift |
| Executor gap | missing executor | Administration-risk uplift |
| Guardian gap | minors + missing guardian | High safety risk |
| Asset volume | threshold based | Operational complexity |
| Beneficiary volume | threshold based | Allocation complexity |

## Level bands

- LOW: score < 3
- MEDIUM: score 3–6
- HIGH: score >= 7

## Calibration posture

- Conservative and explainable
- Designed for escalation guidance, not legal determination
- Must remain deterministic and inspectable