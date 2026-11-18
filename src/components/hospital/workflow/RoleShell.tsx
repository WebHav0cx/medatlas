'use client';
import { useState, type ReactNode } from "react";
import { NavLink, useNavigate } from "@/lib/workflow-router";
import { Bell, Building2, Check, ChevronDown, ClipboardCheck, Menu, RefreshCw, ShieldCheck, Wifi, X } from "lucide-react";
import { useMockData } from "@/stores/workflow/useMockData";
import { Brand } from "@/components/shared/workflow/Brand";
import { type ProviderRole, roleConfig } from './SourceConfig';

export function RoleShell({
  role,
  children,
}: {
  role: ProviderRole
  children: ReactNode
}) {
  const config = roleConfig[role]
  const navItems = config.groups.flatMap((group) => group.items)
  const navigate = useNavigate()
  const { state, currentAccount, switchAccount, resetData } = useMockData()
  const [rolesOpen, setRolesOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [notifications, setNotifications] = useState(false)
  return (
    <div className="min-h-screen bg-slate-50" data-slot="hospital-workspace">
      <aside  data-slot={(mobileOpen ? "open" : "")} className={[`
        fixed top-0 right-auto bottom-0 left-0 z-50 flex w-64 flex-col border-r border-r-taupe-100
        bg-white px-3.5 pt-6 pb-4 max-lg:w-58 max-md:w-0 max-md:transition-transform max-md:duration-180
        max-md:ease-in-out
      `, (!(mobileOpen) ? "max-md:-translate-x-full" : ""), ((mobileOpen) ? "max-md:translate-x-0 max-md:shadow-lg" : "")].filter(Boolean).join(" ")}>
        <Brand />
        <button
          className="
            hidden transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
            focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52
            max-md:absolute max-md:top-6 max-md:right-3 max-md:grid max-md:size-8 max-md:place-items-center
            max-md:border-0 max-md:bg-transparent
          " data-slot="hospital-mobile-close"
          onClick={() => setMobileOpen(false)}
        >
          <X size={20} />
        </button>
        <div className="mt-6 flex items-center gap-2 rounded-lg border border-mist-200 bg-white p-2.5 shadow-sm" data-slot="hospital-facility">
          <span className="grid size-8 place-items-center rounded-lg bg-emerald-50 text-emerald-900">
            <Building2 size={17} />
          </span>
          <div className="flex flex-col">
            <small className="text-xs tracking-wider text-olive-500 uppercase">Facility</small>
            <strong className="text-xs tabular-nums">{state.facility.name}</strong>
          </div>
        </div>
        <div className="mt-4 flex-1 scrollbar-thin overflow-y-auto pr-0.5" data-slot="hospital-nav-scroll">
          {config.groups.map((group) => (
            <div className="not-first:mt-3" data-slot="hospital-nav-group" key={group.label}>
              <div className="mb-1.5 ml-3 text-xs font-semibold tracking-wider text-olive-500 uppercase" data-slot="hospital-nav-label">{group.label}</div>
              <nav className="flex flex-col gap-1">
                {group.items.map((item) => {
                  const Icon = item.icon
                  return (
                    <NavLink
                      key={item.path}
                      to={`/provider/${role}/${item.path}`}
                      onClick={() => setMobileOpen(false)} activeClassName="
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
                      "
                    >
                      <Icon size={18} className="size-4.25 stroke-2" />
                      <span>{item.label}</span>
                    </NavLink>
                  )
                })}
              </nav>
            </div>
          ))}
        </div>
        <div className="mt-3 flex gap-2 rounded-lg border border-mist-200 bg-slate-50 p-2.75 text-blue-700" data-slot="hospital-boundary">
          <ShieldCheck size={17} />
          <div className="flex flex-col">
            <strong className="text-xs text-mist-800 tabular-nums">Role-scoped access</strong>
            <span className="text-xs">{currentAccount.department}</span>
          </div>
        </div>
      </aside>
      <div className="pl-64 max-lg:pl-58 max-md:pl-0" data-slot="hospital-main">
        <header className="
          sticky top-0 z-35 flex h-17 items-center justify-between border-b border-b-taupe-100 bg-white/97
          px-7 backdrop-blur-sm max-md:px-4 max-md:py-0
        ">
          <button
            className="
              hidden transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
              focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52 max-md:grid
              max-md:size-9 max-md:place-items-center max-md:rounded-md max-md:border-0 max-md:bg-mist-100
            " data-slot="hospital-mobile-menu"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={20} />
          </button>
          <div className="flex flex-col max-md:hidden" data-slot="hospital-header-facility">
            <small className="text-xs tracking-wider text-olive-500 uppercase">{state.facility.name}</small>
            <strong className="text-xs tabular-nums">{config.title} workspace</strong>
          </div>
          <div className="flex items-center gap-2.5" data-slot="hospital-header-actions">
            <span className="
              flex min-h-7 items-center gap-1 rounded-full bg-emerald-50 px-2.5 text-xs font-bold
              text-emerald-700 max-md:hidden
            " data-slot="hospital-connectivity">
              <Wifi size={14} />
              Available
            </span>
            <button
              className="
                relative grid size-9.5 place-items-center rounded-lg border border-mist-200 bg-white transition
                duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
                focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52
              " data-slot="hospital-notification"
              onClick={() => setNotifications(!notifications)}
            >
              <Bell size={18} />
              <i className="absolute top-1 right-1.5 size-1.5 rounded-full bg-red-700" />
            </button>
            <div className="relative" data-slot="hospital-switch-wrap">
              <button
                className="
                  grid min-h-10 cursor-pointer grid-cols-3 items-center gap-2 border-0 border-l border-l-mist-200
                  bg-transparent pl-3 text-left transition duration-160 ease-in-out focus-visible:outline-3
                  focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed
                  disabled:opacity-52 max-md:pl-2
                " data-slot="hospital-account"
                onClick={() => setRolesOpen(!rolesOpen)}
              >
                <span className="grid size-8 place-items-center rounded-full bg-emerald-900 text-xs font-bold text-white">
                  {currentAccount.id === `staff-${role}`
                    ? config.initials
                    : currentAccount.name
                        .split(" ")
                        .map((part) => part[0])
                        .join("")
                        .slice(0, 2)}
                </span>
                <div className="flex flex-col max-md:hidden">
                  <strong className="text-xs tabular-nums">{currentAccount.name}</strong>
                  <small className="text-xs text-olive-500">{currentAccount.title}</small>
                </div>
                <ChevronDown size={15} className="max-md:hidden" />
              </button>
              {rolesOpen && (
                <div className="
                  absolute top-12 right-0 z-70 w-76 rounded-xl border border-mist-200 bg-white p-2 shadow-xl
                  max-md:fixed max-md:top-24 max-md:right-4 max-md:left-4 max-md:w-auto
                " data-slot="hospital-switch-menu">
                  <div className="flex flex-col border-b border-b-mist-200 p-2.5">
                    <strong className="text-xs text-emerald-900 tabular-nums">Switch account</strong>
                    <small className="text-xs text-olive-500">{state.facility.name}</small>
                  </div>
                  {state.staff
                    .filter((staff) => staff.status !== "Deactivated")
                    .map((staff) => (
                      <button
                         data-slot={(currentAccount.id === staff.id ? "active" : "")}
                        key={staff.id}
                        onClick={() => {
                          setRolesOpen(false)
                          switchAccount(staff.id)
                          navigate(
                            staff.role.startsWith("lab-")
                              ? `/laboratory/${staff.role.replace("lab-", "")}/dashboard`
                              : `/provider/${staff.role}/dashboard`,
                          )
                        }} className={[`
                          grid min-h-12 w-full cursor-pointer grid-cols-3 items-center gap-2 rounded-lg p-2 text-left
                          transition duration-160 ease-in-out hover:bg-mist-100 focus-visible:outline-3
                          focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed
                          disabled:opacity-52
                        `, (!(currentAccount.id === staff.id) ? "bg-transparent" : ""), ((currentAccount.id === staff.id) ? "bg-mist-100" : "")].filter(Boolean).join(" ")}
                      >
                        <span className="grid size-8 place-items-center rounded-full bg-emerald-900 text-xs font-bold text-white">
                          {staff.name
                            .split(" ")
                            .map((word) => word[0])
                            .join("")
                            .slice(0, 2)}
                        </span>
                        <div className="flex flex-col">
                          <strong className="text-xs tabular-nums">{staff.name}</strong>
                          <small className="text-xs text-olive-500">{staff.title}</small>
                        </div>
                        {currentAccount.id === staff.id && <Check size={15} className="text-emerald-700" />}
                      </button>
                    ))}
                  <button
                    className="
                      mt-1 grid min-h-12 w-full cursor-pointer grid-cols-2! items-center gap-2 rounded-lg border-0
                      border-t! border-solid! border-t-mist-200! bg-transparent p-2 text-left text-olive-600 transition
                      duration-160 ease-in-out hover:bg-mist-100 focus-visible:outline-3 focus-visible:outline-offset-2
                      focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52
                    " data-slot="account-reset"
                    onClick={() => {
                      resetData()
                      setRolesOpen(false)
                      navigate("/provider/doctor/dashboard")
                    }}
                  >
                    <RefreshCw size={15} className="text-emerald-700" />
                    <span className="block! size-auto! place-items-center rounded-none! bg-transparent! text-left text-xs! font-bold text-inherit!">Reset application data</span>
                  </button>
                </div>
              )}
            </div>
          </div>
          {notifications && (
            <div className="
              absolute top-16 right-8 z-60 w-80 overflow-hidden rounded-xl border border-mist-200 bg-white
              shadow-xl max-md:fixed max-md:top-24 max-md:right-4 max-md:left-4 max-md:w-auto
            " data-slot="hospital-notification-panel">
              <div className="flex justify-between p-3">
                <strong className="text-xs tabular-nums">Notifications</strong>
                <button onClick={() => setNotifications(false)} className="
                  bg-transparent text-xs font-bold text-emerald-900 transition duration-160 ease-in-out
                  focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
                  disabled:cursor-not-allowed disabled:opacity-52
                ">
                  Mark as read
                </button>
              </div>
              <button className="
                grid w-full grid-cols-2 gap-2 border-0 border-t border-t-mist-200 bg-white p-3 text-left
                transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
                focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52
              ">
                <span className="grid size-8 place-items-center rounded-lg bg-blue-50 text-blue-700">
                  <ClipboardCheck size={17} />
                </span>
                <div className="flex flex-col">
                  <strong className="text-xs tabular-nums">Request requires review</strong>
                  <small className="text-xs text-olive-500">REQ-008472 · 24 minutes ago</small>
                </div>
              </button>
              <button className="
                grid w-full grid-cols-2 gap-2 border-0 border-t border-t-mist-200 bg-white p-3 text-left
                transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
                focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52
              ">
                <span className="grid size-8 place-items-center rounded-lg bg-blue-50 text-blue-700">
                  <RefreshCw size={17} />
                </span>
                <div className="flex flex-col">
                  <strong className="text-xs tabular-nums">Integration configuration pending</strong>
                  <small className="text-xs text-olive-500">Facility connector · Today</small>
                </div>
              </button>
            </div>
          )}
        </header>
        <main>{children}</main>
      </div>
      <nav className="
        hidden max-md:fixed max-md:right-0 max-md:bottom-0 max-md:left-0 max-md:z-60 max-md:grid
        max-md:h-16 max-md:grid-cols-5 max-md:border-t max-md:border-t-mist-200 max-md:bg-white
      " data-slot="hospital-bottom-nav">
        {navItems.slice(0, 4).map((item) => {
          const Icon = item.icon
          return (
            <NavLink key={item.path} to={`/provider/${role}/${item.path}`} activeClassName="
              transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
              focus-visible:outline-emerald-700/32 max-md:flex max-md:flex-col max-md:items-center
              max-md:justify-center max-md:gap-1 max-md:border-0 max-md:bg-transparent max-md:text-xs
              max-md:font-bold max-md:text-emerald-900 max-md:no-underline
            " className="
              transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
              focus-visible:outline-emerald-700/32 max-md:flex max-md:flex-col max-md:items-center
              max-md:justify-center max-md:gap-1 max-md:border-0 max-md:bg-transparent max-md:text-xs
              max-md:text-olive-500 max-md:no-underline
            ">
              <Icon size={19} />
              <span>{item.label.split(" ")[0]}</span>
            </NavLink>
          )
        })}
        <button onClick={() => setMobileOpen(true)} className="
          transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
          focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52 max-md:flex
          max-md:flex-col max-md:items-center max-md:justify-center max-md:gap-1 max-md:border-0
          max-md:bg-transparent max-md:text-xs max-md:text-olive-500 max-md:no-underline
        ">
          <Menu size={19} />
          <span>More</span>
        </button>
      </nav>
    </div>
  )
}
