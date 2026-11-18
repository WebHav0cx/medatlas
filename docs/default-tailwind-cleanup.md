> Follow-up: [Tailwind readability cleanup](tailwind-readability-cleanup.md) removes redundant default classes and improves formatting without changing this phase’s design.

# Built-in Tailwind utility cleanup

This phase follows the user's explicit choice to replace custom tokens with default Tailwind utilities, accepting the nearest built-in appearance. It supersedes earlier design-token and selector-migration checkpoints.

## Changes

- Replaced approximately 6,371 custom styling occurrences in 120 source files, spanning landing, auth, hospital, laboratory, patient and shared UI. Final layout cleanup also removed the unused external font stylesheet from the root layout: 121 source files changed in total.
- Removed all 379 custom theme variables, three custom utility definitions, and five custom keyframes. `src/app/globals.css` now contains only `@import "tailwindcss";`.
- Components use built-in palette, font, spacing, radius, shadow, grid/flex, state and responsive utilities. There is no custom Tailwind configuration, JSON theme, selector registry, authored component stylesheet, inline style, or arbitrary utility syntax.
- Mobile data labels previously supplied by custom pseudo-element content are rendered as spans using existing label values. Labels and their ordering are preserved.
- Replaced skeleton shimmer with `animate-pulse`; removed bespoke entrance animations and font-rendering utilities. Standard motion-reduction variants remain.
- Adjusted dashboard metric and attention layouts with ordinary auto-sized grid tracks and flex utilities to prevent cramped content after the standard-scale conversion.
- Strengthened `scripts/check-tailwind-styles.mjs` to require the import-only entrypoint and validate classes against the installed default compiler. Semantic tokens cannot silently return through a custom theme.
- The `.vscode` entrypoint mapping remains. The installed IntelliSense server successfully returns `bg-emerald-900` completions for `OrganisationRegistration.tsx` using Tailwind 4.3.3.

## Preservation and intentional visual differences

Visible JSX text and static accessible/form labels compare unchanged across all 151 components. Data, domain types/rules, schemas, services, stores and tests are byte-identical to the checkpoint for this phase. No components were moved, no workflows or roles were added, and no dependencies were changed.

As authorised, the default palette replaces the previous brand shades; fonts now use Tailwind's system sans/serif stacks. Some typography, spacing, shadows, grid proportions and breakpoint thresholds differ. Custom responsive thresholds use `md`, `lg` and `xl`. Repeating decorative paper lines and bespoke animation effects have no exact default equivalent and were removed or approximated. This phase does not claim pixel-identical preservation.

Standard classes such as `tabular-nums`, named `group` markers and responsive/state variants are retained because they belong to Tailwind itself. `data-slot` attributes remain as existing application/testing hooks; no authored stylesheet targets them.

## Checks

- Baseline: style audit and all 19 tests passed; checkpoint at `/tmp/medatlas-before-default-utilities.tgz`.
- `npm run check:styles`: passes for 186 JSX/TSX files; 973 distinct complete utilities/markers validated after final layout adjustments.
- `npm run typecheck`: passes.
- `npm test`: all 19 pass, covering identity, authorisation, connected exchange, activation and persistence invariants.
- `npm run build`: passes, including framework type validation and all 18 static pages.
- `git diff --check`: passes.
- No standalone ESLint script is configured.
- Production browser verification: 87 role-specific routes; all eight staff accounts; organisation application, validation, approval and own workspace; professional invitation; facility patient registration; diagnostic request through scientist/reviewer release to hospital and linked patient document; portal account creation without a clinical identity and reviewed linking. All pass with no runtime exceptions.
- Browser captures include auth, hospital, laboratory, patient, landing sections, provider screens, tablet and 375px mobile layouts; horizontal-overflow assertions pass. Dashboard refinements were followed by a final production build and targeted screen captures.

## Files

Main changes are all feature component folders, `src/app/layout.jsx`, `src/app/globals.css`, and `scripts/check-tailwind-styles.mjs`. A complete phase-specific inventory follows:

