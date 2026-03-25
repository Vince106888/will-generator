# Kenya Will Generator — Feedback from Stakeholder Review Meeting

**Date:** 19 March 2026  
**Source:** [Fireflies Recording](https://app.fireflies.ai/view/Mar-19-03-26-PM::01KM310CDEEEGY38P79W5C4PA4)  
**Participants:** Naeem (Lexsgo) + Stakeholder Colleague  
**Purpose:** Detailed UX, legal, and product feedback on the Will Generator MVP  
**Usage:** Feed into VS Code to implement changes systematically

---

## POSITIVE OBSERVATIONS (Keep / Build On)

- **Clean interface**: Looks good, easy to navigate, nice font, good simplicity
- **Step indicator** ("Step 4 of 10", "Step 5 of 10") is helpful — enhance it further
- **Guiding notes concept** is good — but underutilised (expand significantly)
- **Solid foundation** for a non-lawyer building in a legal domain

---

## 1. FUNDAMENTAL ARCHITECTURE CHANGE: Dual-Path Entry

> **Priority: CRITICAL — Rethink the core approach before fixing individual screens**

### Current Problem
The app is a linear form-filling exercise. This feels like a 2009 PDF-generation tool, not an AI-powered product.

### Required Change: Two entry paths at Step 1

**Option A — "Draft with AI" (Conversational)**
- User types or speaks freely: "I have 3 properties, my wife gets the house, my son gets the car…"
- Accept raw, incomplete, messy input — AI organises and fills gaps
- AI identifies what's missing and prompts: "You mentioned 4 items but haven't said who gets the hat"
- Support text input AND voice input (microphone button)
- Support document upload (photo of ID, scanned docs) for context
- This is the **primary recommended path** — matches how people actually think about wills

**Option B — "Structured Form" (Guided)**
- Traditional step-by-step form, enhanced with AI guidance notes
- For users who prefer systematic completion
- Still needs all the UX fixes below

### Implementation Notes
- Both paths converge on the same output: a valid will document
- The AI path uses the same validation rules (Law of Succession Act, Cap 160)
- Think ChatGPT project-style: upload context → describe → iterate

---

## 2. CORE CONCEPTUAL REFRAME: "What Do I Have?" + "Who Do I Want to Give It To?"

> **Priority: CRITICAL — This changes the entire form flow**

### Current Problem
The form collects personal details, spouse info, dependents, family circumstances, assets, and beneficiaries as **separate disconnected sections**. Users fill out people in one place, assets in another, and never connect them. This is backwards.

### Required Change
The essence of a will is exactly two questions:
1. **What do I have?** (assets)
2. **Who do I want to give it to?** (beneficiaries linked to specific assets)

Everything else is secondary. The form must let users **associate assets with beneficiaries directly** — not fill parallel lists.

### Example (How People Actually Think)
> "Frank gets the laptop. Charlie gets the keyboard. My wife gets the car and the house. My son gets everything else."

Each asset → specific person. Not: "Here are my assets" (page 1)... "Here are my people" (page 2)... "Now link them" (page 3).

### Implementation Approach
- Allow inline asset-to-beneficiary mapping
- Consider a drag-and-drop or card-based UI where users assign assets to people
- Or: list beneficiaries first, then assign assets to each
- Or: free-text description that AI parses into structured data

---

## 3. JURISDICTION / LANDING SCREEN

### 3.1 — Reframe the Jurisdiction Question
**Current:** "Is Kenya your main legal jurisdiction?" (Yes/No)  
**Problem:** Users don't know what "main legal jurisdiction" means. An expat working for the UN who splits time between Nairobi and New York can't answer this.

**Fix:** The real question is: **"Do you have any assets in Kenya?"**
- If yes → proceed with Kenya will
- If no → "This service creates wills under Kenyan law. If your assets are elsewhere, we may not be the right fit."

### 3.2 — Cross-Border Assets Disclaimer
- If user indicates assets outside Kenya, display: *"You can include assets outside Kenya in this will, but their treatment may be subject to the laws of that country. We recommend seeking specific legal advice for those jurisdictions."*
- This should appear contextually when foreign assets are mentioned, not as a blanket disclaimer

---

## 4. PRIVACY & TRUST MESSAGING

> **Priority: HIGH — People are putting extremely sensitive information here**

### Current Problem
No prominent privacy assurance. Users are about to disclose children from different relationships, hidden assets, sensitive family details.

### Required Changes

#### 4.1 — Hero Section / Homepage Privacy Statement
Add a clear, prominent message:
- *"Your will is a deeply personal document. We respect your privacy."*
- *"We do not store your personal information."*
- *"Your data is encrypted end-to-end."*
- Reassure users they can include sensitive details safely

#### 4.2 — Repeated Contextual Reassurance
Every time you ask for sensitive input (ID upload, children details, assets), repeat: *"Don't worry, we'll keep it safe."*

#### 4.3 — Actual Encryption
- This is not just messaging — the architecture must actually encrypt data
- "Brand is a promise kept" — don't say it if you can't back it
- This is a different architectural challenge from a simple form-filling tool

---

## 5. FORM FIELD FIXES

### 5.1 — Mandatory vs Optional Fields
**Current:** No distinction between required and optional fields.  
**Fix:**
- Clearly mark fields as **Required** or **Optional**
- A valid will does NOT require: phone number, email, marital status
- A valid will DOES require: full legal name, ID number

### 5.2 — Remove or Reclassify These Fields

| Field | Action | Reason |
|-------|--------|--------|
| Phone number | Make optional | Not needed for a valid will |
| Marital status | Make optional | If giving assets to wife, the relationship is implicit |
| Spouse phone number | Remove | Unnecessary |
| Family circumstances | Remove or make fully optional | Has zero bearing on "what do I have / who do I give it to" |
| Number of spouses | Simplify | Don't force complex marital status forms — let it emerge from beneficiary list |

### 5.3 — Field Labelling: Required vs "For Clarity"
**Current:** Some fields are labelled "required for clarity" — this is confusing.  
**Fix:** A field is either **Required** (you can't proceed without it) or **Optional** (helpful but not blocking). There is no middle ground.

---

## 6. PERSONAL IDENTIFICATION SECTION

### 6.1 — Legal Name Guidance
**Current:** "This helps identify you clearly in the draft will" — too generic.  
**Fix:**
- *"To avoid uncertainty, ensure your name matches the name as it appears on your ID."*
- Add: *"Do you go by any other names? (nicknames, aliases, commonly known as)"*
- This produces the standard legal phrasing: "I, [Name], commonly known as [Alias]..."

### 6.2 — ID Type Field
- Should be a dropdown: National ID / Passport / other
- If Passport selected, fields should adjust accordingly
- Consider: photo upload of ID (mobile camera capture)

---

## 7. GUIDING NOTES & TOOLTIPS (Major Enhancement)

> **Priority: HIGH — Currently underutilised**

### Current Problem
Guiding notes exist but are too sparse and too generic. Key legal terms are unexplained.

### Required: Contextual Definitions for Every Legal Term

| Term | Needs Definition | Example |
|------|-----------------|---------|
| **Dependent** | Yes — many users won't know | "A dependent is someone who relies on you financially, such as a child or elderly parent" |
| **Executor** | Yes — critical | "An executor is the person responsible for carrying out the instructions in your will. They have a legal duty (called a fiduciary duty) to act in the interests of your beneficiaries. Learn more →" |
| **Guardian** | Yes | "A guardian is someone appointed to care for your minor children if both parents pass away" |
| **Beneficiary** | Yes | "A beneficiary is anyone you want to receive something from your estate" |
| **Codicil** | Yes (for amendment flow) | "A codicil is a formal amendment to an existing will" |
| **Testator** | If used anywhere | "The testator is the person making the will — that's you" |

### Implementation
- Inline tooltips (hover/click to expand)
- Link to FAQ section for longer explanations
- Use language accessible to non-lawyers: "Does your uncle Muze know what this means?"

---

## 8. EXECUTOR SECTION

### 8.1 — Better Explanation
**Current:** "Pick someone organized and willing to handle paperwork. It's often a close family member or trusted friend."  
**Fix:** Add a brief description of what an executor actually does and their legal obligations.

### 8.2 — Backup Executor
- Form shows primary executor but no backup option → add backup executor field

### 8.3 — Address User Anxieties (FAQ / Inline)
Three questions every user will have:
1. **"What if I don't know who to pick right now?"** → Can I still finish the will?
2. **"What if they don't agree?"** → What happens then?
3. **"What if I change my mind later?"** → Can I update this?

Answer these inline or link to FAQ.

---

## 9. PROGRESS BAR & GAMIFICATION

### Current
Step numbers exist ("Step 4 of 10") but no visual progress bar.

### Required
- **Visual progress bar** showing completion percentage
- **Hover-enabled step labels**: user can hover over any step node to see what it covers (e.g., "Assets", "Beneficiaries") without clicking through
- **Click-to-navigate**: allow jumping to any completed step
- This incentivises completion — users see they're 60% done and push through

---

## 10. ASSETS SECTION

### 10.1 — Flexible Descriptions
- Users don't need to be precise: "You can describe assets in general terms, but the more specific you are, the easier it is for your beneficiaries"
- Allow both specific ("Mercedes C-Class C500, 2024 model, Reg KDX 123A") and general ("my car", "all my vehicles")

### 10.2 — Cross-Border Assets Reminder
When listing assets, prompt: *"If you have assets outside Kenya, you can list them here. However, their validity under foreign law may vary — we recommend seeking local advice."*

### 10.3 — Suggested Asset Categories
Instead of a blank form, offer categories to prompt thinking:
- Real estate / Property
- Vehicles
- Bank accounts & investments
- Business interests
- Personal items of value
- Digital assets

---

## 11. GUARDIANSHIP SECTION

> **Priority: HIGH — Currently confusing and potentially legally incorrect**

### Current Problem
The form asks users to appoint a guardian for minor children. But:
- Users ask: "What about my spouse? If I die, isn't my wife the guardian?"
- Guardianship appointment via will is legally complex — it's not as simple as naming someone
- Court processes are involved
- The form doesn't explain when guardianship matters (both parents deceased)

### Required
- **Research thoroughly**: How is guardianship appointed under Kenyan law? What does the Law of Succession Act say? What role does the court play?
- **Explain clearly**: "Guardianship applies if both parents of a minor child pass away. The guardian would need court approval to act on behalf of your children."
- **Make optional**: Not every will-maker needs to appoint a guardian
- **Address the spouse question**: "If your spouse survives you, they remain the parent/guardian. This section is relevant if both parents pass away."

---

## 12. EXISTING WILLS & CODICILS

> **Priority: HIGH — Must be addressed before Step 1**

### Current Problem
No prompt asking if the user already has a will. Every will template starts with "I hereby revoke all previous wills and testamentary dispositions."

### Required: Pre-Flow Question
Before drafting begins, ask: **"Do you already have a will?"**

**If Yes → Two sub-options:**
1. **Create a new will** (which will revoke the old one) — explain this clearly
2. **Create a codicil (amendment)** — upload the existing will, describe changes, AI creates amendment

**If No → Proceed to drafting**

### Codicil Flow
- User uploads existing will
- Describes the amendment in plain language
- AI generates a formal codicil document
- Explain: "A codicil is like a variation — you don't rewrite the whole will, just the parts that changed"

---

## 13. BRANDING & POSITIONING

### 13.1 — Separate from Esharia
- This product targets non-lawyers
- Esharia is a different product for a different market
- Any brand contamination could hurt both products
- For now: keep it generic, no visible connection to Esharia
- Find the right branding link later — for now, standalone identity

### 13.2 — Homepage Tone
- Minimalistic and secure-feeling
- Don't overexpose who's behind it
- Build trust through professionalism, not corporate transparency
- "Be a little mysterious — let the product speak"

---

## 14. MONETISATION / REVENUE MODEL

### Tiered Pricing

| Tier | Price | What You Get |
|------|-------|-------------|
| **Free** | KES 0 | Create and download will as PDF — **with watermark** |
| **Basic** | KES 250 | Remove watermark — clean PDF and/or Word download |
| **Premium** | KES 4,000–5,000 | Printed glossy copy with ribbon + **door-to-door witness service** |

### Premium Witness Service Details
- Two vetted, independent witnesses dispatched to user's location (like Uber Eats)
- Witnesses verify user's ID
- Witnesses observe signing
- Photo + timestamp + geolocation metadata captured
- Witnesses are **known, trusted individuals** (not random hires) — internal network
- If witness suspects user is not of sound mind, they flag it
- This metadata trail is admissible evidence against future disputes

### Export Options
- PDF download (default)
- Word (.docx) download option — so users can edit if needed

---

## 15. FAQ & SUPPORT SYSTEM

### Three-Tier Support Model

1. **Static FAQ** — No AI interaction. Common questions answered in plain language
2. **"Ask Me Anything" AI Chat** — Interactive Q&A powered by AI, tuned to Kenyan succession law
3. **Human Fallback** — For complex or unusual cases, connect to a real person

### FAQ Topics to Cover
- What is a will?
- Who needs a will?
- What makes a will valid in Kenya?
- What is an executor / beneficiary / guardian / dependent / codicil?
- Can I include assets outside Kenya?
- What if I already have a will?
- What if I change my mind?
- What if my executor can't or won't act?
- Do I need witnesses? How many?
- Can a beneficiary be a witness? (No)
- What happens if I die without a will?

---

## 16. SIGNING & WITNESS INSTRUCTIONS

### Post-Download Guidance
After generating the will, provide clear instructions:
- How to sign
- Witness requirements (2 independent witnesses)
- A witness **cannot** be a beneficiary
- Consider a confirmation checkbox: *"I understand that a witness cannot be a beneficiary"*
- Date-stamping guidance
- Digital verification / authenticity log

---

## 17. MOBILE-FIRST DESIGN

### Requirement
- Everyone in Kenya has a mobile phone; smartphones are widespread
- The tool MUST be mobile-friendly
- Key mobile features:
  - Camera capture for ID documents (no need for pre-scanned copies)
  - Voice input for AI conversational mode
  - Touch-friendly form inputs
  - Responsive layout

---

## IMPLEMENTATION PRIORITY ORDER

| Priority | Item | Section |
|----------|------|---------|
| 🔴 P0 | Dual-path entry (AI draft vs form) | §1 |
| 🔴 P0 | Asset-to-beneficiary linking redesign | §2 |
| 🔴 P0 | Existing will / codicil prompt | §12 |
| 🟠 P1 | Privacy & trust messaging + encryption | §4 |
| 🟠 P1 | Jurisdiction question reframe | §3 |
| 🟠 P1 | Mandatory vs optional field cleanup | §5 |
| 🟠 P1 | Guardianship research & redesign | §11 |
| 🟡 P2 | Guiding notes & tooltips for all legal terms | §7 |
| 🟡 P2 | Executor section enhancements | §8 |
| 🟡 P2 | Progress bar & navigation | §9 |
| 🟡 P2 | Personal identification improvements | §6 |
| 🟡 P2 | Asset section flexibility | §10 |
| 🟢 P3 | FAQ & support system | §15 |
| 🟢 P3 | Mobile-first optimisation | §17 |
| 🟢 P3 | Signing instructions | §16 |
| 🟢 P3 | Brand separation from Esharia | §13 |
| 🟢 P3 | Monetisation / tiered pricing | §14 |

---

*Document generated from Fireflies transcript ID: 01KM310CDEEEGY38P79W5C4PA4*
