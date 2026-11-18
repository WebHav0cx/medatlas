import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";

export default function nextConfig(phase) {
  return {
    // Keep production builds from overwriting chunks used by a running dev server.
    distDir: phase === PHASE_DEVELOPMENT_SERVER ? ".next-dev" : ".next",
  };
}
