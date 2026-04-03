import AddTransactionForm from "./AddTransactionForm";
import DashboardCharts from "./DashboardCharts";
import InsightsPanel from "./InsightsPanel";
import SummaryCard from "./SummaryCard";
import TopNav from "./TopNav";
import TransactionTable from "./TransactionTable";
import {
  formatCurrency,
  getBalanceTrend,
  getCategoryBreakdown,
  getFilteredTransactions,
  getInsights,
  getSummary,
} from "../utils/finance";

function Dashboard(props) {
  const {
    transactions,
    role,
    theme,
    filters,
    onAddTransaction,
    onRoleChange,
    onThemeToggle,
    onSearchChange,
    onTypeFilterChange,
    onSortChange,
  } = props;

  const summary = getSummary(transactions);
  const trendData = getBalanceTrend(transactions);
  const categoryData = getCategoryBreakdown(transactions);
  const filteredTransactions = getFilteredTransactions(transactions, filters);
  const insights = getInsights(transactions);

  return (
    <div className="min-h-screen bg-dashboard-grid px-4 py-5 text-slate-900 transition-colors duration-300 dark:text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <TopNav
          role={role}
          theme={theme}
          onRoleChange={onRoleChange}
          onThemeToggle={onThemeToggle}
        />

        <section className="grid w-full min-w-0 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            title="Total Balance"
            value={formatCurrency(summary.totalBalance)}
            tone="balance"
            detail="Live net position across all transactions"
          />
          <SummaryCard
            title="Total Income"
            value={formatCurrency(summary.totalIncome)}
            tone="income"
            detail="All recorded incoming cash flow"
          />
          <SummaryCard
            title="Total Expenses"
            value={formatCurrency(summary.totalExpenses)}
            tone="expense"
            detail="Current outgoing spending total"
          />
          <SummaryCard
            title="Total Transactions"
            value={summary.totalTransactions}
            tone="neutral"
            detail="All income and expense entries currently tracked"
          />
        </section>

        <section className="grid w-full min-w-0 gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(0,0.95fr)]">
          <DashboardCharts trendData={trendData} categoryData={categoryData} />
          <InsightsPanel insights={insights} />
        </section>

        <section className="grid w-full min-w-0 gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(0,0.9fr)]">
          <TransactionTable
            transactions={filteredTransactions}
            searchTerm={filters.searchTerm}
            typeFilter={filters.typeFilter}
            sortBy={filters.sortBy}
            onSearchChange={onSearchChange}
            onTypeFilterChange={onTypeFilterChange}
            onSortChange={onSortChange}
          />
          {role === "admin" ? (
            <AddTransactionForm onAddTransaction={onAddTransaction} />
          ) : (
            <div className="glass-panel flex flex-col justify-between p-6">
              <div>
                <p className="section-title">Admin Actions</p>
                <p className="muted-copy mt-2 leading-6">
                  Switch to the admin role to add transactions and simulate a finance
                  manager workflow.
                </p>
              </div>
              <div className="mt-5 rounded-2xl border border-dashed border-slate-300/80 bg-slate-50/70 p-4 dark:border-slate-700 dark:bg-slate-800/60">
                <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                  Viewer mode enabled
                </p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  You can explore charts, insights, and transactions, but the add form
                  stays locked.
                </p>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
