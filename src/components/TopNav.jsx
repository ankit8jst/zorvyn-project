import { useEffect, useRef, useState } from "react";

const ROLE_OPTIONS = [
  {
    value: "viewer",
    label: "Viewer",
    badge: "Read only",
    description: "Explore charts, insights, and transaction history.",
    accent:
      "from-sky-500/20 to-cyan-500/10 text-sky-700 dark:text-sky-300",
  },
  {
    value: "admin",
    label: "Admin",
    badge: "Full access",
    description: "Add transactions and manage the dashboard flow.",
    accent:
      "from-emerald-500/20 to-lime-500/10 text-emerald-700 dark:text-emerald-300",
  },
];

function TopNav({ role, theme, onRoleChange, onThemeToggle }) {
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsRoleMenuOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsRoleMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const activeRole =
    ROLE_OPTIONS.find((option) => option.value === role) || ROLE_OPTIONS[0];

  return (
    <header className="glass-panel relative z-30 flex flex-col gap-4 overflow-visible p-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm uppercase tracking-[0.25em] text-emerald-600 dark:text-emerald-400">
          Finance Dashboard
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
          Cash flow visibility with a polished, responsive workspace
        </h1>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative z-40 w-full sm:w-[20rem]" ref={menuRef}>
          <button
            type="button"
            onClick={() => setIsRoleMenuOpen((current) => !current)}
            className="group flex w-full items-center justify-between rounded-[1.75rem] border border-white/50 bg-gradient-to-br from-white via-white to-slate-100 px-4 py-3 text-left shadow-lg shadow-slate-200/50 transition hover:-translate-y-0.5 hover:shadow-xl dark:border-white/10 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 dark:shadow-black/20"
            aria-haspopup="menu"
            aria-expanded={isRoleMenuOpen}
          >
            <div className="flex min-w-0 items-center gap-3">
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${activeRole.accent}`}
              >
                <span className="text-sm font-bold">
                  {activeRole.label === "Admin" ? "A" : "V"}
                </span>
              </div>
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                  Active Role
                </p>
                <div className="mt-1 flex items-center gap-2">
                  <p className="truncate text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {activeRole.label}
                  </p>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    {activeRole.badge}
                  </span>
                </div>
              </div>
            </div>

            <span className="ml-3 rounded-2xl bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600 transition group-hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:group-hover:bg-slate-700">
              {isRoleMenuOpen ? "Close" : "Change"}
            </span>
          </button>

          {isRoleMenuOpen ? (
            <div className="absolute right-0 z-50 mt-3 w-full overflow-hidden rounded-[1.75rem] border border-white/50 bg-white/95 p-2 shadow-2xl shadow-slate-300/50 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/95 dark:shadow-black/30">
              <div className="mb-1 px-3 py-2">
                <p className="text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                  Switch Role
                </p>
              </div>

              {ROLE_OPTIONS.map((option) => {
                const isActive = option.value === role;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      onRoleChange(option.value);
                      setIsRoleMenuOpen(false);
                    }}
                    className={`mb-2 flex w-full items-start gap-3 rounded-2xl px-3 py-3 text-left transition last:mb-0 ${
                      isActive
                        ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950"
                        : "bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/80 dark:text-slate-100 dark:hover:bg-slate-800"
                    }`}
                    role="menuitem"
                  >
                    <div
                      className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${option.accent} ${
                        isActive ? "ring-2 ring-white/30 dark:ring-slate-900/20" : ""
                      }`}
                    >
                      <span className="text-sm font-bold">
                        {option.label === "Admin" ? "A" : "V"}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold">{option.label}</p>
                        <span
                          className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                            isActive
                              ? "bg-white/15 text-white dark:bg-slate-900/10 dark:text-slate-900"
                              : "bg-white text-slate-600 dark:bg-slate-700 dark:text-slate-300"
                          }`}
                        >
                          {option.badge}
                        </span>
                      </div>
                      <p
                        className={`mt-1 text-sm leading-5 ${
                          isActive
                            ? "text-slate-200 dark:text-slate-700"
                            : "text-slate-500 dark:text-slate-400"
                        }`}
                      >
                        {option.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : null}
        </div>

        <button
          type="button"
          onClick={onThemeToggle}
          className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
        >
          {theme === "dark" ? "Switch to Light" : "Switch to Dark"}
        </button>
      </div>
    </header>
  );
}

export default TopNav;
