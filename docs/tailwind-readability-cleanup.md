# Tailwind readability cleanup

This phase removes redundant utility declarations and improves source readability. It does not change the default Tailwind design selected in the previous phase.

## Changes

- Reviewed all source files and changed 120 UI/source files across landing, auth, hospital, laboratory, patient and shared components.
- Removed 1,782 redundant default declarations: repeated inherited sans fonts in workspaces with no alternate font ancestors; unnecessary zero margins/padding where Tailwind preflight already supplies zero and no competing shorthand needs an override; no-op animation/shadow resets; redundant solid border/outline declarations.
- Removed 36 fully overridden class occurrences using the installed compiler's declaration sets, stylesheet order and proven structural conditions.
- Simplified 422 positional variant occurrences where the existing JSX determines the relevant first/last-child state. Conditional branches and fragments were checked against their actual native parent. Uncertain cases and conflicting partial declarations were retained.
- Removed all 19 generated numbered group markers after their descendant conditions were resolved; no numbered scope groups remain.
- Removed 10 empty `className` attributes.
- Factored repeated badge layout classes into a local `badgeClasses` constant in hospital `Status.tsx` and laboratory `LabStatus.tsx`. Hospital tone variants now have a descriptive `toneClasses` name. Visible statuses, icons and tone decisions are unchanged.
- Ordered complete class strings using the installed Tailwind compiler and wrapped long strings, including variant maps. No dependency, custom theme, CSS alias, selector registry, inline style or arbitrary utility was added.
- Extended `scripts/check-tailwind-styles.mjs` to reject duplicate utilities within a literal and empty styling attributes, alongside its existing legacy-alias and default-compiler checks.

Baseline checkpoint: `/tmp/medatlas-before-readable-utilities.tgz`. The working tree contained existing user changes; no Git reset, commit or broad restoration was used. No files were moved and no forms, stores, schemas or business rules were migrated in this styling-only phase.

## Preservation

The existing default palette, fonts, spacing, layout, navigation, field order and workflows are retained. Required focus/disabled/responsive/motion states and meaningful resets remain. Standard utilities such as `tabular-nums` are retained.

Text comparison passes across all 151 components. Fixtures, domain logic, schemas, repositories/services, stores and tests are byte-identical to this phase's checkpoint. Existing user browser data was not reset; browser checks used an isolated profile and synthetic fixtures.

## Verification

- Baseline style audit: 186 JSX/TSX files, 973 distinct complete utilities/markers. Baseline tests: all 19 passed.
- Final `npm run check:styles`: all 186 files pass; 775 distinct complete utilities/markers. The entrypoint still contains only the Tailwind import.
- `npm run typecheck`: passes.
- `npm test`: all 19 pass.
- `npm run build`: passes, including framework type validation and 18 static pages. No standalone ESLint script is configured.
- `git diff --check`: passes.
- Compared 26 matched before/after screenshots: 25 have identical pixels; the remaining difference is confined to the four-pixel browser scrollbar strip on a 375px mobile capture. The page content matches. All 70 computed-property differences across these screens are transparent zero-size shadow values becoming `none`, with no visible effect.
- The matched screen set includes sign-in, signup, hospital, laboratory, patient, organisation/professional onboarding, 16 provider screens, tablet and mobile. Additional captures cover all 19 landing sections and mobile action screens; these additional states were not claimed as matched pixel comparisons.
- Browser suite passes 87 role-specific routes, all eight staff roles, hospital/laboratory mobile navigation, organisation registration/validation/approval, staff invitation, facility-led patient registration, diagnostic request through reviewer release to hospital and linked patient record, and patient account setup/reviewed linking without creating a clinical identity. No runtime exceptions were reported.
- The final pass after these browser checks only orders class tokens, wraps strings and removes empty attributes; it does not alter utility sets or workflow logic. SHA-256 comparison confirms the final build generates byte-identical CSS to the browser-verified cleanup build.

## Changed files

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
- `src/components/common/ExperienceLink.tsx`
- `src/components/common/Footer.jsx`
- `src/components/common/Navbar.tsx`
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
- `src/components/shared/workflow/AccessDenied.tsx`
- `src/components/shared/workflow/Brand.tsx`
- `src/components/shared/workflow/WorkflowFrame.tsx`
- `scripts/check-tailwind-styles.mjs`
