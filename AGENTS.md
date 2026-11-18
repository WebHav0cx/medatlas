# MedAtlas — Repository Instructions for Codex

These are persistent engineering instructions for this repository. Apply them to every change. **Read the actual repository before changing files.** A separate `CODEX_MIGRATION_TASK.md` describes the one-time Figma Make → production-quality frontend refactor.

## 1. Product boundaries — do not silently alter them

MedAtlas is a Nigerian healthcare interoperability application. Its principal workflow is **Identify → Discover → Request → Authorise → Exchange → Audit**.

- Hospitals, clinics, and diagnostic laboratories operate organisation-based workspaces with permissions scoped to staff roles and patient relationships.
- A **healthcare facility establishes or verifies a patient clinical profile**. An existing patient presents their MedAtlas ID and is identity-checked; a new patient is registered through an appropriate NIN-based or provisional workflow. The MedAtlas ID is an **internal reference**, not a replacement for NIN or the nationally proposed client registry.
- **Keep the Patient Portal**. An already registered patient may activate portal access using a separate verified invitation/link; this activation does not create another clinical patient profile. Do not restore open public self-registration of clinical patient identities.
- The hospital-led network discovery workflow identifies _authorised, discoverable record locations_, not unrestricted clinical histories. Records require appropriate requests and authorisation before disclosure.
- The NDHA/NHCR/NHFR/NHWR/HIE/SHR integrations are **future integration points unless verified as live**. Never present mock connections, approvals, government verification, blockchain confirmations, or transmitted files as real.
- The current application uses **fictional, connected mock data** and needs to function end-to-end without a backend. Preserve existing hospital, laboratory, and patient views, workflows, navigation, sample data, and access rules.

## 2. First inspect; then plan; then edit

Before any large refactor:

1. Inspect `package.json`, lockfile, TypeScript and bundler configuration, routing setup, Tailwind version/configuration, global styles, design primitives, current forms, stores, and mock persistence.
2. Create an inventory of components/routes and CSS sources. Identify duplicate components, dead routes, arbitrary Tailwind classes, hardcoded colours, inline styles, and behavioural dependencies.
3. Use the existing package manager and routing library. **Do not replace the bundler, router, state architecture, or component library merely for stylistic preference.** Propose incompatible architectural changes separately.
4. Work incrementally by feature. Keep the project compilable and preserve behaviour after every stage. If possible, use a branch/checkpoint before major moves.
5. Do not rename or delete existing functional code until imports, routes, behaviour and persistence have been migrated and verified.

## 3. TypeScript and React conventions

- Use React functional components and TypeScript (`.tsx` for JSX, `.ts` for logic); preserve or enable strict typing.
- No new `any`, `@ts-ignore`, blanket type casts, unsafe `!` non-null assertions, dead exports, unused imports, duplicate implementations, or giant multi-purpose components.
- PascalCase components/types; camelCase hooks/actions/variables; `useSomething` hooks; descriptive file names consistent with the current repo conventions.
- Keep UI components small and cohesive. Extract repeated layouts, rows, dialogs, forms, tables, and status displays into reusable components.
- Separate presentation from business rules, validation, mock repositories and state transitions. Do not place large patient arrays or business workflows inside JSX render functions.
- Prefer semantic HTML, accessible labels, keyboard navigation, focus states and real buttons/links. Avoid using clickable `div` elements.
- Prefer derived state rather than redundant mirrored state. Avoid unnecessary effects and prop drilling.
- Add `loading`, `empty`, `error`, `disabled`, `pending`, `success`, and relevant permission-restricted states where appropriate.

## 4. Strict Tailwind convention: use standard scale, no one-off values

**Goal:** Convert Figma Make's scattered CSS, inline style objects, hardcoded HEX/RGB/HSL/OKLCH colours, and arbitrary Tailwind classes into a consistent **built-in Tailwind utility** design system.

