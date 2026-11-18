import React from "react";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Hero from "./components/sections/Hero";
import TrustStrip from "./components/sections/TrustStrip";
import Problem from "./components/sections/Problem";
import Stats from "./components/sections/Stats";
import Solution from "./components/sections/Solution";
import HowItWorks from "./components/sections/HowItWorks";
import OfflineFirst from "./components/sections/OfflineFirst";
import Ecosystem from "./components/sections/Ecosystem";
import Comparison from "./components/sections/Comparison";
import Benefits from "./components/sections/Benefits";
import EMRComparison from "./components/sections/EMRComparison";
import PrototypeCTA from "./components/sections/PrototypeCTA";
import Roadmap from "./components/sections/Roadmap";
import FutureVision from "./components/sections/FutureVision";
import CTA from "./components/sections/CTA";
import Experiences from "./components/sections/Experiences";
import PatientJourney from "./components/sections/PatientJourney";
import ProviderJourney from "./components/sections/ProviderJourney";
import ConnectedCareCTA from "./components/sections/ConnectedCareCTA";

export default function App() {
  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      <Hero />
      <TrustStrip />
      <Experiences />
      <Problem />
      <Stats />
      <Solution />
      <HowItWorks />
      <PatientJourney />
      <ProviderJourney />
      <OfflineFirst />
      <Ecosystem />
      <Comparison />
      <Benefits />
      <EMRComparison />
      <PrototypeCTA />
      <Roadmap />
      <FutureVision />
      <CTA />
      <ConnectedCareCTA />
      <Footer />
    </div>
  );
}
