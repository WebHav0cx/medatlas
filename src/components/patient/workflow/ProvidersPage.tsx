'use client';
import { Link } from "@/lib/workflow-router";
import { Building2, Info, Plus } from "lucide-react";
import { useMockData } from "@/stores/workflow/useMockData";
import { PatientPageHeader } from './PatientPageHeader';
import { PatientEmptyState } from './PatientEmptyState';
import { ProviderCard } from './ProviderCard';

export function ProvidersPage() {
  const store = useMockData()
  const account = store.currentPatientAccount
  const links = store.state.patientLinks.filter(
    (item) => item.accountId === account.id,
  )
  const organisations = links
    .map((link) => ({
      link,
      organisation: store.state.organisations.find(
        (item) => item.name === link.facility,
      ),
    }))
    .filter((item) => item.organisation)
  return (
    <div className="mx-auto max-w-328 px-8 pt-7 pb-12 max-md:px-4 max-md:pt-5 max-md:pb-24" data-slot="patient-page">
      <PatientPageHeader
        eyebrow="My care network"
        title="My Healthcare Providers"
        subtitle="Healthcare organisations associated with your linked records or active requests."
        action={
          <Link  to="/patient/records/connect" className="
            transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
            focus-visible:outline-emerald-700/32
          ">
            <Plus size={17} />
            Connect a provider
          </Link>
        }
      />
      {organisations.length ? (
        <div >
          {organisations.map(({ link, organisation }) => (
            <ProviderCard
              organisation={organisation!}
              status={link.status}
              recordCount={
                link.status === "Linked"
                  ? store
                      .patientDocuments()
                      .filter(
                        (item) => item.sourceFacility === organisation!.name,
                      ).length
                  : 0
              }
              key={link.id}
            />
          ))}
        </div>
      ) : (
        <PatientEmptyState
          icon={Building2}
          title="No healthcare providers connected"
          text="Connect a participating provider to begin a reviewed record-linking request."
          action={<Link to="/patient/records/connect" className="
            transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
            focus-visible:outline-emerald-700/32
          ">Connect my records</Link>}
        />
      )}
      <div >
        <Info size={18} />
        <p>
          A provider shown here is associated with a record link or request. It
          does not by itself establish a clinical relationship or verified
          facility status.
        </p>
      </div>
    </div>
  )
}