- FIRST detect whether the repository uses Tailwind v3 or v4. Preserve that major version unless an explicit upgrade is requested. Use only utilities and setup supported by the installed version.
- **Default to built-in utility values.** Do not introduce `bg-[#...]`, `text-[#...]`, `w-[...]`, `h-[...]`, `p-[...]`, `rounded-[...]`, `shadow-[...]`, `text-[...]`, `grid-cols-[...]`, `top-[...]` or other arbitrary-value utilities. Do not add arbitrary selectors or variants when an ordinary selector, supported utility or component pattern exists.
- Avoid hardcoded colour literals in JSX/TSX/TS, `style`, CSS modules and global CSS. Use the **nearest standard Tailwind palette shade** and document any notable visual trade-off. Semantic decisions matter more than numerically nearest colours: approvals are green, awaiting actions amber, active work blue, declines red, drafts neutral, critical failures red with strong contrast.
- Map custom spacing, width, height, font-size, line-height, border radius, border, shadow and grid dimensions to their **nearest suitable standard Tailwind scale**. Check the actual rendered UI after rounding. Do **not** collapse all layouts to the same spacing or destroy visual hierarchy to eliminate an arbitrary value.
- Prefer utility classes in `className` and consistent reusable components. Remove obsolete Figma CSS classes after replacing their usage.
- Avoid `style={{ ... }}`, `<style>` tags, CSS-in-JS, `!important`, arbitrary values and one-off CSS files for normal layout/styling. Exception: truly runtime-calculated properties (e.g., data-driven chart position) or third-party library integration which cannot be expressed with standard utilities. Document each exception.
- Global CSS should contain only the Tailwind entrypoint, truly necessary font/base definitions, accessibility/third-party integration styles, and minimal justified exceptional rules. Avoid unnecessary `@apply` wrappers duplicating utilities.
- **Do not construct Tailwind class names dynamically** (e.g. `` `bg-${color}-600` ``). Use a static map of complete classes or component variants so Tailwind can detect them.
- For class composition use existing `cn()` helper, or `clsx` + `tailwind-merge` if already available; do not add a dependency merely to concatenate two strings.
- Use responsive utility variants (`sm:`, `md:`, `lg:`, `xl:`), `focus-visible`, `disabled`, `aria-*`, `data-*`, and motion-reduction variants where appropriate. Audit contrast and layout at key viewport sizes.
- **Brand fidelity exception policy:** If the official MedAtlas brand shade or another critical semantic visual requirement cannot be safely approximated using the default scale, report the trade-off to the user rather than silently injecting a new hex value. The task preference is standard Tailwind colours and nearest built-in values.
- Ensure font families are applied consistently. Use the existing fonts if available; prefer Inter for general UI and Plus Jakarta Sans for display headings where properly installed. Use named Tailwind font utilities (`font-sans`, existing `font-display` token) instead of inline font declarations.

### Conversions to prefer (confirm installed version)

| Legacy Figma export                           | Typical standard Tailwind alternative                               |
| --------------------------------------------- | ------------------------------------------------------------------- |
| `background-color: #174F3D` or `bg-[#174F3D]` | `bg-emerald-900` or closest readable `bg-teal-900` after comparison |
| `color: #172B25`                              | `text-slate-900`                                                    |
| `background: #F6F8F7`                         | `bg-slate-50`                                                       |
| `background-color: #E7F5EC` (success)         | `bg-emerald-50` + `text-emerald-800`                                |
| `background-color: #FFF2D9` (pending)         | `bg-amber-50` + `text-amber-800`                                    |
| `background-color: #FDE9E9` (declined)        | `bg-red-50` + `text-red-800`                                        |
| `width: 270px` or `w-[270px]`                 | compare `w-64` and `w-72`, choose visually appropriate              |
| `padding: 18px` or `p-[18px]`                 | `p-4` or `p-5` depending context                                    |
| `gap: 22px` or `gap-[22px]`                   | `gap-5` or `gap-6`                                                  |
| `border-radius: 13px`                         | `rounded-xl` or `rounded-lg` depending context                      |
| `font-size: 15px`                             | `text-sm` or `text-base` based on readability                       |

