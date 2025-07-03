import React, { useState, useEffect } from "react";
import {
  Home,
  DollarSign,
  CreditCard,
  TrendingUp,
  PieChart,
  Settings,
  Bell,
  User,
  Calendar,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  Plus,
  Minus,
  Edit,
  Trash2,
  Filter,
  Download,
  Upload,
  Target,
  Calculator,
  BarChart3,
  Wallet,
  ShoppingCart,
  Car,
  Home as HomeIcon,
  Coffee,
  X,
  Check,
  Search,
} from "lucide-react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showBalance, setShowBalance] = useState(true);
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      description: "Grocery Shopping",
      amount: -85.5,
      date: "2023-02-05",
      category: "Food",
      type: "expense",
    },
    {
      id: 2,
      description: "Salary Deposit",
      amount: 5000,
      date: "2023-02-01",
      category: "Income",
      type: "income",
    },
    {
      id: 3,
      description: "Electricity Bill",
      amount: -120,
      date: "2023-01-30",
      category: "Utilities",
      type: "expense",
    },
    {
      id: 4,
      description: "Gas Station",
      amount: -45,
      date: "2023-01-29",
      category: "Transportation",
      type: "expense",
    },
    {
      id: 5,
      description: "Freelance Work",
      amount: 800,
      date: "2023-01-28",
      category: "Income",
      type: "income",
    },
  ]);
  const [goals, setGoals] = useState([
    {
      id: 1,
      name: "Emergency Fund",
      target: 10000,
      current: 6500,
      deadline: "2023-12-31",
    },
    {
      id: 2,
      name: "Vacation",
      target: 3000,
      current: 1200,
      deadline: "2023-08-15",
    },
    {
      id: 3,
      name: "New Car",
      target: 25000,
      current: 8000,
      deadline: "2024-06-30",
    },
  ]);
  const [budgets, setBudgets] = useState([
    { id: 1, category: "Food", budget: 500, spent: 386, color: "bg-green-500" },
    {
      id: 2,
      category: "Transportation",
      budget: 300,
      spent: 190,
      color: "bg-orange-500",
    },
    {
      id: 3,
      category: "Entertainment",
      budget: 200,
      spent: 150,
      color: "bg-purple-500",
    },
    {
      id: 4,
      category: "Utilities",
      budget: 250,
      spent: 120,
      color: "bg-blue-500",
    },
  ]);
  const [newTransaction, setNewTransaction] = useState({
    description: "",
    amount: "",
    category: "",
    type: "expense",
  });
  const [newGoal, setNewGoal] = useState({
    name: "",
    target: "",
    current: "",
    deadline: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "3 Bills are past due. Pay soon to avoid late fees.",
      type: "warning",
      read: false,
    },
    {
      id: 2,
      message: "Your investment portfolio is up 12% this month.",
      type: "success",
      read: false,
    },
    {
      id: 3,
      message: "Monthly budget for Food category exceeded by $86.",
      type: "error",
      read: false,
    },
  ]);

  const [balance, setBalance] = useState(14822);
  const [totalIncome, setTotalIncome] = useState(24050);
  const [totalExpenses, setTotalExpenses] = useState(9228);

  useEffect(() => {
    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);
    const expenses = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    setTotalIncome(income);
    setTotalExpenses(expenses);
    setBalance(income - expenses);
  }, [transactions]);

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "transactions", label: "Transactions", icon: CreditCard },
    { id: "budgets", label: "Budgets", icon: PieChart },
    { id: "goals", label: "Goals", icon: Target },
    { id: "investments", label: "Investments", icon: TrendingUp },
    { id: "reports", label: "Reports", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const expenseCategories = [
    "Food",
    "Transportation",
    "Housing",
    "Utilities",
    "Entertainment",
    "Healthcare",
    "Shopping",
    "Education",
    "Personal",
    "Other",
  ];

  const addTransaction = () => {
    if (
      newTransaction.description &&
      newTransaction.amount &&
      newTransaction.category
    ) {
      const transaction = {
        id: Date.now(),
        description: newTransaction.description,
        amount:
          newTransaction.type === "expense"
            ? -Math.abs(parseFloat(newTransaction.amount))
            : parseFloat(newTransaction.amount),
        date: new Date().toISOString().split("T")[0],
        category: newTransaction.category,
        type: newTransaction.type,
      };
      setTransactions([transaction, ...transactions]);
      setNewTransaction({
        description: "",
        amount: "",
        category: "",
        type: "expense",
      });
      setShowAddTransaction(false);
    }
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const addGoal = () => {
    if (newGoal.name && newGoal.target && newGoal.deadline) {
      const goal = {
        id: Date.now(),
        name: newGoal.name,
        target: parseFloat(newGoal.target),
        current: parseFloat(newGoal.current) || 0,
        deadline: newGoal.deadline,
      };
      setGoals([...goals, goal]);
      setNewGoal({ name: "", target: "", current: "", deadline: "" });
      setShowAddGoal(false);
    }
  };

  const updateGoalProgress = (id, amount) => {
    setGoals(
      goals.map((goal) =>
        goal.id === id
          ? { ...goal, current: Math.max(0, goal.current + amount) }
          : goal
      )
    );
  };

  const markNotificationRead = (id) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || transaction.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const exportData = () => {
    const data = {
      transactions,
      goals,
      budgets,
      balance,
      totalIncome,
      totalExpenses,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "finance_data.json";
    a.click();
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-cyan-100 mb-2">Available Balance</p>
              <div className="flex items-center space-x-3">
                <span className="text-3xl font-bold">
                  {showBalance ? `$${balance.toLocaleString()}` : "****"}
                </span>
                <button
                  onClick={() => setShowBalance(!showBalance)}
                  className="text-cyan-100 hover:text-white transition-colors"
                >
                  {showBalance ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <Wallet className="text-cyan-200" size={32} />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-green-100 mb-2">Total Income</p>
              <span className="text-3xl font-bold">
                ${totalIncome.toLocaleString()}
              </span>
            </div>
            <ArrowUp className="text-green-200" size={32} />
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-red-100 mb-2">Total Expenses</p>
              <span className="text-3xl font-bold">
                ${totalExpenses.toLocaleString()}
              </span>
            </div>
            <ArrowDown className="text-red-200" size={32} />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => setShowAddTransaction(true)}
            className="flex items-center space-x-2 bg-cyan-600 hover:bg-cyan-700 p-3 rounded-lg transition-colors"
          >
            <Plus size={20} />
            <span>Add Transaction</span>
          </button>
          <button
            onClick={() => setShowAddGoal(true)}
            className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 p-3 rounded-lg transition-colors"
          >
            <Target size={20} />
            <span>Add Goal</span>
          </button>
          <button
            onClick={exportData}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 p-3 rounded-lg transition-colors"
          >
            <Download size={20} />
            <span>Export Data</span>
          </button>
          <button
            onClick={() => setActiveTab("reports")}
            className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 p-3 rounded-lg transition-colors"
          >
            <BarChart3 size={20} />
            <span>View Reports</span>
          </button>
        </div>
      </div>

      {/* Budget Overview */}
      <div className="bg-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Budget Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {budgets.map((budget) => (
            <div key={budget.id} className="bg-gray-700 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">{budget.category}</span>
                <span className="text-sm text-gray-400">
                  ${budget.spent} / ${budget.budget}
                </span>
              </div>
              <div className="w-full bg-gray-600 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${budget.color}`}
                  style={{
                    width: `${Math.min(
                      (budget.spent / budget.budget) * 100,
                      100
                    )}%`,
                  }}
                ></div>
              </div>
              <p className="text-sm text-gray-400 mt-1">
                {budget.spent > budget.budget
                  ? "Over budget"
                  : `$${budget.budget - budget.spent} remaining`}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Goals Progress */}
      <div className="bg-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Goals Progress</h3>
        <div className="space-y-4">
          {goals.map((goal) => (
            <div key={goal.id} className="bg-gray-700 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">{goal.name}</span>
                <span className="text-sm text-gray-400">
                  ${goal.current.toLocaleString()} / $
                  {goal.target.toLocaleString()}
                </span>
              </div>
              <div className="w-full bg-gray-600 rounded-full h-2 mb-2">
                <div
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full"
                  style={{ width: `${(goal.current / goal.target) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">
                  Due: {goal.deadline}
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => updateGoalProgress(goal.id, 100)}
                    className="bg-green-600 hover:bg-green-700 p-1 rounded transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                  <button
                    onClick={() => updateGoalProgress(goal.id, -100)}
                    className="bg-red-600 hover:bg-red-700 p-1 rounded transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTransactions = () => (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="bg-gray-800 rounded-xl p-6">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search
                className="absolute left-3 top-3 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-500"
          >
            <option value="all">All Categories</option>
            {expenseCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <button
            onClick={() => setShowAddTransaction(true)}
            className="flex items-center space-x-2 bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-lg transition-colors"
          >
            <Plus size={20} />
            <span>Add Transaction</span>
          </button>
        </div>
      </div>

      {/* Transactions List */}
      <div className="bg-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
        <div className="space-y-2">
          {filteredTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-2 h-2 rounded-full ${
                    transaction.type === "income"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                ></div>
                <div>
                  <p className="font-medium">{transaction.description}</p>
                  <p className="text-sm text-gray-400">
                    {transaction.category} • {transaction.date}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span
                  className={`font-semibold ${
                    transaction.amount > 0 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {transaction.amount > 0 ? "+" : ""}$
                  {Math.abs(transaction.amount).toFixed(2)}
                </span>
                <button
                  onClick={() => deleteTransaction(transaction.id)}
                  className="text-red-400 hover:text-red-300 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderBudgets = () => (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Monthly Budgets</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {budgets.map((budget) => (
            <div key={budget.id} className="bg-gray-700 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-semibold">{budget.category}</h4>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    budget.spent > budget.budget
                      ? "bg-red-500/20 text-red-400"
                      : "bg-green-500/20 text-green-400"
                  }`}
                >
                  {budget.spent > budget.budget ? "Over Budget" : "On Track"}
                </span>
              </div>
              <div className="mb-2">
                <div className="flex justify-between text-sm text-gray-400 mb-1">
                  <span>Spent</span>
                  <span>
                    ${budget.spent} / ${budget.budget}
                  </span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full ${budget.color}`}
                    style={{
                      width: `${Math.min(
                        (budget.spent / budget.budget) * 100,
                        100
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>
              <p className="text-sm text-gray-400">
                {budget.spent > budget.budget
                  ? `Over by $${budget.spent - budget.budget}`
                  : `$${budget.budget - budget.spent} remaining`}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderGoals = () => (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Financial Goals</h3>
          <button
            onClick={() => setShowAddGoal(true)}
            className="flex items-center space-x-2 bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-lg transition-colors"
          >
            <Plus size={20} />
            <span>Add Goal</span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {goals.map((goal) => (
            <div key={goal.id} className="bg-gray-700 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-semibold">{goal.name}</h4>
                <span className="text-sm text-gray-400">
                  {Math.round((goal.current / goal.target) * 100)}% Complete
                </span>
              </div>
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-400 mb-1">
                  <span>Progress</span>
                  <span>
                    ${goal.current.toLocaleString()} / $
                    {goal.target.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 h-3 rounded-full"
                    style={{ width: `${(goal.current / goal.target) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">
                  Due: {goal.deadline}
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => updateGoalProgress(goal.id, 100)}
                    className="bg-green-600 hover:bg-green-700 p-2 rounded transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                  <button
                    onClick={() => updateGoalProgress(goal.id, -100)}
                    className="bg-red-600 hover:bg-red-700 p-2 rounded transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`p-3 rounded-lg border ${
            notification.type === "warning"
              ? "bg-orange-500/20 border-orange-500"
              : notification.type === "success"
              ? "bg-green-500/20 border-green-500"
              : "bg-red-500/20 border-red-500"
          } ${notification.read ? "opacity-50" : ""}`}
        >
          <div className="flex justify-between items-start">
            <p className="text-sm">{notification.message}</p>
            <div className="flex space-x-1">
              {!notification.read && (
                <button
                  onClick={() => markNotificationRead(notification.id)}
                  className="text-green-400 hover:text-green-300"
                >
                  <Check size={16} />
                </button>
              )}
              <button
                onClick={() => deleteNotification(notification.id)}
                className="text-red-400 hover:text-red-300"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Sidebar */}
      <div className="w-64 mt-16 bg-gray-800 p-6 flex flex-col">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-cyan-400">FinanceTracker</h1>
          <p className="text-gray-400 text-sm">Personal Finance Manager</p>
        </div>

        <nav className="space-y-2 flex-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === item.id
                    ? "bg-cyan-600 text-white"
                    : "text-gray-300 hover:bg-gray-700"
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="mt-auto">
          <div className="flex items-center space-x-3 p-4 bg-gray-700 rounded-lg">
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
              <User size={20} />
            </div>
            <div>
              <p className="font-medium">Simon K. Jimmy</p>
              <p className="text-sm text-gray-400">Premium User</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 mt-16 p-8 mt-0 w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold capitalize">{activeTab}</h2>
            <p className="text-gray-400 flex items-center mt-1">
              <Calendar className="mr-2" size={16} />
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button className="relative p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                <Bell size={20} />
                {notifications.filter((n) => !n.read).length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications.filter((n) => !n.read).length}
                  </span>
                )}
              </button>
              <div className="absolute right-0 top-12 w-80 bg-gray-800 rounded-lg shadow-lg p-4 z-10">
                <h4 className="font-semibold mb-3">Notifications</h4>
                {renderNotifications()}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="w-full">
          {activeTab === "dashboard" && renderDashboard()}
          {activeTab === "transactions" && renderTransactions()}
          {activeTab === "budgets" && renderBudgets()}
          {activeTab === "goals" && renderGoals()}
          {activeTab === "investments" && (
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">
                Investment Portfolio
              </h3>
              <p className="text-gray-400">
                Investment tracking coming soon...
              </p>
            </div>
          )}
          {activeTab === "reports" && (
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Financial Reports</h3>
              <p className="text-gray-400">Detailed reports coming soon...</p>
            </div>
          )}
          {activeTab === "settings" && (
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Settings</h3>
              <p className="text-gray-400">Settings panel coming soon...</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Transaction Modal */}
      {showAddTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl p-6 w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Add Transaction</h3>
              <button
                onClick={() => setShowAddTransaction(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Type</label>
                <select
                  value={newTransaction.type}
                  onChange={(e) =>
                    setNewTransaction({
                      ...newTransaction,
                      type: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-500"
                >
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Description
                </label>
                <input
                  type="text"
                  value={newTransaction.description}
                  onChange={(e) =>
                    setNewTransaction({
                      ...newTransaction,
                      description: e.target.value,
                    })
                  }
                  placeholder="Enter description..."
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Amount
                </label>
                <input
                  type="number"
                  value={newTransaction.amount}
                  onChange={(e) =>
                    setNewTransaction({
                      ...newTransaction,
                      amount: e.target.value,
                    })
                  }
                  placeholder="0.00"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Category
                </label>
                <select
                  value={newTransaction.category}
                  onChange={(e) =>
                    setNewTransaction({
                      ...newTransaction,
                      category: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-500"
                >
                  <option value="">Select category...</option>
                  {expenseCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowAddTransaction(false)}
                  className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={addTransaction}
                  className="flex-1 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors"
                >
                  Add Transaction
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Goal Modal */}
      {showAddGoal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl p-6 w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Add Financial Goal</h3>
              <button
                onClick={() => setShowAddGoal(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Goal Name
                </label>
                <input
                  type="text"
                  value={newGoal.name}
                  onChange={(e) =>
                    setNewGoal({ ...newGoal, name: e.target.value })
                  }
                  placeholder="Enter goal name..."
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Target Amount
                </label>
                <input
                  type="number"
                  value={newGoal.target}
                  onChange={(e) =>
                    setNewGoal({ ...newGoal, target: e.target.value })
                  }
                  placeholder="0.00"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Current Amount
                </label>
                <input
                  type="number"
                  value={newGoal.current}
                  onChange={(e) =>
                    setNewGoal({ ...newGoal, current: e.target.value })
                  }
                  placeholder="0.00"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Deadline
                </label>
                <input
                  type="date"
                  value={newGoal.deadline}
                  onChange={(e) =>
                    setNewGoal({ ...newGoal, deadline: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowAddGoal(false)}
                  className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={addGoal}
                  className="flex-1 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors"
                >
                  Add Goal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
