'use client';
import { Link } from "@/lib/workflow-router";
import { Activity, ArrowRight, Building2, ChevronRight, FileCheck2, FileClock, FileText, Link2, ShieldCheck } from "lucide-react";
import { useMockData } from "@/stores/workflow/useMockData";
import { PatientEmptyState } from './PatientEmptyState';
import { HealthSummaryCard } from './HealthSummaryCard';
import { RecentDocumentCard } from './RecentDocumentCard';
import { WelcomeSection } from './WelcomeSection';

export function PatientDashboard() {
  const store = useMockData()
  const account = store.currentPatientAccount
  const documents = store.patientDocuments()
  const links = store.state.patientLinks.filter(
    (item) => item.accountId === account.id && item.status === "Linked",
  )
  const permissions = store.state.sharingPermissions.filter(
    (item) => item.accountId === account.id,
  )
  const pending = permissions.filter(
    (item) => item.status === "Pending Decision",
  )
  const notifications = store.state.patientNotifications
    .filter((item) => item.accountId === account.id)
    .slice(0, 4)
  const providers = Array.from(new Set(links.map((item) => item.facility)))

  return (
    <div className="mx-auto max-w-328 px-8 pt-7 pb-12 max-md:px-4 max-md:pt-5 max-md:pb-24" data-slot="patient-page">
      <WelcomeSection />
      <div >
        <HealthSummaryCard
          icon={FileText}
          value={documents.length}
          label="Available records"
          detail="Released for you to view"
          to="/patient/records"
        />
        <HealthSummaryCard
          icon={FileCheck2}
          value={
            documents.filter((item) =>
              item.category.toLowerCase().includes("laboratory"),
            ).length
          }
          label="Diagnostic reports"
          detail="Available laboratory information"
          to="/patient/records?category=Laboratory%20Results"
        />
        <HealthSummaryCard
          icon={Building2}
          value={providers.length}
          label="Healthcare providers"
          detail="Connected record sources"
          to="/patient/providers"
        />
        <HealthSummaryCard
          icon={ShieldCheck}
          value={pending.length}
          label="Sharing requests"
          detail={
            pending.length ? "Waiting for your decision" : "Nothing pending"
          }
          to="/patient/sharing"
        />
      </div>

      {pending.length > 0 && (
        <section >
          <div>
            <span>
              <ShieldCheck size={21} />
            </span>
            <div>
              <small>Request requiring your attention</small>
              <h2 className="tracking-tight not-italic">
                {pending[0].requestingOrganisation} would like to access your{" "}
                {pending[0].recordCategory.toLowerCase()}.
              </h2>
              <p>
                Review who is requesting it, the intended purpose and the exact
                sharing scope before you decide.
              </p>
            </div>
          </div>
          <Link to="/patient/sharing" className="
            transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
            focus-visible:outline-emerald-700/32
          ">
            Review sharing request
            <ArrowRight size={16} />
          </Link>
        </section>
      )}

      <div >
        <section >
          <div >
            <div>
              <span>Recently available</span>
              <h2 className="tracking-tight not-italic">Latest health information</h2>
            </div>
            <Link to="/patient/records" className="
              transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
              focus-visible:outline-emerald-700/32
            ">View all records</Link>
          </div>
          {documents.length ? (
            <div >
              {[...documents]
                .sort((a, b) => b.date.localeCompare(a.date))
                .slice(0, 3)
                .map((document) => (
                  <RecentDocumentCard document={document} key={document.id} />
                ))}
            </div>
          ) : (
            <PatientEmptyState
              title="No health records available yet"
              text="Once your records are linked and available, you can find them here."
              action={
                <Link to="/patient/records/connect" className="
                  transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
                  focus-visible:outline-emerald-700/32
                ">Connect my records</Link>
              }
            />
          )}
        </section>

        <section >
          <div >
            <div>
              <span>What’s changed</span>
              <h2 className="tracking-tight not-italic">Recent activity</h2>
            </div>
            <Link to="/patient/activity" className="
              transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
              focus-visible:outline-emerald-700/32
            ">View activity</Link>
          </div>
          {notifications.map((item) => (
            <Link to={item.href} key={item.id} className="
              transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
              focus-visible:outline-emerald-700/32
            ">
              <span>
                {item.type === "Record Available" ? (
                  <FileText size={17} />
                ) : item.type === "Sharing Request" ? (
                  <ShieldCheck size={17} />
                ) : (
                  <Activity size={17} />
                )}
              </span>
              <div>
                <strong className="tabular-nums">{item.title}</strong>
                <p>{item.message}</p>
                <small>{item.at}</small>
              </div>
              <ChevronRight size={16} />
            </Link>
          ))}
        </section>
      </div>

      <section >
        <div >
          <div>
            <span>Your care network</span>
            <h2 className="tracking-tight not-italic">My healthcare providers</h2>
          </div>
          <Link to="/patient/providers" className="
            transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
            focus-visible:outline-emerald-700/32
          ">View all providers</Link>
        </div>
        <div >
          {providers.slice(0, 3).map((name) => {
            const organisation = store.state.organisations.find(
              (item) => item.name === name,
            )
            return (
              <Link to={`/patient/providers/${organisation?.id}`} key={name} className="
                transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
                focus-visible:outline-emerald-700/32
              ">
                <span>
                  <Building2 size={19} />
                </span>
                <div>
                  <strong className="tabular-nums">{name}</strong>
                  <small>
                    {organisation?.type ?? "Healthcare provider"} ·{" "}
                    {organisation?.location ?? "Location not recorded"}
                  </small>
                </div>
                <ChevronRight size={16} />
              </Link>
            )
          })}
        </div>
      </section>

      <section >
        <div>
          <span>Useful shortcuts</span>
          <h2 className="tracking-tight not-italic">What would you like to do?</h2>
        </div>
        <div>
          {[
            ["/patient/records", "View my records", FileText],
            ["/patient/sharing", "Review sharing requests", ShieldCheck],
            ["/patient/records/connect", "Connect my records", Link2],
            ["/patient/requests/new", "Request a record", FileClock],
            ["/patient/activity", "View activity", Activity],
          ].map(([to, label, Icon]) => (
            <Link to={to as string} key={label as string} className="
              transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
              focus-visible:outline-emerald-700/32
            ">
              <Icon size={19} />
              <span>{label as string}</span>
              <ChevronRight size={15} />
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
