> Historical checkpoint: the supplied full workflows and original mock store have now been integrated. See [workflow-integration.md](workflow-integration.md) for the current implementation, verification and remaining exceptions. The limitations below describe the earlier account-demo phase.

# Auth implementation checkpoint

## Scope and baseline

The checkout is a Next.js 15 App Router landing page, React 19, npm lockfile,
Tailwind 4 and Lucide React. `src/app/page.jsx` renders `src/App.jsx`, which
composes `components/common` and `components/sections`. Only global CSS exists.
There are no existing auth forms, stores, domain fixtures, patient portal,
hospital/laboratory workspaces, TypeScript config, test runner or lint config.
The supplied Desktop/Public.tsx is a reference, not an existing application:
its form controls are unbound and navigation targets are not implemented here.

Baseline: `npm run build` passed. No typecheck/lint/test scripts existed.
Source scan: 26 UI/CSS files, approximately 50 arbitrary utility occurrences,
19 colour literals, 20 style props and zero forms. Existing landing styles
are outside this auth task and retained at the user's explicit request.
The working tree already contained user changes; no reset/commit was made.

## Incremental plan

1. Retain the landing UI; connect desktop/mobile navbar and audience CTAs.
2. Add TypeScript auth feature screens and shared labelled form controls.
3. Add RHF/Zod schemas, fictional identity fixtures and domain actions.
4. Add a selectively persisted/versioned Zustand identity store; persist only
   fictional account metadata, never entered passwords or actual credentials.
5. Add local signup/signin, provider onboarding, staff invitation and existing
   patient activation routes, with thin App Router entrypoints.
6. Validate domain transitions, types, production compilation and routes.

## Component and data ownership

- `components/auth`: shell, choice screen, organisation form, sign-in,
  patient activation, staff invitation, account overview.
- `components/shared/forms`: accessible native field/error feedback.
- `domain`: account/organisation/patient types and pure identity transitions.
- `data`: versioned fictional seed records; sole initial fixture source.
- `schemas`: typed Zod form contracts.
- `stores`: identity/account persistence and demo session actions.
- `app`: thin route wrappers only.

## Boundaries

New facilities remain pending. Demo sign-in is explicitly simulated, using a
published demo password, not a production credential system. Access to an
account overview does not grant clinical/network access. Portal activation
requires an existing profile and a separate matching fictional invitation.
No clinical profiles are publicly created. Clinical workflows cannot be
claimed preserved or tested: their implementation is absent from the checkout.

New UI uses emerald/slate/lime built-ins in place of reference custom colours,
standard spacing/radii and the installed Outfit/DM Serif fonts. No CSS from the
reference files is imported. No new inline styles or arbitrary utilities.

## Implemented routes and forms

- `/signup`, `/get-started`: patient/provider choice; `/signin`: sign-in choice.
- `/get-started/provider`: three-step organisation, administrator and review
  form; saved pending registration and linked administrator membership.
- `/get-started/patient`: portal activation against an existing fixture profile.
- `/activate/staff`: invitation-scoped staff activation; role is not user-selected.
- `/login/provider`, `/login/patient`: validated sign-in with sample account
  selection. `/login` redirects to `/signin`; `/register` redirects to `/signup`.
- `/hospital/{doctor,nurse,records,administrator}/dashboard` and
  `/laboratory/{reception,scientist,reviewer,administrator}/dashboard`:
  role-scoped **account overviews**, not fabricated clinical dashboards.
- `/patient/dashboard`: linked patient account details and actual account audit
  events. `/provider/dashboard` supports the reference's generic destination.

`Navbar.jsx` and `ExperienceLink.jsx` became typed `.tsx` components; all their
existing extensionless imports remain valid. Navbar contains desktop/mobile
Sign In and Sign Up buttons, a labelled expandable menu and focus indicators.
Audience CTA destinations now use local Next.js links. Existing landing section
content/layout and CSS are untouched. No landing components were moved.

