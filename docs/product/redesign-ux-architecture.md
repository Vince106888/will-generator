# Redesign UX Architecture (Pencil-First)

Date: 2026-03-25
Source of truth: `design/pencil-new.pen`

## UX Philosophy (Condensed)
- Dual-path drafting: AI-first as primary, structured form as secondary.
- Legal safety first: existing will / codicil gate before drafting.
- Assets + beneficiaries are captured and linked early.
- Clear required vs optional sections to reduce overload.
- Trust and privacy messaging is persistent and contextual.
- Guardianship is conditional and carefully worded.
- Review is a single, deliberate checkpoint before export.
- Mobile is first-class, not a resized desktop.

## Screen-by-Screen Requirements
Each screen includes headline, CTAs, key sections, components, trust/legal notes, and mobile considerations.

### Landing
- Headline: Create a will that protects your family.
- Subheadline: Guided, private, and built for Kenyan families.
- Primary CTA: Start with AI Drafting.
- Secondary CTA: Use Structured Form.
- Key sections: Hero, Trust banner, How it works, Advocate Review CTA, FAQ teaser.
- Components: Navbar, Trust/Privacy Banner, CTA buttons, FAQ cards, Advocate CTA panel.
- Trust/legal: “Private by default. Encrypted storage.” “AI does not replace legal execution.”
- Mobile: stacked sections, full-width CTA buttons.

### Entry Choice (NEW)
- Headline: Choose how you want to draft.
- Primary CTA: AI Drafting (Recommended).
- Secondary CTA: Structured Form.
- Key sections: path cards, time estimates, required info, data privacy.
- Components: Card/Section, Trust badge, Progress bar.
- Mobile: stacked cards.

### Pre-start Orientation
- Headline: Before we begin.
- Primary CTA: Continue.
- Secondary CTA: Save for later.
- Key sections: checklist, legal caution, privacy note.
- Components: Callout/Helper, Trust badge, Checklist.

### Existing Will Gate (NEW)
- Headline: Do you already have a will?
- Primary CTA: I have a will.
- Secondary CTA: I don’t have a will.
- Key sections: codicil explanation, legal warning.
- Components: Banner/Legal Warning, CTA buttons.

### Codicil Upload (NEW)
- Headline: Upload your existing will.
- Primary CTA: Upload document.
- Secondary CTA: I don’t have it now.
- Components: Upload block, Trust badge.
- Legal: “Codicils must be signed and witnessed.”

### AI Drafting Workspace (NEW)
- Headline: Tell us what you want your will to do.
- Primary CTA: Continue to Summary.
- Secondary CTA: Save and exit.
- Components: AI bubble system, Voice input, Legal tooltip, Trust banner.
- Mobile: chat anchored bottom, summary drawer.

### AI Extraction Summary (NEW)
- Headline: Here’s what we captured.
- Primary CTA: Proceed to Review.
- Secondary CTA: Back to AI.
- Components: Summary cards, Mapping UI, Warning banner.

### Structured Flow Shell (MODIFY)
- Headline: Will drafting.
- Primary CTA: Next step.
- Secondary CTA: Save & exit.
- Components: Progress bar, clickable stepper, trust badge.

### Personal Details
- Headline: Personal details.
- Primary CTA: Continue.
- Secondary CTA: Save & exit.
- Components: Input/Field, Callout/Helper.
- Legal: “Use full legal name and ID.”

### Assets + Beneficiaries Mapping (NEW MERGED)
- Headline: Link your assets to beneficiaries.
- Primary CTA: Continue.
- Secondary CTA: Skip optional items.
- Components: Asset card, Beneficiary card, Assignment/mapping UI, Residual banner.
- Legal: “Unassigned assets go to residual beneficiaries.”
- Mobile: per-asset beneficiary picker (no drag/drop).

### Executors
- Headline: Choose your executor.
- Primary CTA: Continue.
- Secondary CTA: Save & exit.
- Components: Card/Repeated Entry, Legal tooltip.

### Guardianship (Conditional)
- Headline: Guardians for minors.
- Primary CTA: Continue.
- Secondary CTA: Not applicable.
- Components: Card/Repeated Entry, Legal warning banner.
- Legal: “Applies to minors only.”

### Special Wishes
- Headline: Special wishes (optional).
- Primary CTA: Continue.
- Secondary CTA: Skip.
- Components: Textarea, Callout/Helper.

### Review / Result (MERGED)
- Headline: Review and confirm.
- Primary CTA: Generate Draft.
- Secondary CTA: Edit Sections.
- Components: Review checklist, Document preview, Warning banner.
- Legal: “Draft not valid until signed and witnessed.”

### Export Options (NEW)
- Headline: Export your draft.
- Primary CTA: Download Draft.
- Secondary CTA: Send for Advocate Review.
- Components: Export tier/pricing cards, Advocate CTA panel.

### Signing Instructions
- Headline: Signing instructions.
- Primary CTA: I understand.
- Secondary CTA: Save for later.
- Components: Signing checklist, Legal warning banner.

### FAQ
- Headline: Frequently asked questions.
- Components: FAQ accordion.

### Privacy / Trust (NEW)
- Headline: Privacy and data protection.
- Components: Trust/privacy banner, legal disclaimer block.

### Advocate Review
- Headline: Get an advocate to review.
- Components: Advocate CTA panel.

### Error & Recovery States
- Headline: We couldn’t complete that.
- Primary CTA: Retry.
- Secondary CTA: Save and exit.

### Save & Continue Later
- Headline: Save and return later.
- Primary CTA: Send link.
- Secondary CTA: Cancel.

## Step Model (Structured)
1. Personal Details
2. Assets + Beneficiaries Mapping
3. Executors
4. Guardianship (conditional)
5. Special Wishes (optional)
6. Review & Confirm

## Trust / Privacy / Legal Layer
- Hero: “Encrypted. Private. You control your data.”
- Inline: guardian, executor, witness guidance
- Review: “Draft is not valid until signed and witnessed.”
- Export: “AI structures your instructions; legal execution is required.”

## Mobile Coverage
Dedicated mobile frames: Entry Choice, Existing Will Gate, AI Drafting, AI Summary, Assets + Mapping, Review, Export, Signing.
