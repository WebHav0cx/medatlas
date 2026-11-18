'use client';
import { useState } from "react";
import { AlertCircle, Check, MoreHorizontal, Search, UserPlus } from "lucide-react";
import { Page } from './Page';

export function UsersPage() {
  const [invite, setInvite] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  return (
    <Page
      title="Users & Roles"
      subtitle="Manage CityCare Hospital memberships and access."
      action={
        <button
          className="
            inline-flex min-h-10 cursor-pointer items-center justify-center gap-1.5 rounded-lg border
            border-emerald-900 bg-emerald-900 px-3.5 text-xs font-semibold tracking-normal text-white
            no-underline transition duration-160 ease-in-out hover:-translate-y-px hover:border-emerald-900
            hover:bg-emerald-900 focus-visible:outline-3 focus-visible:outline-offset-2
            focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52 max-md:w-full
          " data-slot="provider-primary-action"
          onClick={() => setInvite(true)}
        >
          <UserPlus size={16} />
          Invite User
        </button>
      }
    >
      <div className="mb-4 grid grid-cols-3 gap-3 max-md:gap-1.5" data-slot="hospital-summary">
        {[
          ["12", "Active users"],
          ["2", "Pending invitations"],
          ["6", "Configured roles"],
        ].map(([value, label]) => (
          <div key={label} className="flex flex-col rounded-lg border border-mist-200 bg-white p-3">
            <strong className="text-lg tabular-nums">{value}</strong>
            <span className="text-xs text-olive-600">{label}</span>
          </div>
        ))}
      </div>
      <section className="overflow-clip rounded-xl border border-mist-200 bg-white" data-slot="workspace-card data-card">
        <div className="mb-3 flex gap-2.5 border-b border-b-mist-200 p-3 max-md:flex-col" data-slot="data-tools">
          <div className="flex min-h-10.5 flex-1 items-center gap-1.5 rounded-md border border-mist-200 px-2.5 text-olive-500">
            <Search size={17} />
            <input placeholder="Search users" className="
              h-auto min-h-10.5 flex-1 rounded-md border-mist-200 bg-white text-xs text-mist-800 outline-hidden
              transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
              focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
              disabled:cursor-not-allowed disabled:opacity-52
            " />
          </div>
          <select className="
            h-9 min-h-10.5 w-full rounded-md border border-mist-200 bg-white px-2.5 text-xs text-mist-800
            transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
            focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
            disabled:cursor-not-allowed disabled:opacity-52
          ">
            <option>All roles</option>
            <option>Clinician</option>
            <option>Medical Records Officer</option>
          </select>
        </div>
        <div  data-slot="responsive-table">
          <div  data-slot="table-header" className="
            sticky top-0 z-2 grid min-h-11 grid-cols-5 items-center gap-3 border-b border-b-taupe-100
            bg-slate-50 px-4 py-2.5 text-xs font-semibold tracking-wider text-olive-500 uppercase
            max-md:hidden
          ">
            <span>User</span>
            <span>Role</span>
            <span>Department</span>
            <span>Status</span>
            <span>Last Active</span>
            <span />
          </div>
          {[
            [
              "Dr. T. Okafor",
              "Clinician",
              "Internal Medicine",
              "Active",
              "Now",
            ],
            [
              "A. Ogunleye",
              "Medical Records Officer",
              "Health Records",
              "Active",
              "18 min ago",
            ],
            [
              "S. Adeyemi",
              "Registration Officer",
              "Front Desk",
              "Active",
              "2 hours ago",
            ],
          ].map((row) => (
            <button  data-slot="table-data-row" key={row[0]} className="
              grid min-h-15 w-full cursor-pointer grid-cols-5 items-center gap-3 border-0 border-t
              border-t-taupe-100 bg-white px-4 py-2.75 text-left text-xs text-olive-600 transition duration-160
              ease-in-out hover:bg-slate-50 focus-visible:relative focus-visible:z-3 focus-visible:outline-3
              focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed
              disabled:opacity-52 max-md:grid max-md:grid-cols-2 max-md:gap-2 max-md:p-3.5
            ">
              {row.map((cell, index) => (
                <span
                  data-label={
                    ["User", "Role", "Department", "Status", "Last Active"][
                      index
                    ]
                  }
                  key={cell} className="max-md:col-start-1 max-md:col-end-auto max-md:flex max-md:items-center max-md:gap-1.5"
                ><span aria-hidden="true" className="hidden max-md:block max-md:w-20 max-md:text-xs max-md:text-olive-500">{["User", "Role", "Department", "Status", "Last Active"][
                      index
                    ]}</span>
                  {index === 3 ? (
                    <i className="
                      flex min-h-6.5 w-max items-center gap-1.25 rounded-md border border-emerald-700/18 bg-emerald-50
                      px-2 py-0.75 text-xs leading-none font-semibold text-emerald-700 not-italic
                    " data-slot="table-status">
                      <Check size={12} />
                      {cell}
                    </i>
                  ) : (
                    cell
                  )}
                </span>
              ))}
              <MoreHorizontal size={17} className="max-md:col-start-2 max-md:col-end-auto max-md:row-start-1 max-md:row-end-auto" />
            </button>
          ))}
        </div>
      </section>
      {invite && (
        <div className="fixed inset-0 z-100 grid place-items-center bg-teal-950/42 p-4 backdrop-blur-xs" data-slot="modal-backdrop">
          <section className="w-96 max-w-full rounded-2xl border border-mist-200 bg-white p-5 shadow-xl" data-slot="invite-modal">
            <div className="flex justify-between">
              <div>
                <small className="text-xs text-olive-500">CityCare Hospital</small>
                <h2 className="my-1 text-xl leading-normal font-normal tracking-tight not-italic normal-nums">Invite User</h2>
              </div>
              <button onClick={() => setInvite(false)} className="
                border-0 bg-transparent text-xl transition duration-160 ease-in-out focus-visible:outline-3
                focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed
                disabled:opacity-52
              ">×</button>
            </div>
            {submitted ? (
              <div className="pt-8 pb-4 text-center text-amber-700" data-slot="invite-result">
                <AlertCircle size={25} />
                <h3 className="tracking-tight text-mist-800 not-italic">Invitation saved locally</h3>
                <p className="text-xs">
                  The staff account was saved with Pending Activation status.
                </p>
                <button onClick={() => setInvite(false)} className="
                  min-h-9 rounded-md border border-mist-200 bg-white px-3 text-xs font-bold text-emerald-900
                  transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
                  focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52
                ">Close</button>
              </div>
            ) : (
              <>
                <div className="mt-5 grid gap-3" data-slot="form-fields">
                  <label className="flex flex-col gap-1.5">
                    <span className="text-xs font-bold text-olive-600">Full Name</span>
                    <input className="
                      h-11 min-h-10.5 rounded-lg border border-mist-300 bg-white px-3 text-xs text-mist-800 transition
                      duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm focus-visible:outline-3
                      focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed
                      disabled:opacity-52
                    " />
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="text-xs font-bold text-olive-600">Work Email</span>
                    <input type="email" className="
                      h-11 min-h-10.5 rounded-lg border border-mist-300 bg-white px-3 text-xs text-mist-800 transition
                      duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm focus-visible:outline-3
                      focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed
                      disabled:opacity-52
                    " />
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="text-xs font-bold text-olive-600">Role</span>
                    <select className="
                      h-11 min-h-10.5 w-full rounded-lg border border-mist-300 bg-white px-3 text-xs text-mist-800
                      transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
                      focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
                      disabled:cursor-not-allowed disabled:opacity-52
                    ">
                      <option>Clinician</option>
                      <option>Medical Records Officer</option>
                      <option>Registration Officer</option>
                    </select>
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="text-xs font-bold text-olive-600">Department</span>
                    <input className="
                      h-11 min-h-10.5 rounded-lg border border-mist-300 bg-white px-3 text-xs text-mist-800 transition
                      duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm focus-visible:outline-3
                      focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed
                      disabled:opacity-52
                    " />
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="text-xs font-bold text-olive-600">Invitation expiry</span>
                    <select className="
                      h-11 min-h-10.5 w-full rounded-lg border border-mist-300 bg-white px-3 text-xs text-mist-800
                      transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
                      focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
                      disabled:cursor-not-allowed disabled:opacity-52
                    ">
                      <option>7 days</option>
                      <option>14 days</option>
                    </select>
                  </label>
                </div>
                <div className="mt-4 flex justify-end gap-2" data-slot="modal-actions">
                  <button onClick={() => setInvite(false)} className="
                    min-h-9 rounded-md border border-mist-200 bg-white px-3 text-xs font-bold text-emerald-900
                    transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
                    focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52
                  ">Cancel</button>
                  <button onClick={() => setSubmitted(true)} className="
                    min-h-9 rounded-md border border-emerald-900 bg-emerald-900 px-3 text-xs font-bold text-white
                    transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
                    focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52
                  ">
                    Save Staff Account
                  </button>
                </div>
              </>
            )}
          </section>
        </div>
      )}
    </Page>
  )
}