The four substantial forms use RHF, Zod, typed defaults, native `register`,
field-level alert feedback and disabled submitting states. Services revalidate
schemas and business transitions before updating shared data. Two commented
arbitrary navbar border utilities were removed; all remaining baseline style
objects/colour literals/arbitrary utilities belong to the preserved landing.
The entire added auth UI has zero arbitrary utilities, hardcoded colour values,
inline style props, CSS files or runtime style exceptions.

Zustand stores only synthetic identity fixtures, account/facility metadata,
consumed demo invitations and actual account audit events. Selective versioned
persistence excludes password inputs and volatile sessions. Refresh retains
records but requires signing in again. Old snapshot versions reset to the
current seed; malformed snapshots recover with feedback. Storage write failure
keeps in-memory functionality and displays a session-only persistence message.
No NIN, clinical document, live token or real credential is stored.

## Validation results

- Baseline production build: passed.
- `npm run typecheck`: passed, strict checking for new TypeScript; existing
  JavaScript allowed to preserve the landing implementation.
- `npm test`: 11 passing Node-native tests (Node 22.18+); registration,
  duplicates, all eight roles, invalid sign-in, activation/mismatch/replay,
  form schemas, actual Zustand rehydration/migration, secret exclusion,
  incompatible storage recovery and write failures.
- `npm run build`: passed, 14 static pages plus dynamic audience/role routes.
- No lint script/config exists; no independent lint pass is claimed.
- Headless Chrome exercised actual forms against the production app:
  empty registration field errors/ARIA, full three-step registration and pending
  account, eight staff role sign-ins, invalid patient invitation, correct portal
  linking without another profile, sign-out/re-sign-in and nurse activation.
  No JavaScript runtime exceptions were recorded.
- Signup screenshots/overflow checks at 375, 768, 1280 and 1536px; mobile
  registration/error and patient screenshots reviewed. Mobile navbar auth links
  verified. These checks cover the added auth flow, not every legacy section.
- `git diff --check`: passed.

TypeScript is pinned to the Next.js 15-compatible 5.9 line; npm's initial
TypeScript 7 selection was rejected by Next's installed compiler API check.
Existing Next/React/Tailwind major versions and App Router are retained. Added
runtime dependencies are react-hook-form, zod, @hookform/resolvers and zustand;
development dependencies are TypeScript and React/DOM/Node types.

## Remaining work / limits

The hospital-led NIN/provisional clinical registration, identity resolution,
record discovery/request/authorisation/release and laboratory review workflows
are absent from both this checkout and the supplied Public.tsx. They have not
been reconstructed as part of this auth request, and cannot be claimed tested
or preserved. The new patient view is an account activation destination, not a
replacement for a full existing portal. Full clinical source/screens and
fixtures are needed for the broader architectural migration in AGENTS.md.

Reference custom greens/lime are approximated by built-in emerald/lime shades;
no critical custom brand token was added. Existing landing fonts are reused.
These are local-only changes; no live authentication or external deployment.

## Copy fidelity correction

The supplied `Public.tsx` is the authority for existing screen copy. Signup and
sign-in descriptions, field labels/placeholders, Organization spelling, footer,
and completion text were restored verbatim. Added demo banner and rewritten
explanatory paragraphs were removed. The additional acknowledgement checkbox
was not in the supplied form and has been removed, including its schema rule.
Demo account/password helpers remain accessible under supplied labels without
rewriting the main screen copy. Staff/portal/account screens have no original
copy in Public.tsx; their existing copy remains pending the requested wording.
Future implementation changes must preserve supplied text unless the user
explicitly requests a copy change.

## Development cache isolation

`next.config.mjs` now writes development output to `.next-dev` and production
build/start output to `.next`. This prevents a production validation build from
overwriting chunks used by the running development server. Both generated type
directories are included in TypeScript configuration; both caches are ignored.
The existing dev server returned HTTP 200 for `/signup` after a production build
completed while it remained running. No page copy was changed for this fix.