These are _examples_, not a mechanical replace-all map. Preserve responsive intent and accessibility.

## 5. Repository organisation — components belong to feature folders

All **rendered UI components**, including full screen/page view components, belong under `src/components/` in meaningful feature folders. Route entry files may live in `src/routes/`, `src/pages/`, or framework-specific `src/app/` but must remain **thin wrappers** that import view components. Do not put every domain type, schema, store or mock repository inside `components`.

Target structure (adapt the names to the existing app; avoid duplicate folder systems):

```text
src/
  components/
    landing/                  # full LandingPage UI and sections
      LandingPage.tsx
      HeroSection.tsx
      HowItWorksSection.tsx
      ...
    auth/                     # SignInPage, OrganisationSignup, StaffInvite, PortalActivation
    hospital/
      shared/                 # hospital shell and shared clinical UI
      doctor/                 # doctor dashboard, encounters, referrals
      nurse/                  # nurse dashboard, worklist
      records/                # registration, identity resolution, requests
      admin/                  # staff, facility, reporting
    laboratory/
      shared/
      reception/
      scientist/
      reviewer/
      admin/
    patient/                  # EXISTING patient portal: activated accounts only
      dashboard/
      records/
      sharing/
      timeline/
      settings/
    network-discovery/        # discoverable locations, search UI
    record-exchange/          # requests, authorisations, receipts, timelines
    shared/
      ui/                     # buttons, inputs, badges, dialogs, tables
      layout/                 # app shells, headers, sidebars, breadcrumbs
      forms/                  # common form fields
      feedback/               # errors, empty states, toasts, skeletons
  routes/                     # tiny route elements importing components (if router-based)
  hooks/                      # reusable non-UI hooks
  stores/                     # Zustand feature/domain stores
  schemas/                    # Zod validation schemas
  domain/                     # entity types, rules and state machines
  services/                   # typed mock API/repositories and future adapters
  data/                       # seed fixtures; fictional data only
  lib/                        # utilities, cn, formatting helpers
  tests/                      # unit/integration/E2E tests as configured
```

- A feature's component may be in its feature folder alongside its private subcomponents. Shared UI goes in `components/shared/ui` only when reused by multiple features.
- Do not dump everything into `src/components/ui`, `src/components/common`, `src/components/pages`, or one oversized `App.tsx`.
- If an existing shadcn/ui setup uses `components/ui`, retain its generated primitives and adapt the proposed structure to avoid duplicate primitives.
- Move files safely: update aliases/imports, router references, tests, asset paths, exports and any lazy imports.
- Prevent circular dependencies. Feature components may import shared UI/services; shared UI must not import feature screens.

## 6. Forms: React Hook Form + Zod

- Use **React Hook Form** for meaningful data-entry forms: organisation signup, staff invitations, patient registration, profile linking, NIN/mock identity workflow, record requests, referrals, consent capture, lab result entry, settings and portal activation.
- Use **Zod** schemas with `@hookform/resolvers/zod` where compatible with installed versions; centralise reusable schemas in `src/schemas/` or feature-local schema modules consistently.
- `useForm` must have typed values and explicit `defaultValues`; use `register` for native elements and `Controller` / `useController` for truly controlled UI primitives.
- Show field-level errors, label/input association, disabled/submitting states and accessible messages. Validate before actions update a store. Do not clear fields on failed submissions.
- Use `useFieldArray` for repeating fields. Use `reset` when editing a different entity rather than assuming new `defaultValues` overwrite an already mounted form.
- Keep UI-only transient input (e.g. a simple search box) local unless persistence or validation requires otherwise; do **not** force React Hook Form onto every toggle or filter.
- Form submissions invoke typed feature actions / services, not raw global `localStorage` mutations or unrelated state changes inside JSX.

## 7. State management: Zustand where necessary