- `src/App.jsx`
- `src/app/globals.css`
- `src/app/layout.jsx`
- `src/components/auth/AccountChoice.tsx`
- `src/components/auth/AccountOverview.tsx`
- `src/components/auth/AuthHeading.tsx`
- `src/components/auth/AuthShell.tsx`
- `src/components/auth/OrganisationSignup.tsx`
- `src/components/auth/PortalActivation.tsx`
- `src/components/auth/SignInPage.tsx`
- `src/components/auth/SignupPage.tsx`
- `src/components/auth/StaffActivation.tsx`
- `src/components/auth/workflow/AlertIcon.tsx`
- `src/components/auth/workflow/AuthShell.tsx`
- `src/components/auth/workflow/JoinCard.tsx`
- `src/components/auth/workflow/MedAtlasEntry.tsx`
- `src/components/auth/workflow/OrganisationRegistration.tsx`
- `src/components/auth/workflow/OrganisationStatus.tsx`
- `src/components/auth/workflow/ProfessionalRegistration.tsx`
- `src/components/auth/workflow/SignupSelection.tsx`
- `src/components/auth/workflow/UnifiedSignIn.tsx`
- `src/components/common/Footer.jsx`
- `src/components/hospital/provider/AuthorizationsPage.tsx`
- `src/components/hospital/provider/ConnectedProvidersPage.tsx`
- `src/components/hospital/provider/DataPage.tsx`
- `src/components/hospital/provider/DataPageContent.tsx`
- `src/components/hospital/provider/EmptyState.tsx`
- `src/components/hospital/provider/EncountersPage.tsx`
- `src/components/hospital/provider/ExchangeMonitoringPage.tsx`
- `src/components/hospital/provider/FacilityRecordsPage.tsx`
- `src/components/hospital/provider/FormSection.tsx`
- `src/components/hospital/provider/IdentityColumn.tsx`
- `src/components/hospital/provider/IdentityResolutionPage.tsx`
- `src/components/hospital/provider/NewPatient.tsx`
- `src/components/hospital/provider/Page.tsx`
- `src/components/hospital/provider/PatientProfile.tsx`
- `src/components/hospital/provider/PatientSearchPage.tsx`
- `src/components/hospital/provider/ProviderDashboardPage.tsx`
- `src/components/hospital/provider/ProviderShell.tsx`
- `src/components/hospital/provider/ReportsPage.tsx`
- `src/components/hospital/provider/SettingsPage.tsx`
- `src/components/hospital/provider/SupportPage.tsx`
- `src/components/hospital/provider/UsersPage.tsx`
- `src/components/hospital/workflow/DetailDrawer.tsx`
- `src/components/hospital/workflow/IdentityResolutionWorkspace.tsx`
- `src/components/hospital/workflow/ModulePage.tsx`
- `src/components/hospital/workflow/PageHeader.tsx`
- `src/components/hospital/workflow/RoleDashboard.tsx`
- `src/components/hospital/workflow/RoleShell.tsx`
- `src/components/hospital/workflow/Status.tsx`
- `src/components/hospital/workflow/WorkflowDialog.tsx`
- `src/components/laboratory/workflow/AdminPage.tsx`
- `src/components/laboratory/workflow/ExchangePage.tsx`
- `src/components/laboratory/workflow/FacilitiesPage.tsx`
- `src/components/laboratory/workflow/InvitationForm.tsx`
- `src/components/laboratory/workflow/LabDashboard.tsx`
- `src/components/laboratory/workflow/LabPageHeader.tsx`
- `src/components/laboratory/workflow/LabShell.tsx`
- `src/components/laboratory/workflow/LabStatus.tsx`
- `src/components/laboratory/workflow/PatientForm.tsx`
- `src/components/laboratory/workflow/PatientsPage.tsx`
- `src/components/laboratory/workflow/RequestsPage.tsx`
- `src/components/laboratory/workflow/ResultDrawer.tsx`
- `src/components/laboratory/workflow/ResultForm.tsx`
- `src/components/laboratory/workflow/ResultsPage.tsx`
- `src/components/laboratory/workflow/SpecimensPage.tsx`
- `src/components/patient/workflow/ActivityPage.tsx`
- `src/components/patient/workflow/ConnectRecordsPage.tsx`
- `src/components/patient/workflow/ConsentDetailPanel.tsx`
- `src/components/patient/workflow/DocumentCategoryFilter.tsx`
- `src/components/patient/workflow/HealthSummaryCard.tsx`
- `src/components/patient/workflow/HealthTimeline.tsx`
- `src/components/patient/workflow/HealthTimelineEvent.tsx`
- `src/components/patient/workflow/HelpPage.tsx`
- `src/components/patient/workflow/NewRequestPage.tsx`
- `src/components/patient/workflow/NotificationsPage.tsx`
- `src/components/patient/workflow/PatientAppShell.tsx`
- `src/components/patient/workflow/PatientButton.tsx`
- `src/components/patient/workflow/PatientDashboard.tsx`
- `src/components/patient/workflow/PatientDocumentViewer.tsx`
- `src/components/patient/workflow/PatientEmptyState.tsx`
- `src/components/patient/workflow/PatientErrorState.tsx`
- `src/components/patient/workflow/PatientNotificationItem.tsx`
- `src/components/patient/workflow/PatientPageHeader.tsx`
- `src/components/patient/workflow/PatientProfileHeader.tsx`
- `src/components/patient/workflow/PatientSignup.tsx`
- `src/components/patient/workflow/ProfilePage.tsx`
- `src/components/patient/workflow/ProviderCard.tsx`
- `src/components/patient/workflow/ProviderDetailPage.tsx`
- `src/components/patient/workflow/ProvidersPage.tsx`
- `src/components/patient/workflow/RecentDocumentCard.tsx`
- `src/components/patient/workflow/RecordDetailPage.tsx`
- `src/components/patient/workflow/RecordLinkingForm.tsx`
- `src/components/patient/workflow/RecordsPage.tsx`
- `src/components/patient/workflow/RequestDetailPage.tsx`
- `src/components/patient/workflow/RequestsPage.tsx`
- `src/components/patient/workflow/SettingsPage.tsx`
- `src/components/patient/workflow/SharingPage.tsx`
- `src/components/patient/workflow/SharingRequestCard.tsx`
- `src/components/patient/workflow/WelcomeSection.tsx`
- `src/components/sections/Benefits.jsx`
- `src/components/sections/CTA.jsx`
- `src/components/sections/Comparison.jsx`
- `src/components/sections/ConnectedCareCTA.jsx`
- `src/components/sections/EMRComparison.jsx`
- `src/components/sections/Ecosystem.jsx`
- `src/components/sections/Experiences.jsx`
- `src/components/sections/FutureVision.jsx`
- `src/components/sections/Hero.jsx`
- `src/components/sections/HowItWorks.jsx`
- `src/components/sections/OfflineFirst.jsx`
- `src/components/sections/PatientJourney.jsx`
- `src/components/sections/Problem.jsx`
- `src/components/sections/PrototypeCTA.jsx`
- `src/components/sections/ProviderJourney.jsx`
- `src/components/sections/Roadmap.jsx`
- `src/components/sections/Solution.jsx`
- `src/components/sections/Stats.jsx`
- `src/components/shared/workflow/AccessDenied.tsx`
- `src/components/shared/workflow/Brand.tsx`
- `src/components/shared/workflow/WorkflowFrame.tsx`
- `scripts/check-tailwind-styles.mjs`
