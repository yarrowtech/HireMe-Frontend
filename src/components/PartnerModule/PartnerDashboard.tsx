import { useMemo, useState } from "react";
import {
  FaBuilding,
  FaUsers,
  FaMoneyBillWave,
  FaArrowUp,
  FaArrowDown,
  FaBolt,
  FaChartLine,
  FaBell,
  FaCheckCircle,
  FaClock,
  FaShieldAlt,
} from "react-icons/fa";

type Activity = {
  id: string;
  title: string;
  meta: string;
  status: "success" | "pending" | "info";
  time: string;
};

type QuickAction = {
  id: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  onClick?: () => void;
};

const cn = (...a: Array<string | false | undefined | null>) =>
  a.filter(Boolean).join(" ");

function Pill({
  label,
  tone = "info",
}: {
  label: string;
  tone?: "success" | "warning" | "info";
}) {
  const map = {
    success: "bg-green-500/15 border-green-500/30 text-green-200",
    warning: "bg-amber-500/15 border-amber-500/30 text-amber-200",
    info: "bg-cyan-500/15 border-cyan-500/30 text-cyan-200",
  } as const;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold",
        map[tone]
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" />
      {label}
    </span>
  );
}

function StatCard({
  title,
  value,
  icon,
  delta,
  deltaLabel,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  delta?: { dir: "up" | "down"; value: string };
  deltaLabel?: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-purple-500/20 blur-2xl" />
      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-sm text-slate-300">{title}</div>
            <div className="mt-2 text-3xl font-extrabold text-white">{value}</div>

            {(delta || deltaLabel) && (
              <div className="mt-3 flex items-center gap-2 text-xs text-slate-300">
                {delta && (
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full border px-2 py-1",
                      delta.dir === "up"
                        ? "border-green-500/30 bg-green-500/15 text-green-200"
                        : "border-red-500/30 bg-red-500/15 text-red-200"
                    )}
                  >
                    {delta.dir === "up" ? <FaArrowUp /> : <FaArrowDown />}
                    {delta.value}
                  </span>
                )}
                {deltaLabel && <span>{deltaLabel}</span>}
              </div>
            )}
          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white">
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
}

function Panel({
  title,
  right,
  children,
}: {
  title: string;
  right?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="text-lg font-bold text-white">{title}</div>
        {right}
      </div>
      {children}
    </div>
  );
}