- Use **Zustand** for genuine cross-route/shared workflow state: selected organisation and membership, session demo identity, registered patients, record locations, record requests, laboratory workflow, permissions, patient portal activation, notification state, audit events and connected mock organisation data.
- Use component `useState` for transient UI state: dropdown visibility, hover, one-off filter selection, small local dialogs and ephemeral view choices.
- Use React Hook Form for field state; **do not duplicate every form input in Zustand**.
- Create **typed, feature/domain-oriented stores** in `src/stores/`, with actions and selectors. Avoid one giant all-purpose store and direct mutable state edits. Use immutable updates; coordinate related entities atomically.
- Prefer selectors (`useRequestStore(s => s.requests)`) and stable derived selectors; avoid subscribing entire large stores in every component.
- Use Zustand `persist` selectively with versioning/migration and explicit `partialize`. Persist **fictional non-secret mock data only**. Do not store real NIN, passwords, actual clinical documents, credentials, encryption keys or auth tokens in browser persistence.
- Keep seeded patient IDs / record IDs stable, data linked, and dates/events coherent. Ensure action changes update counters, lists, notifications, workflows and audit events across roles.
- Define reusable status transition functions (not magic string comparisons scattered through JSX). Prevent invalid transitions and unauthorised mock actions within the data/service layer.
- If the app already has a sound store setup, refactor it incrementally instead of duplicating stores.

## 8. Design and accessibility standards

- Maintain premium MedAtlas visual quality, compact-but-readable clinical data layout, and responsive behaviour. Avoid turning every page into identical boxed cards.
- Use consistent semantic status variants: success `emerald`, waiting `amber`, in-progress `blue`, declined `red`, inactive `slate`, critical `red` with explicit text and icons where appropriate.
- Keep one shared application shell and role-aware menus; do not duplicate hospital and laboratory sidebars unnecessarily. Patient Portal remains a separate, simpler responsive shell.
- Buttons and links must work; forms perform meaningful validations/actions; list-detail views show correct records; all statuses reflect actual state. Never use generic “preview action recorded” dialogs.
- Use semantic HTML, labelled inputs, keyboard navigation, focus-visible rings, sufficient contrast, appropriate empty/loading/error states and accessible confirmation for destructive operations.

## 9. Mock security and privacy rules

- Use **fictional patients, organisations, staff, NIN tokens and reports only**. A MedAtlas ID alone must not unlock records. Patient portal activation requires a separate scoped mock activation flow linked to an existing patient profile.
- No real NIN lookup, HIE/SHR exchange, live clinical transmission, blockchain attestation or verified government certification should be claimed.
- Model mock access checks with organisation, role, patient identity, request purpose and applicable authorisation. Do not expose all record locations automatically.
- Simulated frontend permission checks are **not production security**. Keep seams ready for real backend authentication/authorisation later; do not pretend localStorage is secure health-record storage.

## 10. Testing and completion contract

- Run the repository's actual scripts (`typecheck`, `lint`, `test`, `build`, E2E if available) after changes. Do not invent scripts or claim checks passed if not run.
- Test key routes and responsive layouts; verify React Hook Form validation, Zustand persistence, role-aware navigation and consistent counts.
- Test the end-to-end fictional scenario: hospital registers/verifies patient → network discovery → requests record → source hospital/lab authorises and releases → receiving hospital sees it → activated patient portal sees eligible records and applicable permissions.
- Add/adjust tests for critical state transitions, identity matching/duplicate handling, consent, report release, portal activation and route access.
- No broken imports/routes, no residual obsolete CSS dependencies, no UI-only fake success messages, no new TypeScript errors.
- At completion, provide a concise report: files moved, shared components created, CSS/arbitrary-value conversions, forms migrated, stores changed, tests run/results, visual trade-offs, and any justified exceptions or incomplete work.

## 11. Scope discipline and quality bar

- Prefer small, reviewable migrations by module over an uncontrolled one-pass rewrite.
- Preserve existing user-facing functionality, patient portal, hospital/lab workflows, routes (or redirect them safely), and shared mock data.
- Avoid wholesale changing user flows without a direct request. When ambiguity arises, inspect the current working behaviour and take the least destructive path.
- Do not introduce backend infrastructure, live healthcare integrations or blockchain as part of a frontend Tailwind/form/state refactor.
- Refactor for maintainability and correctness, not just prettier code.

