'use client';
import { useState, type ReactNode } from "react";
import { Link, NavLink, useNavigate } from "@/lib/workflow-router";
import { Bell, ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import { useMockData } from "@/stores/workflow/useMockData";
import { Brand } from "@/components/shared/workflow/Brand";
import { navGroups, mobileNav } from './SourceConfig';

export function PatientAppShell({ children }: { children: ReactNode }) {
  const store = useMockData()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const account = store.currentPatientAccount
  const notifications = store.state.patientNotifications.filter(
    (item) => item.accountId === account.id,
  )
  const unread = notifications.filter((item) => !item.read).length
  const pending = store.state.sharingPermissions.filter(
    (item) =>
      item.accountId === account.id && item.status === "Pending Decision",
  ).length

  return (
    <div >
      {menuOpen && (
        <button

          aria-label="Close navigation"
          onClick={() => setMenuOpen(false)} className="
            transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
            focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52
          "
        />
      )}
      <aside >
        <div >
          <Brand />
          <button onClick={() => setMenuOpen(false)} aria-label="Close menu" className="
            transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
            focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52
          ">
            <X size={19} />
          </button>
        </div>
        <nav aria-label="Patient portal navigation">
          {navGroups.map((group) => (
            <div  key={group.label}>
              <span>{group.label}</span>
              {group.items.map(([path, label, Icon]) => (
                <NavLink
                  to={`/patient/${path}`}
                  key={path}
                  onClick={() => setMenuOpen(false)} className="
                    transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
                    focus-visible:outline-emerald-700/32
                  "
                >
                  <Icon size={19} />
                  <span>{label}</span>
                  {path === "sharing" && pending > 0 && <i>{pending}</i>}
                  {path === "notifications" && unread > 0 && <i>{unread}</i>}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>
        <div >
          <span>{account.fullName.slice(0, 2).toUpperCase()}</span>
          <div>
            <strong className="tabular-nums">{account.fullName}</strong>
            <small>Patient account</small>
          </div>
          <ChevronRight size={16} />
        </div>
      </aside>

      <div >
        <header >
          <button

            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation" className="
              transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
              focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52
            "
          >
            <Menu size={21} />
          </button>
          <div>
            <small>MedAtlas Patient Portal</small>
            <strong className="tabular-nums">Your health information</strong>
          </div>
          <div >
            <div >
              <button
                onClick={() => setNotificationsOpen((current) => !current)}
                aria-label={`${unread} unread notifications`}
                aria-expanded={notificationsOpen} className="
                  transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
                  focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52
                "
              >
                <Bell size={20} />
                {unread > 0 && <i>{unread}</i>}
              </button>
              {notificationsOpen && (
                <div >
                  <div>
                    <strong className="tabular-nums">Notifications</strong>
                    <button onClick={store.markAllPatientNotifications} className="
                      transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
                      focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52
                    ">
                      Mark all as read
                    </button>
                  </div>
                  {notifications.slice(0, 4).map((notification) => (
                    <Link
                      to={notification.href}
                      key={notification.id}

                      onClick={() => {
                        store.markPatientNotification(notification.id)
                        setNotificationsOpen(false)
                      }} className="
                        transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
                        focus-visible:outline-emerald-700/32
                      "
                    >
                      <span>
                        <Bell size={16} />
                      </span>
                      <div>
                        <strong className="tabular-nums">{notification.title}</strong>
                        <small>{notification.at}</small>
                      </div>
                    </Link>
                  ))}
                  <Link
                    to="/patient/notifications"
                    onClick={() => setNotificationsOpen(false)} className="
                      transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
                      focus-visible:outline-emerald-700/32
                    "

                  >
                    View all notifications
                  </Link>
                </div>
              )}
            </div>
            <button

              onClick={() => navigate("/patient/profile")} className="
                transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
                focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52
              "
            >
              <span>{account.fullName.slice(0, 2).toUpperCase()}</span>
              <div>
                <strong className="tabular-nums">{account.fullName}</strong>
                <small>My profile</small>
              </div>
              <ChevronDown size={15} />
            </button>
          </div>
        </header>
        <main>{children}</main>
      </div>

      <nav className="
        hidden max-md:fixed max-md:right-0 max-md:bottom-0 max-md:left-0 max-md:z-50 max-md:grid
        max-md:h-16 max-md:grid-cols-5 max-md:border-t max-md:border-t-mist-200 max-md:bg-white
      " data-slot="patient-bottom-nav" aria-label="Mobile navigation">
        {mobileNav.map(([path, label, Icon]) => (
          <NavLink to={`/patient/${path}`} key={path} activeClassName="
            transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
            focus-visible:outline-emerald-700/32 max-md:flex max-md:flex-col max-md:items-center
            max-md:justify-center max-md:gap-1 max-md:text-xs max-md:font-bold max-md:text-emerald-900
            max-md:no-underline
          " className="
            transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
            focus-visible:outline-emerald-700/32 max-md:flex max-md:flex-col max-md:items-center
            max-md:justify-center max-md:gap-1 max-md:text-xs max-md:text-olive-500 max-md:no-underline
          ">
            <Icon size={20} />
            <span>{label}</span>
            {path === "sharing" && pending > 0 && <i>{pending}</i>}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
