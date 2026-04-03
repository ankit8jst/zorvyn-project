const tones = {
  balance: "from-sky-500/20 to-cyan-500/5 text-sky-700 dark:text-sky-300",
  income: "from-emerald-500/20 to-lime-500/5 text-emerald-700 dark:text-emerald-300",
  expense: "from-rose-500/20 to-orange-500/5 text-rose-700 dark:text-rose-300",
  neutral: "from-violet-500/20 to-indigo-500/5 text-violet-700 dark:text-violet-300",
};

function SummaryCard({ title, value, detail, tone }) {
  return (
    <article className="glass-panel relative group overflow-hidden p-5">
      <div
        className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${tones[tone] || tones.balance}`}
      />
      <div className="relative">
        <p className="muted-copy">{title}</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight">{value}</h2>
        <p className="mt-3 text-sm text-slate-600 transition duration-300 group-hover:text-slate-800 dark:text-slate-400 dark:group-hover:text-slate-200">
          {detail}
        </p>
      </div>
    </article>
  );
}

export default SummaryCard;
