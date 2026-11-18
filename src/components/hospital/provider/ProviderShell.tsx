'use client';
import { useState } from "react";
import { Link, NavLink } from "@/lib/workflow-router";
import { Bell, Building2, ChevronDown, ClipboardCheck, FileText, MoreHorizontal, ShieldCheck, Wifi } from "lucide-react";
import { Brand } from "@/components/shared/workflow/Brand";
import { navGroups, mobileNav } from './SourceConfig';

export function ProviderShell({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState(false)
  return (
    <div className="min-h-screen bg-slate-50" data-slot="provider-workspace">
      <aside className="
        fixed top-0 right-auto bottom-0 left-0 z-40 flex w-64 flex-col border-r border-r-taupe-100
        bg-white px-3.5 pt-6 pb-4 max-lg:w-58 max-md:hidden max-md:w-0
      ">
        <Brand />
        <div className="mt-4 scrollbar-thin overflow-y-auto pr-0.5" data-slot="provider-group-scroll">
          {navGroups.map((group) => (
            <div className="not-first:mt-3" data-slot="provider-nav-group" key={group.label}>
              <span className="block px-3 pb-1.5 text-xs font-semibold tracking-wider text-olive-500 uppercase">{group.label}</span>
              <nav className="flex flex-col gap-1">
                {group.items.map(([to, label, Icon]) => (
                  <NavLink to={to} key={to} activeClassName="
                    relative flex min-h-10 items-center gap-2.75 rounded-lg bg-emerald-50 px-3 text-xs font-semibold
                    text-emerald-900 no-underline transition duration-160 ease-in-out before:absolute before:top-2
                    before:bottom-2 before:left-0 before:w-0.75 before:rounded-tl-none before:rounded-tr-sm
                    before:rounded-br-sm before:rounded-bl-none before:bg-emerald-900 hover:translate-x-0.5
                    hover:bg-mist-100 hover:text-emerald-900 focus-visible:outline-3 focus-visible:outline-offset-2
                    focus-visible:outline-emerald-700/32
                  " className="
                    flex min-h-10 items-center gap-2.75 rounded-lg px-3 text-xs font-medium text-olive-600
                    no-underline transition duration-160 ease-in-out hover:translate-x-0.5 hover:bg-mist-100
                    hover:text-emerald-900 focus-visible:outline-3 focus-visible:outline-offset-2
                    focus-visible:outline-emerald-700/32
                  ">
                    <Icon size={18} className="size-4.25 stroke-2" />
                    {label}
                  </NavLink>
                ))}
              </nav>
            </div>
          ))}
        </div>
        <div className="mt-auto flex gap-2 rounded-lg border border-mist-200 bg-slate-50 p-2.75 text-amber-700" data-slot="provider-secure">
          <ShieldCheck size={18} />
          <div className="flex flex-col">
            <strong className="text-xs tabular-nums">Role-scoped workspace</strong>
            <span className="text-xs">Access follows account permissions</span>
          </div>
        </div>
      </aside>
      <div className="pl-64 max-lg:pl-58 max-md:pl-0" data-slot="provider-main">
        <header className="
          relative flex h-17 items-center justify-between border-b border-b-taupe-100 bg-white/97 px-7
          max-md:px-4 max-md:py-0
        ">
          <button className="
            flex items-center gap-2.5 border border-mist-200 bg-white text-left shadow-sm transition
            duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
            focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52
          " data-slot="provider-facility">
            <span className="grid size-8 place-items-center rounded-lg bg-emerald-50 text-emerald-900">
              <Building2 size={17} />
            </span>
            <div className="flex flex-col">
              <small className="text-xs text-olive-500 max-md:hidden">Acting for</small>
              <strong className="text-xs tabular-nums">CityCare Hospital</strong>
            </div>
            <ChevronDown size={15} />
          </button>
          <div className="flex items-center gap-3">
            <button className="
              flex min-h-7 items-center gap-1 rounded-full bg-emerald-50 px-2.5 text-xs font-bold
              text-emerald-700 transition duration-160 ease-in-out focus-visible:outline-3
              focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed
              disabled:opacity-52 max-md:hidden
            " data-slot="provider-connected">
              <Wifi size={15} />
              Connected locally
            </button>
            <button
              className="
                relative grid size-9.5 place-items-center rounded-lg border border-mist-200 bg-white transition
                duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
                focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52
              " data-slot="provider-bell"
              onClick={() => setNotifications(!notifications)}
            >
              <Bell size={19} />
              <i className="absolute top-1 right-1.5 size-1.5 rounded-full bg-red-700" />
            </button>
            <button className="
              flex items-center gap-2 border-0 border-l border-l-mist-200 bg-transparent pl-3 transition
              duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
              focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52 max-md:pl-2
            " data-slot="provider-profile">
              <span className="grid size-8 place-items-center rounded-full bg-emerald-900 text-xs font-bold text-white">TO</span>
              <div className="flex flex-col text-left max-md:hidden">
                <strong className="text-xs tabular-nums">Dr. T. Okafor</strong>
                <small className="text-xs text-olive-500">Clinician</small>
              </div>
              <ChevronDown size={15} className="max-md:hidden" />
            </button>
          </div>
          {notifications && (
            <div className="
              absolute top-14 right-8 z-20 block! w-84 items-center gap-3 overflow-hidden rounded-xl border
              border-mist-200 bg-white shadow-xl max-md:fixed max-md:top-22 max-md:right-4 max-md:left-4
              max-md:w-auto
            " data-slot="notification-panel">
              <div className="flex justify-between p-3">
                <strong className="text-xs tabular-nums">Notifications</strong>
                <button className="
                  bg-transparent text-xs font-bold text-emerald-900 transition duration-160 ease-in-out
                  focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
                  disabled:cursor-not-allowed disabled:opacity-52
                ">Mark all read</button>
              </div>
              <Link to="/provider/requests" className="
                grid grid-cols-2 gap-2.5 border-t border-t-mist-200 p-3 text-mist-800 no-underline transition
                duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
                focus-visible:outline-emerald-700/32
              ">
                <span className="grid size-8 place-items-center rounded-lg bg-blue-50 text-blue-700">
                  <FileText size={18} />
                </span>
                <div>
                  <strong className="text-xs tabular-nums">Record received</strong>
                  <p className="my-0.5 text-xs text-olive-600">A discharge summary for Aremu Adewale is available.</p>
                  <small className="text-xs text-olive-500">18 minutes ago</small>
                </div>
              </Link>
              <Link to="/provider/requests" className="
                grid grid-cols-2 gap-2.5 border-t border-t-mist-200 p-3 text-mist-800 no-underline transition
                duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
                focus-visible:outline-emerald-700/32
              ">
                <span className="grid size-8 place-items-center rounded-lg bg-blue-50 text-blue-700">
                  <ClipboardCheck size={18} />
                </span>
                <div>
                  <strong className="text-xs tabular-nums">Request under review</strong>
                  <p className="my-0.5 text-xs text-olive-600">Mercy Specialist Hospital opened REQ-008472.</p>
                  <small className="text-xs text-olive-500">24 minutes ago</small>
                </div>
              </Link>
            </div>
          )}
        </header>
        <main>{children}</main>
      </div>
      <nav className="
        hidden max-md:fixed max-md:right-0 max-md:bottom-0 max-md:left-0 max-md:z-50 max-md:grid
        max-md:h-16 max-md:grid-cols-5 max-md:border-t max-md:border-t-mist-200 max-md:bg-white
      " data-slot="provider-bottom">
        {mobileNav.slice(0, 4).map(([to, label, Icon]) => (
          <NavLink to={to} key={to} activeClassName="
            transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
            focus-visible:outline-emerald-700/32 max-md:flex max-md:flex-col max-md:items-center
            max-md:justify-center max-md:gap-1 max-md:text-xs max-md:font-bold max-md:text-emerald-900
            max-md:no-underline
          " className="
            transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
            focus-visible:outline-emerald-700/32 max-md:flex max-md:flex-col max-md:items-center
            max-md:justify-center max-md:gap-1 max-md:text-xs max-md:text-olive-500 max-md:no-underline
          ">
            <Icon size={19} />
            <span>{label.split(" ")[0]}</span>
          </NavLink>
        ))}
        <NavLink to="/provider/settings" activeClassName="
          transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
          focus-visible:outline-emerald-700/32 max-md:flex max-md:flex-col max-md:items-center
          max-md:justify-center max-md:gap-1 max-md:text-xs max-md:font-bold max-md:text-emerald-900
          max-md:no-underline
        " className="
          transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
          focus-visible:outline-emerald-700/32 max-md:flex max-md:flex-col max-md:items-center
          max-md:justify-center max-md:gap-1 max-md:text-xs max-md:text-olive-500 max-md:no-underline
        ">
          <MoreHorizontal size={19} />
          <span>More</span>
        </NavLink>
      </nav>
    </div>
  )
}
