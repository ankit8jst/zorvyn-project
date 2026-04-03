import { formatCurrency, formatDisplayDate } from "../utils/finance";

function TransactionTable({
  transactions,
  role,
  searchTerm,
  typeFilter,
  sortBy,
  onDeleteTransaction,
  onSearchChange,
  onTypeFilterChange,
  onSortChange,
}) {
  const isAdmin = role === "admin";

  return (
    <section className="glass-panel p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="section-title">Transactions</p>
          <p className="muted-copy mt-1">
            Search, filter, and sort activity across income and expenses.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search category"
            className="rounded-2xl border bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-500 dark:bg-slate-900"
          />
          <select
            value={typeFilter}
            onChange={(event) => onTypeFilterChange(event.target.value)}
            className="rounded-2xl border bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-500 dark:bg-slate-900"
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <select
            value={sortBy}
            onChange={(event) => onSortChange(event.target.value)}
            className="rounded-2xl border bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-500 dark:bg-slate-900"
          >
            <option value="date-desc">Newest Date</option>
            <option value="date-asc">Oldest Date</option>
            <option value="amount-desc">Highest Amount</option>
            <option value="amount-asc">Lowest Amount</option>
          </select>
        </div>
      </div>

      {transactions.length === 0 ? (
        <div className="mt-6 rounded-3xl border border-dashed border-slate-300 px-6 py-14 text-center dark:border-slate-700">
          <p className="text-base font-medium text-slate-700 dark:text-slate-200">
            No transactions found
          </p>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Try adjusting the search or filters, or add a new record in admin mode.
          </p>
        </div>
      ) : (
        <div className="mt-6 overflow-hidden rounded-3xl border">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
              <thead className="bg-slate-50 dark:bg-slate-900/80">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Category
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Type
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Amount
                  </th>
                  {isAdmin ? (
                    <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                      Action
                    </th>
                  ) : null}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white/70 dark:divide-slate-800 dark:bg-slate-950/50">
                {transactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="transition hover:bg-emerald-50/70 dark:hover:bg-slate-800/70"
                  >
                    <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 dark:text-slate-300">
                      {formatDisplayDate(transaction.date)}
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-slate-800 dark:text-slate-100">
                      {transaction.category}
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          transaction.type === "income"
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300"
                            : "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300"
                        }`}
                      >
                        {transaction.type}
                      </span>
                    </td>
                    <td
                      className={`whitespace-nowrap px-4 py-4 text-right text-sm font-semibold ${
                        transaction.type === "income"
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-rose-600 dark:text-rose-400"
                      }`}
                    >
                      {transaction.type === "income" ? "+" : "-"}
                      {formatCurrency(transaction.amount)}
                    </td>
                    {isAdmin ? (
                      <td className="whitespace-nowrap px-4 py-4 text-right">
                        <button
                          type="button"
                          onClick={() => onDeleteTransaction(transaction.id)}
                          className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700 transition hover:-translate-y-0.5 hover:bg-rose-100 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-300 dark:hover:bg-rose-500/20"
                        >
                          Remove
                        </button>
                      </td>
                    ) : null}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}

export default TransactionTable;
