import React, { useEffect, useState } from "react";
import {
  Plus,
  Filter,
  Search,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  Tag,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
} from "lucide-react";

const Transactions = () => {
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      title: "Grocery Shopping",
      amount: 125.5,
      category: "Food",
      date: "2024-12-15",
      description: "Weekly groceries",
    },
    {
      id: 2,
      title: "Gas Bill",
      amount: 85.0,
      category: "Utilities",
      date: "2024-12-14",
      description: "Monthly gas bill",
    },
    {
      id: 3,
      title: "Coffee",
      amount: 4.5,
      category: "Food",
      date: "2024-12-13",
      description: "Morning coffee",
    },
    {
      id: 4,
      title: "Netflix",
      amount: 15.99,
      category: "Entertainment",
      date: "2024-12-12",
      description: "Monthly subscription",
    },
    {
      id: 5,
      title: "Uber",
      amount: 22.3,
      category: "Transportation",
      date: "2024-12-11",
      description: "Ride to office",
    },
  ]);

  const [incomes, setIncomes] = useState([
    {
      id: 1,
      title: "Salary",
      amount: 3500.0,
      category: "Job",
      date: "2024-12-01",
      description: "Monthly salary",
    },
    {
      id: 2,
      title: "Freelance Work",
      amount: 800.0,
      category: "Freelance",
      date: "2024-12-05",
      description: "Website project",
    },
    {
      id: 3,
      title: "Investment Returns",
      amount: 150.0,
      category: "Investment",
      date: "2024-12-10",
      description: "Stock dividends",
    },
    {
      id: 4,
      title: "Side Project",
      amount: 200.0,
      category: "Business",
      date: "2024-12-08",
      description: "App development",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [filter, setFilter] = useState({
    category: "",
    sortByAmount: "",
    search: "",
  });
  const [activeTab, setActiveTab] = useState("Expenses");
  const [showBalance, setShowBalance] = useState(true);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    date: new Date().toISOString().split("T")[0],
    description: "",
  });

  const expenseCategories = [
    "Food",
    "Utilities",
    "Entertainment",
    "Transportation",
    "Healthcare",
    "Shopping",
    "Education",
    "Travel",
  ];
  const incomeCategories = [
    "Job",
    "Freelance",
    "Investment",
    "Business",
    "Gift",
    "Other",
  ];

  // Calculate totals
  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );
  const totalIncomes = incomes.reduce((sum, income) => sum + income.amount, 0);
  const balance = totalIncomes - totalExpenses;

  const applyFilters = (items) => {
    return items
      .filter((item) => {
        const matchesCategory = filter.category
          ? item.category === filter.category
          : true;
        const matchesSearch = filter.search
          ? item.title.toLowerCase().includes(filter.search.toLowerCase()) ||
            item.description.toLowerCase().includes(filter.search.toLowerCase())
          : true;
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (filter.sortByAmount === "asc") return a.amount - b.amount;
        if (filter.sortByAmount === "desc") return b.amount - a.amount;
        return new Date(b.date) - new Date(a.date); // Default: newest first
      });
  };

  const filteredExpenses = applyFilters(expenses);
  const filteredIncomes = applyFilters(incomes);

  const handleSubmit = () => {
    if (
      !formData.title ||
      !formData.amount ||
      !formData.category ||
      !formData.date
    ) {
      alert("Please fill in all required fields");
      return;
    }

    const newTransaction = {
      id: Date.now(),
      ...formData,
      amount: parseFloat(formData.amount),
    };

    if (editingTransaction) {
      if (activeTab === "Expenses") {
        setExpenses(
          expenses.map((exp) =>
            exp.id === editingTransaction.id ? newTransaction : exp
          )
        );
      } else {
        setIncomes(
          incomes.map((inc) =>
            inc.id === editingTransaction.id ? newTransaction : inc
          )
        );
      }
      setEditingTransaction(null);
    } else {
      if (activeTab === "Expenses") {
        setExpenses([...expenses, newTransaction]);
      } else {
        setIncomes([...incomes, newTransaction]);
      }
    }

    setFormData({
      title: "",
      amount: "",
      category: "",
      date: new Date().toISOString().split("T")[0],
      description: "",
    });
    setShowModal(false);
  };

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setFormData({
      title: transaction.title,
      amount: transaction.amount.toString(),
      category: transaction.category,
      date: transaction.date,
      description: transaction.description,
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      if (activeTab === "Expenses") {
        setExpenses(expenses.filter((exp) => exp.id !== id));
      } else {
        setIncomes(incomes.filter((inc) => inc.id !== id));
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      amount: "",
      category: "",
      date: new Date().toISOString().split("T")[0],
      description: "",
    });
    setEditingTransaction(null);
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-blue-50 to-indigo-100 overflow-auto">
      <div className=" w-full h-full pt-20 px-4">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 flex items-center gap-2">
              <DollarSign className="text-green-600" />
              Transaction Manager
            </h1>
            <button
              onClick={() => {
                resetForm();
                setShowModal(true);
              }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg"
            >
              <Plus size={20} />
              Add Transaction
            </button>
          </div>
        </div>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Income
                </p>
                <p className="text-2xl font-bold text-green-600">
                  ${showBalance ? totalIncomes.toFixed(2) : "••••••"}
                </p>
              </div>
              <TrendingUp className="text-green-500" size={24} />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Expenses
                </p>
                <p className="text-2xl font-bold text-red-600">
                  ${showBalance ? totalExpenses.toFixed(2) : "••••••"}
                </p>
              </div>
              <TrendingDown className="text-red-500" size={24} />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Balance</p>
                <p
                  className={`text-2xl font-bold ${
                    balance >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  ${showBalance ? balance.toFixed(2) : "••••••"}
                </p>
              </div>
              <DollarSign
                className={balance >= 0 ? "text-green-500" : "text-red-500"}
                size={24}
              />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Transactions
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  {expenses.length + incomes.length}
                </p>
              </div>
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                {showBalance ? <Eye size={24} /> : <EyeOff size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Filters and Tabs */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
            <div className="flex gap-4 border-b-2 border-gray-200">
              <button
                onClick={() => setActiveTab("Expenses")}
                className={`py-2 px-4 font-semibold transition-colors ${
                  activeTab === "Expenses"
                    ? "border-b-2 border-red-500 text-red-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Expenses ({expenses.length})
              </button>
              <button
                onClick={() => setActiveTab("Incomes")}
                className={`py-2 px-4 font-semibold transition-colors ${
                  activeTab === "Incomes"
                    ? "border-b-2 border-green-500 text-green-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Incomes ({incomes.length})
              </button>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search
                className="absolute left-3 top-3 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search transactions..."
                value={filter.search}
                onChange={(e) =>
                  setFilter({ ...filter, search: e.target.value })
                }
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={filter.category}
              onChange={(e) =>
                setFilter({ ...filter, category: e.target.value })
              }
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Categories</option>
              {(activeTab === "Expenses"
                ? expenseCategories
                : incomeCategories
              ).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <select
              value={filter.sortByAmount}
              onChange={(e) =>
                setFilter({ ...filter, sortByAmount: e.target.value })
              }
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Sort by Date</option>
              <option value="asc">Amount: Low to High</option>
              <option value="desc">Amount: High to Low</option>
            </select>
          </div>
        </div>

        {/* Transaction List */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            {activeTab === "Expenses" ? (
              <TrendingDown className="text-red-500" size={20} />
            ) : (
              <TrendingUp className="text-green-500" size={20} />
            )}
            {activeTab}
          </h2>

          <div className="space-y-3">
            {(activeTab === "Expenses"
              ? filteredExpenses
              : filteredIncomes
            ).map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        activeTab === "Expenses" ? "bg-red-500" : "bg-green-500"
                      }`}
                    ></div>
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {transaction.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {transaction.description}
                      </p>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Tag size={12} />
                          {transaction.category}
                        </span>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Calendar size={12} />
                          {new Date(transaction.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`text-xl font-bold ${
                      activeTab === "Expenses"
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    ${transaction.amount.toFixed(2)}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(transaction)}
                      className="text-blue-600 hover:text-blue-800 p-1 rounded"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(transaction.id)}
                      className="text-red-600 hover:text-red-800 p-1 rounded"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {(activeTab === "Expenses" ? filteredExpenses : filteredIncomes)
            .length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>No transactions found.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              {editingTransaction ? "Edit Transaction" : "Add New Transaction"}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Category</option>
                  {(activeTab === "Expenses"
                    ? expenseCategories
                    : incomeCategories
                  ).map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="3"
                />
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                >
                  {editingTransaction ? "Update" : "Add"} Transaction
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transactions;