This instruction takes precedence over previous refactoring, CSS migration, component restructuring and code-quality instructions wherever they conflict.

**YOUR RESPONSIBILITY IS TO IMPROVE THE INTERNAL CODE QUALITY WITHOUT CHANGING THE EXISTING USER EXPERIENCE.**

The application has already been designed, and its user-facing content has already been written.

You are NOT authorised to redesign the application, rewrite content, rename features, reorganise navigation or change the product's functionality unless I explicitly request those changes.

This is a **behaviour-preserving and visually preserving code refactor**.

---

## . ABSOLUTE CONTENT PRESERVATION

All existing user-facing text must remain exactly as it is.

This includes:

- Page titles and headings.
- Section headings.
- Dashboard greetings.
- Descriptions and supporting text.
- Navigation labels.
- Sidebar headings.
- Button labels.
- Form labels.
- Input placeholders.
- Helper text.
- Validation messages.
- Error messages.
- Success messages.
- Notifications.
- Confirmation dialogs.
- Modal titles and descriptions.
- Table headings.
- Status labels.
- Empty-state messages.
- Tooltips.
- Breadcrumbs.
- Account and organisation information.
- Healthcare workflow descriptions.
- Patient information displayed from existing mock data.
- Landing page content.
- Signup and login content.
- Footer content.
- Accessibility labels and screen-reader text.

Do not rewrite, paraphrase, shorten, expand, simplify or otherwise alter any existing text.

### Strict examples

If the current interface says:

"Search Healthcare Network"

Do not change it to:

"Discover Records"

If it says:

"Awaiting Authorisation"

Do not change it to:

"Pending Approval"

If it says:

"Find or Register Patient"

Do not change it to:

"Patient Management"

If it says:

"Connected Providers"

Do not change it to:

"Healthcare Network"

If it says:

"Request Medical Records"

Do not change it to:

"Request Records"

Even where the replacement sounds more professional, consistent or technically correct, the existing text must be preserved.

**Do not make unsolicited copywriting improvements.**

Do not fix spelling, grammar, punctuation, capitalisation or formatting of existing user-facing strings unless specifically instructed.

Do not silently change terminology used in MedAtlas.

---

## . ABSOLUTE DESIGN PRESERVATION

The existing MedAtlas visual design must remain unchanged unless I explicitly request a design modification.

Preserve:

- Exact layout structure.
- Existing visual hierarchy.
- Brand colours.
- Background colours.
- Text colours.
- Font families.
- Font sizes.
- Font weights.
- Letter spacing.
- Line heights.
- Padding and margins.
- Gaps between elements.
- Sidebar width.
- Sidebar position.
- Header height.
- Navigation grouping.
- Card dimensions.
- Border radii.
- Borders.
- Shadows.
- Table layouts.
- Column widths.
- Button appearances.
- Icon sizes.
- Icon selection.
- Element alignment.
- Responsive behaviour.
- Hover states.
- Focus states.
- Active states.
- Loading states.
- Status colours.
- Modal dimensions.
- Form layout.
- Mobile layouts.
- Page composition.

Do not modify the design simply because a different layout seems more modern.

Do not replace existing components with visually different alternatives.

Do not introduce new styling conventions unless explicitly requested.

The goal is to make the code cleaner while keeping the rendered application visually equivalent to the original.

---

## . TAILWIND CSS REFACTORING RULES

Previous instructions requested migration toward standard Tailwind CSS utilities.

Continue following that instruction, but **visual preservation now has higher priority than forcing every value into a built-in Tailwind class**.

### Conversion rules

1. Inspect the current styling before changing it.
2. Prefer existing standard Tailwind utilities when they produce the same or visually equivalent result.
3. Do not silently select a nearby utility if it noticeably changes the appearance.
4. Preserve the existing responsive behaviour.
5. Preserve the original colours and typography.
6. Do not replace brand colours with unrelated Tailwind palette colours.
7. Do not introduce arbitrary visual changes merely to eliminate arbitrary utility syntax.
8. Keep reusable design tokens consistent with the existing UI.

