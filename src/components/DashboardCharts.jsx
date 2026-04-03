import {
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatCurrency } from "../utils/finance";

const PIE_COLORS = ["#16a34a", "#0ea5e9", "#f59e0b", "#dc2626", "#8b5cf6", "#14b8a6"];

function DashboardCharts({ trendData, categoryData }) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <section className="glass-panel p-5">
        <div className="mb-4">
          <p className="section-title">Balance Trend</p>
          <p className="muted-copy mt-1">Running balance based on every recorded transaction.</p>
        </div>

        <div className="h-72">
          {trendData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <XAxis dataKey="date" stroke="#94a3b8" tickLine={false} axisLine={false} />
                <YAxis
                  stroke="#94a3b8"
                  tickFormatter={(value) => `$${value}`}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  formatter={(value) => formatCurrency(value)}
                  contentStyle={{
                    borderRadius: "16px",
                    border: "1px solid rgba(148, 163, 184, 0.2)",
                    background: "rgba(15, 23, 42, 0.92)",
                    color: "#fff",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="balance"
                  stroke="#22c55e"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#22c55e" }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
              <p className="muted-copy">Add transactions to see your balance trend.</p>
            </div>
          )}
        </div>
      </section>

      <section className="glass-panel p-5">
        <div className="mb-4">
          <p className="section-title">Spending Categories</p>
          <p className="muted-copy mt-1">Expense distribution by category.</p>
        </div>

        <div className="h-72">
          {categoryData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={58}
                  outerRadius={92}
                  paddingAngle={3}
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={`${entry.name}-${entry.value}`}
                      fill={PIE_COLORS[index % PIE_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => formatCurrency(value)}
                  contentStyle={{
                    borderRadius: "16px",
                    border: "1px solid rgba(148, 163, 184, 0.2)",
                    background: "rgba(15, 23, 42, 0.92)",
                    color: "#fff",
                  }}
                />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
              <p className="muted-copy">Expense transactions will appear here as a pie chart.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default DashboardCharts;