export default function PartnerDashboardHome() {
  // demo data (replace with API later)
  const [range, setRange] = useState<"7d" | "30d" | "90d">("30d");

  const stats = useMemo(() => {
    // fake values change by range for a nicer feel
    const mult = range === "7d" ? 0.35 : range === "90d" ? 1.65 : 1;

    const fmt = (n: number) => Math.round(n).toString();

    return {
      companies: fmt(12 * mult),
      employees: fmt(248 * mult),
      payroll: `₹${fmt(1860000 * mult)}`,
      alerts: fmt(9 * mult),
    };
  }, [range]);

  const activities: Activity[] = [
    {
      id: "a1",
      title: "Payroll batch generated",
      meta: "HirePay • Salary cycle",
      status: "success",
      time: "10 mins ago",
    },
    {
      id: "a2",
      title: "New employee added",
      meta: "Employee Management",
      status: "info",
      time: "1 hour ago",
    },
    {
      id: "a3",
      title: "Subscription renewal pending",
      meta: "Subscription",
      status: "pending",
      time: "Today",
    },
    {
      id: "a4",
      title: "Compliance report updated",
      meta: "Compliance",
      status: "success",
      time: "Yesterday",
    },
  ];

  const actions: QuickAction[] = [
    {
      id: "q1",
      title: "Add Employee",
      desc: "Create a new employee profile",
      icon: <FaUsers className="text-xl" />,
    },
    {
      id: "q2",
      title: "Run Payroll",
      desc: "Generate salary & payouts",
      icon: <FaMoneyBillWave className="text-xl" />,
    },
    {
      id: "q3",
      title: "View Analytics",
      desc: "Open KPI and insights",
      icon: <FaChartLine className="text-xl" />,
    },
    {
      id: "q4",
      title: "Security Check",
      desc: "Audit access and roles",
      icon: <FaShieldAlt className="text-xl" />,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-white/10 p-8 backdrop-blur-xl">
        <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute -bottom-28 -right-28 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />

        <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200">
              <FaBolt className="text-cyan-300" />
              Partner Dashboard
            </div>
            <h1 className="mt-3 text-3xl md:text-4xl font-extrabold text-white">
              Welcome back 👋
            </h1>
            <p className="mt-2 max-w-2xl text-slate-300">
              Monitor your partner ecosystem, payroll activity, and subscription health —
              all in one place.
            </p>
          </div>

          {/* Range selector */}
          <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-1">
            {(["7d", "30d", "90d"] as const).map((k) => (
              <button
                key={k}
                onClick={() => setRange(k)}
                className={cn(
                  "rounded-xl px-4 py-2 text-sm font-semibold transition",
                  range === k
                    ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-lg"
                    : "text-slate-300 hover:text-white"
                )}
              >
                {k.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Highlights */}
        <div className="relative mt-6 flex flex-wrap gap-3">
          <Pill label="System Healthy" tone="success" />
          <Pill label="Payroll Ready" tone="info" />
          <Pill label="1 Renewal Pending" tone="warning" />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Companies"
          value={stats.companies}
          icon={<FaBuilding className="text-xl" />}
          delta={{ dir: "up", value: "12%" }}
          deltaLabel="vs previous period"
        />
        <StatCard
          title="Employees"
          value={stats.employees}
          icon={<FaUsers className="text-xl" />}
          delta={{ dir: "up", value: "7%" }}
          deltaLabel="vs previous period"
        />
        <StatCard
          title="Payroll Volume"
          value={stats.payroll}
          icon={<FaMoneyBillWave className="text-xl" />}
          delta={{ dir: "up", value: "4%" }}
          deltaLabel="vs previous period"
        />
        <StatCard
          title="Alerts"
          value={stats.alerts}
          icon={<FaBell className="text-xl" />}
          delta={{ dir: "down", value: "9%" }}
          deltaLabel="vs previous period"
        />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Activity */}
        <Panel
          title="Recent Activity"
          right={
            <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-white/10 transition">
              View all
            </button>
          }
        >
          <div className="space-y-3">
            {activities.map((a) => (
              <div
                key={a.id}
                className="flex items-start justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      "mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl border",
                      a.status === "success" &&
                        "border-green-500/30 bg-green-500/15 text-green-200",
                      a.status === "pending" &&
                        "border-amber-500/30 bg-amber-500/15 text-amber-200",
                      a.status === "info" &&
                        "border-cyan-500/30 bg-cyan-500/15 text-cyan-200"
                    )}
                  >
                    {a.status === "success" ? (
                      <FaCheckCircle />
                    ) : a.status === "pending" ? (
                      <FaClock />
                    ) : (
                      <FaChartLine />
                    )}
                  </div>

                  <div>
                    <div className="font-semibold text-white">{a.title}</div>
                    <div className="text-xs text-slate-300">{a.meta}</div>
                  </div>
                </div>

                <div className="text-xs text-slate-400 whitespace-nowrap">{a.time}</div>
              </div>
            ))}
          </div>
        </Panel>

        {/* Quick Actions */}
        <Panel title="Quick Actions">
          <div className="grid grid-cols-1 gap-3">
            {actions.map((q) => (
              <button
                key={q.id}
                onClick={q.onClick}
                className="group text-left rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/30 to-blue-500/20 border border-white/10 text-white group-hover:scale-105 transition">
                    {q.icon}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{q.title}</div>
                    <div className="text-xs text-slate-300">{q.desc}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </Panel>

        {/* Subscription Health */}
        <Panel title="Subscription Health" right={<Pill label="ACTIVE" tone="success" />}>
          <div className="space-y-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-white">Current Plan</div>
                  <div className="text-xs text-slate-300">Partner Pro • Monthly</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-extrabold text-white">₹4,999</div>
                  <div className="text-xs text-slate-400">per month</div>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>Usage</span>
                  <span>62%</span>
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-white/10">
                  <div className="h-2 w-[62%] rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" />
                </div>
                <div className="mt-2 text-xs text-slate-400">
                  310 / 500 employees managed
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-sm font-semibold text-white">Renewal</div>
              <div className="mt-2 flex items-center justify-between text-sm text-slate-300">
                <span>Next billing date</span>
                <span className="font-semibold text-white">Jan 20</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm text-slate-300">
                <span>Auto-renew</span>
                <span className="font-semibold text-white">Enabled</span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-white/10 transition">
                  Manage Plan
                </button>
                <button className="rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-4 py-2 text-sm font-semibold text-white hover:opacity-95 transition">
                  Upgrade
                </button>
              </div>
            </div>
          </div>
        </Panel>
      </div>

      {/* Footer note */}
      <div className="text-center text-xs text-slate-400">
        Tip: Keep your subscription active to unlock employee management and payroll features.
      </div>
    </div>
  );
}
