# Tailwind v4 entrypoint and IntelliSense

The source of truth is `src/app/globals.css`, containing only `@import "tailwindcss";`. There are no custom theme variables, selector variants, utility definitions, JSON theme or custom PostCSS loader. PostCSS uses `@tailwindcss/postcss` directly and the root layout imports this entrypoint.

`.vscode/settings.json` maps IntelliSense to this entrypoint and enables suggestions inside strings. The installed IntelliSense 0.16.0 server loaded Tailwind 4.3.3 and successfully returned `bg-emerald-900` completions for a TypeScript React document at `OrganisationRegistration.tsx` after the default-utility migration.

If an existing VS Code window has stale suggestions, use `Developer: Reload Window`. The editor settings JSON is standard VS Code configuration, not a styling theme.

See [Default Tailwind cleanup](default-tailwind-cleanup.md) for scope, visual approximations and verification.
