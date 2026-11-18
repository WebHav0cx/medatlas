> Historical migration checkpoint. Current styling uses built-in Tailwind utilities only; see [Default Tailwind cleanup](default-tailwind-cleanup.md).

# Direct Tailwind utilities — completed styling migration

This supersedes the earlier @apply migration. That phase left component styling
aliases and authored stylesheets; those are now removed.

## What changed

- Deleted `src/app/globals.css`, `src/styles/workflow.tailwind.css` and
  `src/styles/landing.tailwind.css`. There are no authored CSS, SCSS or PCSS
  files in the application repository, excluding dependencies and build output.
- Removed styling aliases from className throughout the component tree,
  including `role-primary` and `drawer-full-action`. Components now contain
  complete Tailwind utility strings. State-dependent styles use complete
  utility strings/static variant maps rather than constructing class fragments.
- Migrated 458 className expressions from stylesheet-backed aliases and removed
  156 occurrences of unbacked hooks that had no styles in the supplied baseline.
  Their removal does not add replacement designs to previously unstyled screens.
- Preserved the commented-out notes and their wording. Their commented markup
  also uses utility classes now, rather than referring to removed aliases.
- `data-slot` attributes identify composition/state relationships without
  styling class aliases. NavLink still exposes aria-current and selects the
  same routes; its active state now uses data-slot instead of an `active` class.
- `src/app/layout.jsx` imports Tailwind's own `tailwindcss/index.css` dependency
  directly. `postcss.config.mjs` and `scripts/tailwind-theme-plugin.cjs` supply
  Tailwind's build configuration, eliminating an authored CSS entrypoint. Fonts
  load from the same Google Fonts resource through the document head.
- `tailwind.tokens.json` contains 391 exact design tokens, five animation
  definitions and 21 atomic utility extensions. `tailwind.variants.json` contains
  the retained structural/state/responsive Tailwind variant definitions. These
  contain selector relationships, not component style bundles. They preserve
  descendant styling, pseudo-elements, state and breakpoint behaviour without
  CSS component rules or arbitrary selector classes.
- `tailwind.config.mjs` registers those extensions with Tailwind v4. No dependency
  was added and the framework/router/Tailwind major version did not change.
- Removed the superseded CSS conversion scripts. The application does not
  generate a replacement source stylesheet or inject runtime style objects.
- Added an optional isolated dev output directory in `next.config.mjs` for
  browser verification without overwriting an existing server's chunks.

Tailwind necessarily produces CSS build assets and includes a package stylesheet
inside node_modules. Those framework/dependency files are not application-authored
stylesheets and are not deleted.

## Content, data and design preservation

An AST comparison of all 151 existing component files found no differences in
JSX text or static title, label, description, placeholder, aria-label and alt
content. Domain types, fixtures, schemas, services and stores are byte-identical
to the safety checkpoint. No mock data was reset in the application, and no
routes, memberships, workflow steps or action permissions were changed.

The previously rendered fonts are now explicit utilities where global selector
priority had previously overridden a font class. Brand colours, spacing and
other nonstandard values remain exact named tokens; no palette approximation
or rounding was introduced.

A preserved copy of the pre-migration application ran on a separate port for
comparison. All 19 landing-section screenshots at 1280×900 match exactly.
Signup, sign-in and laboratory samples also match exactly. Hospital and patient
samples differ only in development-indicator/scrollbar regions. Production
screens were checked too; the development indicator is naturally absent there.
This is representative visual verification, not a claim that every state is
pixel-identical at every possible viewport.

## Verification

- `npm run check:styles`: passed across 186 JSX/TSX files, including routes and
  components. Zero authored stylesheets and inline styles; 3,579 complete
  utility candidates/markers validated with the installed Tailwind compiler.
  This check rejects unsupported class aliases and arbitrary-value utilities;
  it does not merely accept an @apply wrapper as a completed migration.
- `npm run typecheck`: passed.
- `npm test`: 19 passed, zero failed.
- `npm run build`: passed, including production CSS compilation using Tailwind's
  package entrypoint.
- `node scripts/browser-workflow-qa.mjs`: passed organisation registration and
  approval, all eight staff sign-ins, professional invitation activation,
  facility-led patient registration, hospital diagnostic request → specimen →
  scientist entry → reviewer approval/release → receiving hospital and linked
  patient document, plus six-step patient signup and facility-reviewed linking.
  Runtime exceptions: none.
- `node scripts/browser-workflow-qa.mjs routes`: 87 role-specific sidebar routes
  passed in production, with explicit access-denied checks. Hospital and
  laboratory mobile menus passed at 375px. Runtime exceptions: none.