### Important clarification

If the original background is:

`#174F3D`

Do not blindly replace it with `bg-emerald-900` if that changes the visible brand colour.

Instead, use an approved semantic Tailwind design token such as:

`bg-primary`

and define that token to reproduce the original colour, using the configuration approach appropriate for the project's Tailwind version.

This is allowed because it improves code standardisation without redesigning the interface.

Similarly:

If `w-[270px]` cannot be converted to a built-in utility without visibly changing the layout, prefer an existing reusable semantic size token or defer that conversion.

Do not choose `w-64` or `w-72` merely to eliminate brackets if the result changes the sidebar width.

### Priority order

When converting styles, follow this order:

1. Preserve the existing rendered result.
2. Reuse an existing Tailwind utility where equivalent.
3. Reuse an existing approved design token.
4. Introduce a clearly named reusable semantic token where necessary.
5. Leave the existing value temporarily and document the exception if a safe conversion is not possible.

Never sacrifice design fidelity simply to meet a class-name convention.

---

## . REACT COMPONENT RESTRUCTURING

You may reorganise the internal component architecture as previously instructed.

For example:

`components/landing/`

`components/auth/`

`components/hospital/`

`components/laboratory/`

`components/patient/`

`components/network-discovery/`

`components/record-exchange/`

`components/shared/`

However, restructuring must not change what users see.

### Allowed

- Moving components to appropriate directories.
- Splitting large components into smaller reusable components.
- Extracting duplicated internal logic.
- Improving TypeScript types.
- Updating imports.
- Creating shared hooks.
- Improving internal code readability.
- Standardising internal naming conventions.
- Separating data access from presentation.

### Not allowed

- Changing visible headings.
- Changing sidebar content.
- Renaming buttons.
- Rearranging displayed content.
- Reordering navigation items.
- Removing existing interface sections.
- Replacing complex screens with simplified layouts.
- Changing page structure.
- Removing useful existing functionality.
- Replacing real application interactions with placeholders.
- Changing routes unnecessarily.

Component names may change internally, but the visible application must remain the same.

---

## . REACT HOOK FORM AND ZOD MIGRATION

Continue using React Hook Form and Zod for appropriate forms.

However, converting forms must not change their existing user experience.

Preserve:

- All form titles.
- All field labels.
- All placeholders.
- All supporting descriptions.
- All field ordering.
- All required and optional fields.
- All button labels.
- All existing validation messages.
- All current form sections.
- Existing validation behaviour unless it is genuinely broken.
- Existing submit behaviour.
- Existing success and error feedback.
- Existing data relationships.

Do not add unnecessary fields.

Do not remove fields.

Do not rename form fields that are visible to the user.

Do not change form layouts.

Do not redesign existing input components.

If the original form contains an existing validation message, preserve its wording.

If a migration requires a new internal validation rule to protect an existing invariant, implement the rule without changing unrelated form content or behaviour.

---

## 6. ZUSTAND STATE MANAGEMENT

Use Zustand where shared application state genuinely requires it.

Do not migrate all state into Zustand unnecessarily.

Preserve the existing application behaviour.

This includes:

- Existing patient records.
- Hospital workspaces.
- Laboratory workspaces.
- Patient Portal.
- Facility-led patient registration.
- NIN-based mock identity workflows.
- MedAtlas patient identification.
- Network discovery.
- Record requests.
- Authorisation workflows.
- Diagnostic reports.
- Exchange histories.
- Notifications.
- Staff accounts.
- Organisation memberships.
- Existing mock-data persistence.

Do not replace the existing seed data with newly invented content.

Do not change displayed patient names, fictional hospital names, record titles, dates, transaction identifiers or workflow statuses unless absolutely required to resolve a verified defect.

Do not reset existing locally stored mock data during the refactor.

A Zustand migration should change how state is managed internally, not what users experience.

