> Historical migration checkpoint. Current styling uses built-in Tailwind utilities only; see [Default Tailwind cleanup](default-tailwind-cleanup.md).

# MedAtlas workflow integration and preservation report

## Source and safety

The supplied Auth.tsx, RoleWorkspace.tsx, LabWorkspace.tsx, Patient.tsx and
Provider.tsx (11,172 lines) and subsequently supplied mockStore are the source
for this phase. The existing landing page was retained. No repository reset,
seed replacement or deletion of saved browser records was performed. The Git
working tree already contained extensive changes; its original tracked history
does not contain these supplied workspaces. Source hashes and text candidates
are recorded in `workflow-source-inventory.json`.

Baseline before integration: typecheck, 11 tests and production build passed.
The exported screens contained nine form elements, one runtime style prop,
zero style elements, zero literal arbitrary Tailwind utilities and zero colour
literals in TSX. These counts exclude their external stylesheets. npm,
Next.js App Router, Tailwind 4 and existing RHF/Zod/Zustand dependencies remain.
No lint script/configuration is present. No new dependency was needed.

## Actual implementation

- Thin Next route entrypoints now render the supplied signup, sign-in,
  organisation application/status, professional activation and patient signup.
  The original four organisation steps and six patient-account steps remain.
- 103 source functions were extracted into feature components. Hospital,
  laboratory and patient nested routes use a Next navigation adapter, without
  replacing the router or adding react-router. Earlier hospital/login URLs
  retain compatibility redirects. Role entry rejects mismatched/deactivated
  staff accounts using the original access-denied screen.
- `src/domain/workflow/types.ts` and `src/data/workflow/seed.ts` hold the supplied
  typed entities and fictional fixtures. Original names, dates, IDs, record
  titles, status labels, invitation and linking codes are retained.
- `src/services/workflow/` separates patient, hospital, laboratory and
  organisation transitions from presentation. Requests, authorisation,
  diagnostic histories, specimen processing, reviewer release, received
  documents, patient notifications and audit events update connected entities.
- `src/stores/workflow/` provides Zustand persistence and a compatibility hook
  for the source screens. The original `medatlas-mock-state-v1` key supports
  legacy raw snapshots as well as versioned envelopes. Zod validates restored
  collections; existing fictional data is merged without resetting it.
  Entered passwords are excluded from persistence. Blocked/quota storage can
  continue in memory. Existing older demo storage is left untouched.
- `src/schemas/workflow-forms.ts` supplies typed form contracts. RHF/Zod now
  handles sign-in, organisation registration, professional activation, patient
  signup, laboratory patient/invitation/result entry, patient linking/requests/
  profile/settings, hospital workflow dialogs and identity decision notes.
  Native inputs retain original order, labels, constraints and feedback text;
  invalid fields have accessibility state and existing errors use alerts.
- Shared Brand, WorkflowFrame, access feedback and document download logic are
  separated from screens. New organisation approvals preserve their membership
  and facility profile instead of overwriting CityCare's seeded profile.

```text
src/components/
  auth/workflow/
  hospital/workflow/       # original role-based workspace
  hospital/provider/      # retained legacy provider screens
  laboratory/workflow/
  patient/workflow/
  shared/workflow/
src/domain/workflow/
src/data/workflow/
src/schemas/workflow-forms.ts
src/schemas/workflow-persistence.ts
src/services/workflow/
src/stores/workflow/
src/lib/workflow-router.tsx
```

The landing components remain in their existing folders. This follow-up changes
only their styling implementation, preserving the completed landing content. Older account-demo components also remain;
this phase does not claim the entire repository architecture is migrated.

## Content and design preservation

An AST comparison of original JSX text and literal non-layout attributes found
all 372 patient and 307 legacy-provider candidates retained. The signup
Platform administration note and hospital Authorisation-aware workspace note
are commented out in the current working files; these newer edits were left
intact. Original seeded hospital/laboratory names still render for their
accounts; header bindings now use the selected organisation so newly approved
organisations display their own supplied application name. All other compared
source text candidates were retained. Dynamic expressions and every possible
state were not exhaustively text-diffed.

The subsequent direct-utility migration removed all three authored application
stylesheets and the remaining class aliases. Styling now lives in component
className utilities and Tailwind configuration, with Tailwind's package entrypoint
imported directly. See `tailwind-migration.md` for the current file structure,
compiler-based audit, visual comparisons and production route checks. Earlier
@apply/stylesheet checkpoints are superseded by that report.

At 1280×900, settled screenshots of signup, sign-in, doctor, lab and patient
screens were compared using the scoped original CSS versus the converted CSS,
with matching state. Four were pixel-identical. Doctor differed by 12 pixels
inside the bottom-left Next development indicator; no application pixels
differed. This verifies the stylesheet conversion on those samples, not
pixel-perfect equivalence against an external Figma rendering or every state.
The browser run also checked 375, 768, 1280 and 1536px samples for overflow.
Screenshots and comparison artifacts are in `/tmp/workflow-*`.

## Functional verification

Commands used:

- `npm run typecheck`: passed.
- `npm test`: 19 passed, 0 failed (11 earlier tests plus 8 connected-workflow tests).
- `npm run build`: production build passed with 18 prerendered pages and dynamic
  workspace routes.
- `node scripts/browser-workflow-qa.mjs`: isolated Chrome/CDP acceptance runner.
- `git diff --check`: passed.
- No ESLint result is claimed because no lint command/configuration exists.

The browser runner uses a temporary, isolated Chrome profile, not the user's
browser storage. Its journeys cover organisation registration/approval and own
workspace, all eight seeded staff sign-ins, the original professional invite,
facility-led patient registration and internal MedAtlas ID, a new hospital
diagnostic request through specimen/scientist/reviewer release, receiving
hospital and linked patient document, and six-step patient account creation
followed by linking and records-officer approval. JavaScript runtime exceptions
were empty in the completed run. Unit tests additionally cover consent-gated
release, identity links without profile creation/auto-merging, invitation email
and replay protection, idempotent approvals/releases, source-facility document
eligibility and legacy persistence without passwords.

## Exceptions and outstanding work

- Core hospital, laboratory and patient journeys are operational based on the
  checks above. This does not certify every source button or legacy prototype
  interaction. Some legacy Provider controls and ancillary lab table/date
  controls were unbound in the supplied source and remain outside this phase.
- The supplied source contains no NIN/provisional registration UI or fixture
  contract. That acceptance journey cannot be verified without an original
  baseline; no substitute wording, national verification or new flow was invented.
- Portal signup creates a portal account, never a clinical patient. Documents
  require an approved profile-and-facility link. Reviewer-only release and
  applicable patient permission checks prevent unsafe demo disclosure.
- This remains a local fictional prototype, with no production authentication or
  live backend. Custom entered patient passwords work only in memory; after
  refresh the demo uses the published `medatlas` password because credentials
  are intentionally not persisted. This constraint remains to be reconciled
  with a future approved authentication implementation.
- Extraction of all feature configuration out of SourceConfig modules and
  removal of superseded earlier demo components remain architectural work.
  The completed direct-utility styling follow-up is documented in
  `tailwind-migration.md`.