- Browser acceptance also checks representative 375, 768, 1280 and 1536px views
  for horizontal overflow.
- `git diff --check`: passed.
- No ESLint result is claimed; the repository has no configured lint command.

Hospital, laboratory and patient core workflows remain operational based on
these checks. Pre-existing unbound prototype controls and the absent original
NIN/provisional baseline described in `workflow-integration.md` were not changed
by this styling migration.

The temporary checkpoint is `/tmp/medatlas-direct-tailwind-baseline.tgz`.
Visual artifacts use `/tmp/direct-utilities-*`, `/tmp/direct-landing-*` and
`/tmp/direct-production-*`, captured in an isolated Chrome profile.

## Redundant token cleanup — 7 November 2026

Audited the existing direct-utility implementation against the saved migration inventory before editing. The content comparison covered 151 components and found no text differences to restore.

Updated component class strings across auth, hospital, laboratory, patient, shared and landing sections, plus `tailwind.tokens.json`. Consolidated 20 redundant theme definitions (391 → 371), including shadow aliases and exact standard radius, tracking, blur and line-height equivalents. Removed three repeated class occurrences. `shadow-workflow-facility-switch` now uses the existing `shadow-workflow-subtle`; redundant status-background suffixes such as `bg-workflow-success-bg` now use `bg-workflow-success-surface`. These status colours remain semantic tokens because substituting nearby built-in palette colours would alter the existing appearance. No CSS files, dependencies, routes, forms, stores or fixtures were added or changed in this phase.

Verification: all 391 original token values resolve identically after consolidation; the installed Tailwind compiler validates 3,574 complete utilities/markers across 186 JSX/TSX files, with zero authored stylesheets or inline styles. Typecheck and all 19 tests pass, including connected hospital/laboratory/patient release, authorisation, linking and persistence scenarios. Text comparison still reports no differences across 151 components. No new browser screenshot comparison was performed in this phase; exact token equivalence is the design-preservation evidence, rather than a claim of new pixel regression coverage. There is no configured standalone lint script.

## Preservation-first drawer cleanup — 7 November 2026

The subsequent instruction explicitly gives visual preservation priority over eliminating exact semantic Tailwind tokens. The interrupted standard-only experiment changed fonts, grid proportions, brand/status shades and dimensions; those experimental changes were restored from the pre-experiment checkpoint. No Git reset was used. The checkpoint comparison confirms that all source files outside the two drawers match their pre-experiment contents, including landing/auth/patient screens, navigation, fixtures, forms, domain services and stores.

Changed files:

- `src/components/hospital/workflow/DetailDrawer.tsx`
- `src/components/laboratory/workflow/ResultDrawer.tsx`
- `tailwind.variants.json`
- This report.

Moved 539 selector-based utility applications directly onto their target elements in the two drawers, with zero unmatched rules. Removed 15 newly unused selector variants. Consolidated matching horizontal/vertical margin and padding utilities and removed declarations superseded by existing important utilities. Corrected the document-preview heading/paragraph cascade to reproduce the original rendering. No text, actions, routes, form fields, workflow steps or fixture values changed. No new dependencies, CSS files, components, stores or schemas were needed.

Verification: 151-component text comparison reports no differences; typecheck passes; all 19 tests pass; the production build passes. The style audit validates 3,530 complete candidates across 186 JSX/TSX files, with zero authored stylesheets, inline styles or arbitrary-value utilities. The laboratory drawer comparison at 1280×900 has zero changed pixels. The hospital drawer differs only in the live event timestamp (104 pixels in that text area). Both drawers render without runtime exceptions. No claim is made that every conditional drawer state was screenshot-tested. There is no standalone lint script configured.

Exceptions / remaining work: exact named colour, font, typography, dimension, animation and shadow tokens are intentionally retained under the latest preservation rules. Structural selector variants in other features still need separate, visually verified migration; this phase does not claim that the entire application uses only built-in Tailwind values. The existing data architecture and established workflow boundaries are unchanged.

Additional browser verification: the production preview passes all 87 sidebar routes across four hospital roles, four laboratory roles and the patient portal, plus hospital/laboratory mobile menu checks at 375px, with zero runtime exceptions. The initial development automation had a sign-in readiness timeout; a subsequent development run rendered the routes but captured one runtime syntax error. The production run used an explicit sign-in readiness wait and completed cleanly. The development-only error was not reproduced in production; its precise source was not established, so it is not claimed as a product defect fixed by this styling refactor.