---

## 7. PRESERVE ALL APPLICATION WORKFLOWS

All existing workflows must continue working exactly as before.

Preserve the existing behaviour of:

- Organisation registration.
- Healthcare professional onboarding.
- Patient Portal activation.
- Patient login.
- Facility-led patient registration.
- Existing-patient lookup.
- Identity verification.
- MedAtlas ID generation.
- Network discovery.
- Record request submission.
- Request authorisation.
- Laboratory report review.
- Report release.
- Record exchange.
- Consent decisions.
- Notifications.
- Audit history.
- Facility settings.
- Staff management.

Do not introduce new workflow steps.

Do not remove existing workflow steps.

Do not change action permissions unless explicitly instructed or necessary to fix a verified security-related defect.

If an existing workflow has a problem, document it separately instead of silently redesigning it during a structural migration.

---

## 8. PRESERVE SIDEBAR AND NAVIGATION CONTENT

The sidebar must remain visually and functionally identical.

This applies to every user role.

Preserve the exact:

- Sidebar headings.
- Navigation labels.
- Section groupings.
- Menu item order.
- Navigation icons.
- Active states.
- Sidebar width.
- Spacing.
- Role-specific visibility.
- Organisation identity display.
- Profile controls.

Do not rename sections.

Do not merge navigation items.

Do not move items between sections.

Do not remove menu options simply because another navigation structure appears cleaner.

All existing routes must continue working.

---

## 9. DO NOT CHANGE THE LANDING PAGE CONTENT

The public MedAtlas landing page is already designed.

Do not rewrite:

- Hero headline.
- Hero supporting text.
- Feature descriptions.
- Product explanations.
- Calls to action.
- Navigation labels.
- Section titles.
- Footer content.

Do not replace existing images or icons.

Do not change the page composition.

Do not add marketing claims.

Do not simplify sections.

You may move the landing page implementation into `components/landing` and extract reusable components, but the final rendered page must remain visually and textually unchanged.

---

## 10. CONTROLLED REFACTORING PROCESS

Before making modifications:

1. Inspect the existing repository.
2. Identify the component or feature being refactored.
3. Record the existing user-facing text.
4. Review the current styling and layout.
5. Identify the existing interactions and state dependencies.
6. Determine the smallest necessary code changes.
7. Perform the refactor.
8. Compare the result with the original.
9. Verify that no text or design changes occurred.
10. Verify that the functionality still works.

Do not perform a sweeping redesign across the repository.

Work feature by feature.

Keep changes small enough to review.

Prefer mechanical, behaviour-preserving transformations over speculative improvements.

---

## 11. REVIEW AND RESTORE UNINTENDED CHANGES

Some previous migration work has already changed user-facing text and content.

Your first responsibility is to identify and correct those unintended changes.

### Required process

1. Inspect the current Git working tree and available history.
2. Identify the original source version that existed before the previous Codex refactor.
3. Compare the original and modified versions.
4. Identify changes to visible text, labels, layout and user-facing content.
5. Restore only the changes that were not explicitly requested.
6. Preserve legitimate internal code refactoring.
7. Preserve any subsequent changes I intentionally made.
8. Verify the restored screens still function.

Do not blindly reset the entire repository.

Do not use destructive commands such as `git reset --hard` or discard unrelated work.

If the original content cannot be found in Git history, backups or existing project files, do not invent replacement wording.

Instead, identify the affected screen and report the missing baseline so I can provide the correct original content.

### Priority

Restoring unintended content changes is more important than completing additional refactoring.

---

## 12. AUTOMATED AND MANUAL VERIFICATION

Use available checks to detect accidental changes.

### Code checks

Run:

- TypeScript type checking.
- ESLint.
- Existing unit tests.
- Existing integration tests.
- Production build.

Use the actual scripts and tools configured in the repository.

Do not assume a command exists without inspecting `package.json`.

### Text preservation checks

Compare original and refactored user-facing strings wherever possible.

Inspect:

