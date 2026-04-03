import { useState } from "react";
import { getLocalDateInputValue } from "../utils/finance";

const initialForm = {
  amount: "",
  category: "",
  type: "expense",
  date: getLocalDateInputValue(),
};

function AddTransactionForm({ onAddTransaction }) {
  const [form, setForm] = useState(initialForm);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.amount || !form.category.trim() || !form.date) return;

    onAddTransaction({
      id: `txn-${Date.now()}`,
      amount: Number(form.amount),
      category: form.category.trim(),
      type: form.type,
      date: form.date,
    });

    setForm({
      ...initialForm,
      date: getLocalDateInputValue(),
    });
  };

  return (
    <section className="glass-panel p-5">
      <div>
        <p className="section-title">Add Transaction</p>
        <p className="muted-copy mt-1">Visible only for the admin role.</p>
      </div>

      <form className="mt-5 grid gap-4" onSubmit={handleSubmit}>
        <label className="grid gap-2">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Amount</span>
          <input
            type="number"
            name="amount"
            min="0"
            step="1"
            value={form.amount}
            onChange={handleChange}
            placeholder="500"
            className="rounded-2xl border bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-500 dark:bg-slate-900"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Category</span>
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Rent"
            className="rounded-2xl border bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-500 dark:bg-slate-900"
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Type</span>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="rounded-2xl border bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-500 dark:bg-slate-900"
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Date</span>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="rounded-2xl border bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-500 dark:bg-slate-900"
            />
          </label>
        </div>

        <button
          type="submit"
          className="mt-2 rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-emerald-500"
        >
          Save Transaction
        </button>
      </form>
    </section>
  );
}

export default AddTransactionForm;
