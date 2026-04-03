function TopNav({ role, theme, onRoleChange, onThemeToggle }) {
  return (
    <header className="glass-panel flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm uppercase tracking-[0.25em] text-emerald-600 dark:text-emerald-400">
          Finance Dashboard
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
          Cash flow visibility with a polished, responsive workspace
        </h1>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="flex items-center gap-2 rounded-2xl bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200">
          Role
          <select
            value={role}
            onChange={(event) => onRoleChange(event.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-900"
          >
            <option value="viewer">Viewer</option>
            <option value="admin">Admin</option>
          </select>
        </label>

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