- JSX text nodes.
- Translation or content files.
- Button labels.
- Input placeholders.
- Form labels.
- Alert messages.
- Notifications.
- Table headings.
- Sidebar configuration.
- Mock data values.

If necessary, create a temporary comparison script to identify strings that were added, removed or modified.

Do not treat internal identifier renaming as a user-facing content change.

### Visual regression checks

Where a browser or screenshot testing tool is available:

1. Capture representative screens before the refactor using the same viewport and mock-data state.
2. Capture the same screens afterward.
3. Compare the screenshots.
4. Investigate unexpected differences in layout, typography, colour or content.
5. Correct changes introduced by the refactor.

Review hospital, laboratory, patient, login, signup and landing page screens.

Do not claim pixel-perfect preservation unless it has actually been verified.

### Functional checks

Verify that all existing core interactions still work.

Do not use a successful TypeScript build as the only evidence that the refactor is correct.

---

## 13. PROHIBITED UNREQUESTED ACTIONS

Unless I expressly instruct otherwise, DO NOT:

- Rewrite copy.
- Fix grammar.
- Change terminology.
- Rename visible features.
- Change brand colours.
- Change fonts.
- Change layouts.
- Rearrange sections.
- Remove screens.
- Add screens.
- Change sidebar navigation.
- Change workflow steps.
- Change existing mock data.
- Replace icons.
- Replace images.
- Change user roles.
- Change button behaviour.
- Change form content.
- Change product scope.
- Introduce new features.
- Introduce a backend.
- Introduce new external services.
- Add visual effects.
- Apply personal design preferences.

Do not interpret "clean up", "standardise", "refactor" or "optimise" as permission to change user-facing content or design.

---

## 14. WHEN A CHANGE IS UNAVOIDABLE

If an internal refactor cannot be completed without altering a user-facing detail:

1. Do not silently make the change.
2. Identify the exact file and affected component.
3. Explain what would change.
4. Explain why the change appears necessary.
5. Prefer a technically sound solution that preserves the existing appearance and behaviour.
6. If no such solution exists, leave that portion unchanged and list it as requiring approval.

Do not make the design or content decision on my behalf.

The requirement to preserve existing content takes priority over speculative code improvements.

---

## 15. REPORTING REQUIREMENTS

After completing each refactoring phase, provide:

**Files changed**

List the components, hooks, stores, schemas or configuration files modified.

**Internal improvements**

Describe the technical changes made.

**Content preservation**

Confirm whether visible text and mock data were preserved, based on actual review.

**Visual preservation**

Describe the visual checks performed and whether any differences remain.

**Functional verification**

List the tests or workflows checked.

**Exceptions**

Report any values or styles that could not safely be converted without changing the UI.

**Outstanding issues**

Identify anything requiring further attention.

Do not claim everything was preserved if you did not perform the relevant checks.

---

# FINAL ENFORCEMENT RULE

The existing MedAtlas application is the source of truth for all user-facing content, design, layout, branding, navigation and established functionality.

The purpose of this refactor is to improve:

- Code organisation.
- Component reusability.
- Tailwind CSS consistency.
- TypeScript quality.
- React Hook Form integration.
- Zod validation.
- Zustand state management.
- Maintainability.
- Internal architectural quality.

It is NOT to change:

- What the application says.
- What the application looks like.
- What the user sees.
- How the user navigates.
- How existing workflows behave.

**NO CONTENT CHANGES.**

**NO VISUAL DESIGN CHANGES.**

**NO UNREQUESTED FUNCTIONALITY CHANGES.**

**REFACTOR THE IMPLEMENTATION, NOT THE PRODUCT.**

Apply this rule to all future MedAtlas refactoring tasks unless I explicitly override it.

## IMMEDIATE TASK

First, inspect the changes made during the previous migration and restore any unintended user-facing text or design modifications.

Then continue the remaining architectural refactor under these preservation requirements.

Do not rebuild the application from scratch.

Do not overwrite newer intentional changes.

Do not proceed with additional feature development.

Keep the existing MedAtlas experience intact.
