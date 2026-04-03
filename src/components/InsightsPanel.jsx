import { formatCurrency } from "../utils/finance";

function InsightCard({ label, value, helper, accent }) {
  return (
    <div className="rounded-2xl border border-white/40 bg-white/70 p-4 transition hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-slate-800/80">
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
      <p className={`mt-2 text-2xl font-semibold ${accent}`}>{value}</p>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{helper}</p>
    </div>
  );
}

function InsightsPanel({ insights }) {
  return (
    <section className="glass-panel p-5">
      <div>
        <p className="section-title">Insights</p>
        <p className="muted-copy mt-1">
          Lightweight analytics generated from your stored transactions.
        </p>
      </div>

      <div className="mt-5 grid gap-4">
        <InsightCard
          label="Highest Spending Category"
          value={insights.highestSpendingCategory}
          helper={`Spent ${formatCurrency(insights.highestSpendingValue)} in this category`}
          accent="text-rose-600 dark:text-rose-400"
        />
        <InsightCard
          label="Monthly Expenses"
          value={formatCurrency(insights.monthlyExpenses)}
          helper={`Based on expense transactions in ${insights.monthlyLabel}`}
          accent="text-amber-600 dark:text-amber-400"
        />
        <InsightCard
          label="Average Expense"
          value={formatCurrency(insights.averageExpense)}
          helper={`${insights.totalTransactions} total transactions tracked`}
          accent="text-sky-600 dark:text-sky-400"
        />
        <InsightCard
          label="Income Trend"
          value={formatCurrency(insights.currentMonthIncome)}
          helper={insights.incomeTrendMessage}
          accent="text-emerald-600 dark:text-emerald-400"
        />
      </div>
    </section>
  );
}

export default InsightsPanel;
