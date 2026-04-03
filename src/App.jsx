import { useEffect, useMemo, useState } from "react";
import Dashboard from "./components/Dashboard";
import { DEFAULT_TRANSACTIONS, STORAGE_KEYS } from "./data/mockData";

const readTransactions = () => {
  if (typeof window === "undefined") return DEFAULT_TRANSACTIONS;

  try {
    const stored = localStorage.getItem(STORAGE_KEYS.transactions);
    return stored ? JSON.parse(stored) : DEFAULT_TRANSACTIONS;
  } catch (error) {
    console.error("Failed to read transactions from localStorage", error);
    return DEFAULT_TRANSACTIONS;
  }
};

const readRole = () =>
  typeof window === "undefined"
    ? "viewer"
    : localStorage.getItem(STORAGE_KEYS.role) || "viewer";

const readTheme = () =>
  typeof window === "undefined"
    ? "dark"
    : localStorage.getItem(STORAGE_KEYS.theme) || "dark";

function App() {
  const [transactions, setTransactions] = useState(readTransactions);
  const [role, setRole] = useState(readRole);
  const [theme, setTheme] = useState(readTheme);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date-desc");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.transactions, JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.role, role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.theme, theme);
    document.body.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const filters = useMemo(
    () => ({
      searchTerm,
      typeFilter,
      sortBy,
    }),
    [searchTerm, typeFilter, sortBy],
  );

  return (
    <Dashboard
      transactions={transactions}
      role={role}
      theme={theme}
      filters={filters}
      onAddTransaction={(transaction) =>
        setTransactions((current) => [transaction, ...current])
      }
      onDeleteTransaction={(transactionId) =>
        setTransactions((current) =>
          current.filter((transaction) => transaction.id !== transactionId),
        )
      }
      onRoleChange={setRole}
      onThemeToggle={() =>
        setTheme((current) => (current === "dark" ? "light" : "dark"))
      }
      onSearchChange={setSearchTerm}
      onTypeFilterChange={setTypeFilter}
      onSortChange={setSortBy}
    />
  );
}

export default App;
