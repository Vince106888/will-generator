# Route Migration Plan (Legacy -> Clean Source)

Date: 2026-03-27  
Source of truth: `design/pencil-implementation.pen`

## Goal
Eliminate legacy route ambiguity and ensure only the active approved routes are reachable.

## Active Routes (Keep)
See `docs/frontend/route-map.md` for the authoritative list.

## Legacy Surfaces (Isolate or Retire)
These files/pages exist in code but are not part of the approved route map and should not be reachable.

- `apps/web/src/pages/drafting/DraftingHome.tsx`
- `apps/web/src/pages/drafting/PersonalDetails.tsx`
- `apps/web/src/pages/drafting/FamilyDependants.tsx`
- `apps/web/src/pages/drafting/Executors.tsx` (legacy stepper)
- `apps/web/src/pages/drafting/Beneficiaries.tsx`
- `apps/web/src/pages/drafting/Assets.tsx`
- `apps/web/src/pages/drafting/Distribution.tsx`
- `apps/web/src/pages/drafting/Guardians.tsx`
- `apps/web/src/pages/drafting/SpecialWishes.tsx`
- `apps/web/src/pages/post/SaveContinue.tsx`
- `apps/web/src/pages/marketing/Eligibility.tsx`
- `apps/web/src/pages/marketing/PreStart.tsx`
- `apps/web/src/pages/Result.tsx`

## Legacy Components (Do Not Use in New Flow)
- `apps/web/src/components/drafting/DraftingShell.tsx`
- `apps/web/src/components/drafting/StepActions.tsx`
- `apps/web/src/lib/draftingSteps.ts`

## Migration Actions
1. Keep legacy files for now but ensure no routes or links point to them.
2. Legacy pages are labeled in UI to prevent accidental use.
3. Remove any accidental navigation to `/drafting/*` legacy step paths.
4. Consolidate result flows to `apps/web/src/pages/drafting/Review.tsx`.
5. If we remove legacy files later, delete the corresponding tests and update import references.

## Validation
- Manual route audit against `docs/frontend/route-map.md`
- Ensure `apps/web/src/App.tsx` only maps active routes.
