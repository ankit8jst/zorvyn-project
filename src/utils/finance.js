export const formatCurrency = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

export const getLocalDateInputValue = () => {
  const now = new Date();
  const timezoneOffset = now.getTimezoneOffset() * 60000;
  return new Date(now.getTime() - timezoneOffset).toISOString().slice(0, 10);
};

export const formatMonthLabel = (value) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(new Date(`${value}-01`));

const getPreviousMonthKey = (value) => {
  const [year, month] = value.split("-").map(Number);
  const previousMonth = new Date(year, month - 2, 1);
  const paddedMonth = `${previousMonth.getMonth() + 1}`.padStart(2, "0");
  return `${previousMonth.getFullYear()}-${paddedMonth}`;
};

export const formatDisplayDate = (value) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));

export const getSummary = (transactions) => {
  const income = transactions
    .filter((item) => item.type === "income")
    .reduce((sum, item) => sum + Number(item.amount), 0);
  const expenses = transactions
    .filter((item) => item.type === "expense")
    .reduce((sum, item) => sum + Number(item.amount), 0);

  return {
    totalIncome: income,
    totalExpenses: expenses,
    totalBalance: income - expenses,
    totalTransactions: transactions.length,
  };
};

export const getBalanceTrend = (transactions) => {
  const ordered = [...transactions].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );
  let runningBalance = 0;

  return ordered.map((item) => {
    runningBalance += item.type === "income" ? Number(item.amount) : -Number(item.amount);
    return {
      date: new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
      }).format(new Date(item.date)),
      balance: runningBalance,
    };
  });
};

export const getCategoryBreakdown = (transactions) => {
  const totals = transactions
    .filter((item) => item.type === "expense")
    .reduce((map, item) => {
      map[item.category] = (map[item.category] || 0) + Number(item.amount);
      return map;
    }, {});

  return Object.entries(totals).map(([name, value]) => ({ name, value }));
};

export const getInsights = (transactions) => {
  const expenses = transactions.filter((item) => item.type === "expense");
  const incomeTransactions = transactions.filter((item) => item.type === "income");
  const latestTransactionMonth =
    [...transactions]
      .sort((a, b) => b.date.localeCompare(a.date))[0]
      ?.date.slice(0, 7) || getLocalDateInputValue().slice(0, 7);
  const previousTransactionMonth = getPreviousMonthKey(latestTransactionMonth);

  const monthlyExpenses = expenses
    .filter((item) => item.date.startsWith(latestTransactionMonth))
    .reduce((sum, item) => sum + Number(item.amount), 0);
  const currentMonthIncome = incomeTransactions
    .filter((item) => item.date.startsWith(latestTransactionMonth))
    .reduce((sum, item) => sum + Number(item.amount), 0);
  const previousMonthIncome = incomeTransactions
    .filter((item) => item.date.startsWith(previousTransactionMonth))
    .reduce((sum, item) => sum + Number(item.amount), 0);
  const categoryTotals = expenses.reduce((map, item) => {
    map[item.category] = (map[item.category] || 0) + Number(item.amount);
    return map;
  }, {});
  const [highestCategory = "N/A", highestValue = 0] =
    Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0] || [];
  const averageExpense =
    expenses.length > 0
      ? expenses.reduce((sum, item) => sum + Number(item.amount), 0) / expenses.length
      : 0;
  const incomeChangePercent =
    previousMonthIncome > 0
      ? ((currentMonthIncome - previousMonthIncome) / previousMonthIncome) * 100
      : currentMonthIncome > 0
        ? 100
        : 0;
  const roundedIncomeChange = Math.round(Math.abs(incomeChangePercent));
  const incomeTrendMessage =
    previousMonthIncome === 0 && currentMonthIncome === 0
      ? `No income recorded in ${formatMonthLabel(latestTransactionMonth)} yet`
      : previousMonthIncome === 0
        ? `Income started in ${formatMonthLabel(latestTransactionMonth)}`
        : incomeChangePercent > 0
          ? `Income increased by ${roundedIncomeChange}% this month`
          : incomeChangePercent < 0
            ? `Income decreased by ${roundedIncomeChange}% this month`
            : "Income stayed flat this month";

  return {
    highestSpendingCategory: highestCategory,
    highestSpendingValue: highestValue,
    monthlyExpenses,
    averageExpense,
    totalTransactions: transactions.length,
    monthlyLabel: formatMonthLabel(latestTransactionMonth),
    currentMonthIncome,
    incomeTrendMessage,
  };
};

export const getFilteredTransactions = (transactions, filters) => {
  const normalizedSearch = filters.searchTerm.trim().toLowerCase();

  return [...transactions]
    .filter((item) => {
      const matchesSearch = item.category.toLowerCase().includes(normalizedSearch);
      const matchesType =
        filters.typeFilter === "all" ? true : item.type === filters.typeFilter;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case "amount-asc":
          return Number(a.amount) - Number(b.amount);
        case "amount-desc":
          return Number(b.amount) - Number(a.amount);
        case "date-asc":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "date-desc":
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });
};
