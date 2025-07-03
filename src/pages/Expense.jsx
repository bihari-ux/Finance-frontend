"use client";

import { useState, useMemo, useEffect } from "react";

import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  PiggyBank,
  Target,
  Plus,
  Search,
  Filter,
  Eye,
  EyeOff,
  MoreHorizontal,
  Calendar,
  CreditCard,
  MapPin,
  Tag,
  Wallet,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Edit,
  Trash2,
  X,
  FileText,
} from "lucide-react";

import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

// AnimatedCounter Component
function AnimatedCounter({ value, prefix = "", suffix = "", duration = 1000 }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setDisplayValue(Math.floor(value * easeOutQuart));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [value, duration]);

  const formatNumber = (num) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(num);
  };

  return (
    <span>
      {prefix}
      {formatNumber(displayValue)}
      {suffix}
    </span>
  );
}

// TransactionFormModal Component
function TransactionFormModal({ open, onOpenChange, onSubmit, transaction }) {
  const EXPENSE_CATEGORIES = [
    { name: "Food & Dining", icon: "🍽️" },
    { name: "Transportation", icon: "🚗" },
    { name: "Shopping", icon: "🛍️" },
    { name: "Entertainment", icon: "🎬" },
    { name: "Bills & Utilities", icon: "⚡" },
    { name: "Healthcare", icon: "🏥" },
    { name: "Education", icon: "📚" },
    { name: "Travel", icon: "✈️" },
    { name: "Fitness", icon: "💪" },
    { name: "Others", icon: "📦" },
  ];

  const INCOME_CATEGORIES = [
    { name: "Salary", icon: "💼" },
    { name: "Freelance", icon: "💻" },
    { name: "Business", icon: "🏢" },
    { name: "Investment", icon: "📈" },
    { name: "Rental", icon: "🏠" },
    { name: "Gift", icon: "🎁" },
    { name: "Others", icon: "💰" },
  ];

  const PAYMENT_METHODS = [
    "Cash",
    "Credit Card",
    "Debit Card",
    "Bank Transfer",
    "Digital Wallet",
    "Check",
    "Others",
  ];

  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    category: "",
    date: new Date().toISOString().split("T")[0],
    type: "expense",
    paymentMethod: "Cash",
    location: "",
    notes: "",
    tags: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (transaction) {
      setFormData({
        description: transaction.description,
        amount: Math.abs(transaction.amount).toString(),
        category: transaction.category,
        date: transaction.date,
        type: transaction.type,
        paymentMethod: transaction.paymentMethod,
        location: transaction.location || "",
        notes: transaction.notes || "",
        tags: transaction.tags.join(", "),
      });
    } else {
      setFormData({
        description: "",
        amount: "",
        category: "",
        date: new Date().toISOString().split("T")[0],
        type: "expense",
        paymentMethod: "Cash",
        location: "",
        notes: "",
        tags: "",
      });
    }
    setErrors({});
  }, [transaction, open]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.amount || Number.parseFloat(formData.amount) <= 0) {
      newErrors.amount = "Amount must be greater than 0";
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    if (!formData.date) {
      newErrors.date = "Date is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const amount = Number.parseFloat(formData.amount);
    const finalAmount =
      formData.type === "expense" ? -Math.abs(amount) : Math.abs(amount);

    const tags = formData.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    const transactionData = {
      id:
        transaction?.id ||
        Date.now().toString(36) + Math.random().toString(36).substr(2),
      description: formData.description.trim(),
      amount: finalAmount,
      category: formData.category,
      date: formData.date,
      type: formData.type,
      paymentMethod: formData.paymentMethod,
      location: formData.location.trim() || undefined,
      notes: formData.notes.trim() || undefined,
      tags,
      createdAt: transaction?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    onSubmit(transactionData);
    onOpenChange(false);
  };

  const categories =
    formData.type === "expense" ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">
            {transaction ? "Edit Transaction" : "Add New Transaction"}
          </h2>
          <button
            onClick={() => onOpenChange(false)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Transaction Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Transaction Type
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="expense"
                  checked={formData.type === "expense"}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      type: e.target.value,
                      category: "",
                    })
                  }
                  className="mr-2"
                />
                <span className="text-red-600">💸 Expense</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="income"
                  checked={formData.type === "income"}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      type: e.target.value,
                      category: "",
                    })
                  }
                  className="mr-2"
                />
                <span className="text-green-600">💰 Income</span>
              </label>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter transaction description"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount *
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value })
              }
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.amount ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="0.00"
            />
            {errors.amount && (
              <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.category ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.name} value={category.name}>
                  {category.icon} {category.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">{errors.category}</p>
            )}
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="inline h-4 w-4 mr-1" />
              Date *
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.date ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.date && (
              <p className="text-red-500 text-sm mt-1">{errors.date}</p>
            )}
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <CreditCard className="inline h-4 w-4 mr-1" />
              Payment Method
            </label>
            <select
              value={formData.paymentMethod}
              onChange={(e) =>
                setFormData({ ...formData, paymentMethod: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {PAYMENT_METHODS.map((method) => (
                <option key={method} value={method}>
                  {method}
                </option>
              ))}
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="inline h-4 w-4 mr-1" />
              Location
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Where did this transaction occur?"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Tag className="inline h-4 w-4 mr-1" />
              Tags
            </label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) =>
                setFormData({ ...formData, tags: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter tags separated by commas (e.g., work, monthly, important)"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FileText className="inline h-4 w-4 mr-1" />
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Add any additional notes..."
            />
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
            >
              {transaction ? "Update Transaction" : "Add Transaction"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Utility functions
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const formatDateRelative = (date) => {
  const now = new Date();
  const transactionDate = new Date(date);
  const diffTime = Math.abs(now.getTime() - transactionDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) return "Today";
  if (diffDays === 2) return "Yesterday";
  if (diffDays <= 7) return `${diffDays - 1} days ago`;
  return formatDate(date);
};

const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

const calculateStats = (transactions) => {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const currentMonthTransactions = transactions.filter((t) => {
    const date = new Date(t.date);
    return (
      date.getMonth() === currentMonth && date.getFullYear() === currentYear
    );
  });

  const totalIncome = currentMonthTransactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = currentMonthTransactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const netSavings = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0 ? (netSavings / totalIncome) * 100 : 0;

  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const recentTransactions = transactions.filter(
    (t) => new Date(t.date) >= sixMonthsAgo
  );
  const monthlyAverage =
    recentTransactions.length > 0
      ? recentTransactions.reduce((sum, t) => sum + Math.abs(t.amount), 0) / 6
      : 0;

  const categoryTotals = currentMonthTransactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount);
      return acc;
    }, {});

  const topCategory =
    Object.entries(categoryTotals).sort(([, a], [, b]) => b - a)[0]?.[0] ||
    "None";

  return {
    totalIncome,
    totalExpenses,
    netSavings,
    savingsRate,
    monthlyAverage,
    topCategory,
    transactionCount: currentMonthTransactions.length,
  };
};

const getMonthlyTrends = (transactions) => {
  const months = [];
  const now = new Date();

  for (let i = 11; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthName = date.toLocaleDateString("en-US", { month: "short" });
    const year = date.getFullYear();

    const monthTransactions = transactions.filter((t) => {
      const tDate = new Date(t.date);
      return (
        tDate.getMonth() === date.getMonth() && tDate.getFullYear() === year
      );
    });

    const income = monthTransactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);
    const expenses = monthTransactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    months.push({
      month: monthName,
      income,
      expenses,
      savings: income - expenses,
    });
  }

  return months;
};

const getCategoryBreakdown = (transactions) => {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const expenseTransactions = transactions.filter((t) => {
    const date = new Date(t.date);
    return (
      t.type === "expense" &&
      date.getMonth() === currentMonth &&
      date.getFullYear() === currentYear
    );
  });

  const categoryTotals = expenseTransactions.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount);
    return acc;
  }, {});

  return Object.entries(categoryTotals)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
};

// Constants
const EXPENSE_CATEGORIES = [
  { name: "Food & Dining", icon: "🍽️", color: "#FF6B6B" },
  { name: "Transportation", icon: "🚗", color: "#4ECDC4" },
  { name: "Shopping", icon: "🛍️", color: "#45B7D1" },
  { name: "Entertainment", icon: "🎬", color: "#96CEB4" },
  { name: "Bills & Utilities", icon: "⚡", color: "#FFEAA7" },
  { name: "Healthcare", icon: "🏥", color: "#DDA0DD" },
  { name: "Education", icon: "📚", color: "#98D8C8" },
  { name: "Travel", icon: "✈️", color: "#F7DC6F" },
  { name: "Fitness", icon: "💪", color: "#BB8FCE" },
  { name: "Others", icon: "📦", color: "#AED6F1" },
];

const INCOME_CATEGORIES = [
  { name: "Salary", icon: "💼", color: "#2ECC71" },
  { name: "Freelance", icon: "💻", color: "#3498DB" },
  { name: "Business", icon: "🏢", color: "#E74C3C" },
  { name: "Investment", icon: "📈", color: "#F39C12" },
  { name: "Rental", icon: "🏠", color: "#9B59B6" },
  { name: "Gift", icon: "🎁", color: "#1ABC9C" },
  { name: "Others", icon: "💰", color: "#34495E" },
];

// Main Expense Component
export default function Expense() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showBalance, setShowBalance] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deletingTransaction, setDeletingTransaction] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  // Sample data with more realistic transactions
  const [transactions, setTransactions] = useState([
    {
      id: generateId(),
      description: "Monthly Salary",
      amount: 5500,
      category: "Salary",
      date: "2024-07-01",
      type: "income",
      paymentMethod: "Bank Transfer",
      location: "Office",
      notes: "Monthly salary deposit",
      tags: ["work", "monthly"],
      createdAt: "2024-07-01T09:00:00Z",
      updatedAt: "2024-07-01T09:00:00Z",
    },
    {
      id: generateId(),
      description: "Freelance Project",
      amount: 1200,
      category: "Freelance",
      date: "2024-07-02",
      type: "income",
      paymentMethod: "Digital Wallet",
      location: "Home",
      notes: "Web development project",
      tags: ["freelance", "web-dev"],
      createdAt: "2024-07-02T14:30:00Z",
      updatedAt: "2024-07-02T14:30:00Z",
    },
    {
      id: generateId(),
      description: "Grocery Shopping",
      amount: -125.5,
      category: "Food & Dining",
      date: "2024-07-03",
      type: "expense",
      paymentMethod: "Credit Card",
      location: "Walmart",
      notes: "Weekly groceries",
      tags: ["groceries", "weekly"],
      createdAt: "2024-07-03T16:45:00Z",
      updatedAt: "2024-07-03T16:45:00Z",
    },
    {
      id: generateId(),
      description: "Netflix Subscription",
      amount: -15.99,
      category: "Entertainment",
      date: "2024-07-04",
      type: "expense",
      paymentMethod: "Credit Card",
      location: "Online",
      notes: "Monthly subscription",
      tags: ["subscription", "streaming"],
      createdAt: "2024-07-04T10:00:00Z",
      updatedAt: "2024-07-04T10:00:00Z",
    },
    {
      id: generateId(),
      description: "Gas Station",
      amount: -65.0,
      category: "Transportation",
      date: "2024-07-04",
      type: "expense",
      paymentMethod: "Debit Card",
      location: "Shell Station",
      notes: "Full tank",
      tags: ["fuel", "car"],
      createdAt: "2024-07-04T18:20:00Z",
      updatedAt: "2024-07-04T18:20:00Z",
    },
    {
      id: generateId(),
      description: "Coffee Shop",
      amount: -8.5,
      category: "Food & Dining",
      date: "2024-07-04",
      type: "expense",
      paymentMethod: "Cash",
      location: "Starbucks",
      notes: "Morning coffee",
      tags: ["coffee", "daily"],
      createdAt: "2024-07-04T08:15:00Z",
      updatedAt: "2024-07-04T08:15:00Z",
    },
  ]);

  // Calculate dynamic data
  const stats = useMemo(() => calculateStats(transactions), [transactions]);
  const monthlyTrends = useMemo(
    () => getMonthlyTrends(transactions),
    [transactions]
  );
  const categoryBreakdown = useMemo(
    () => getCategoryBreakdown(transactions),
    [transactions]
  );

  // Filter transactions
  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const matchesSearch =
        transaction.description
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        transaction.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesCategory =
        categoryFilter === "all" || transaction.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [transactions, searchTerm, categoryFilter]);

  // Get unique categories for filter
  const allCategories = useMemo(
    () => Array.from(new Set(transactions.map((t) => t.category))),
    [transactions]
  );

  const handleAddTransaction = () => {
    setEditingTransaction(null);
    setShowTransactionModal(true);
  };

  const handleEditTransaction = (transaction) => {
    setEditingTransaction(transaction);
    setShowTransactionModal(true);
    setDropdownOpen(null);
  };

  const handleDeleteTransaction = (transaction) => {
    setDeletingTransaction(transaction);
    setShowDeleteDialog(true);
    setDropdownOpen(null);
  };

  const handleTransactionSubmit = (transaction) => {
    if (editingTransaction) {
      setTransactions((prev) =>
        prev.map((t) => (t.id === transaction.id ? transaction : t))
      );
    } else {
      setTransactions((prev) => [transaction, ...prev]);
    }
  };

  const confirmDelete = () => {
    if (deletingTransaction) {
      setTransactions((prev) =>
        prev.filter((t) => t.id !== deletingTransaction.id)
      );
      setDeletingTransaction(null);
      setShowDeleteDialog(false);
    }
  };

  const getCategoryIcon = (category) => {
    const expenseCategory = EXPENSE_CATEGORIES.find((c) => c.name === category);
    const incomeCategory = INCOME_CATEGORIES.find((c) => c.name === category);
    return expenseCategory?.icon || incomeCategory?.icon || "📦";
  };

  const getCategoryColor = (category) => {
    const expenseCategory = EXPENSE_CATEGORIES.find((c) => c.name === category);
    const incomeCategory = INCOME_CATEGORIES.find((c) => c.name === category);
    return expenseCategory?.color || incomeCategory?.color || "#AED6F1";
  };

  return (
    <div className="min-h-screen mt-16 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Enhanced Header */}
      <div className="bg-white/80  backdrop-blur-xl border-b border-white/20 shadow-lg">
        <div className="container  mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 shadow-lg">
                  <DollarSign className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 h-4 w-4 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  FinanceTracker Pro
                </h1>
                <p className="text-gray-600 font-medium">
                  Smart expense management & analytics
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 bg-white/60 rounded-xl px-4 py-2 border border-white/30">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">
                  {new Date().toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
              <button
                onClick={handleAddTransaction}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200"
              >
                <Plus className="h-4 w-4" />
                Add Transaction
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container W-100 mx-auto px-6 py-8">
        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-white/60 backdrop-blur-sm border border-white/30 shadow-lg rounded-lg p-1 mb-8">
          {["dashboard", "transactions", "analytics", "goals"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-md text-sm font-medium transition-all capitalize ${
                activeTab === tab
                  ? "bg-white shadow-md text-blue-600"
                  : "text-gray-600 hover:text-gray-800 hover:bg-white/50"
              }`}
            >
              {tab === "dashboard" && "📊"} {tab === "transactions" && "💳"}{" "}
              {tab === "analytics" && "📈"} {tab === "goals" && "🎯"} {tab}
            </button>
          ))}
        </div>

        {activeTab === "dashboard" && (
          <div className="space-y-8">
            {/* Enhanced Stats Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200/50 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-green-700">
                    Total Income
                  </h3>
                  <div className="rounded-full p-2 bg-green-100">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <div className="text-2xl font-bold text-green-800">
                        {showBalance ? (
                          <AnimatedCounter
                            value={stats.totalIncome}
                            prefix="$"
                          />
                        ) : (
                          "****"
                        )}
                      </div>
                      <button
                        onClick={() => setShowBalance(!showBalance)}
                        className="p-1 hover:bg-green-100 rounded"
                      >
                        {showBalance ? (
                          <Eye className="h-3 w-3" />
                        ) : (
                          <EyeOff className="h-3 w-3" />
                        )}
                      </button>
                    </div>
                    <div className="flex items-center space-x-1">
                      <ArrowUpRight className="h-3 w-3 text-green-600" />
                      <span className="text-xs font-medium text-green-600">
                        +12% from last month
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-rose-50 border border-red-200/50 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-red-700">
                    Total Expenses
                  </h3>
                  <div className="rounded-full p-2 bg-red-100">
                    <TrendingDown className="h-4 w-4 text-red-600" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <div className="text-2xl font-bold text-red-800">
                        {showBalance ? (
                          <AnimatedCounter
                            value={stats.totalExpenses}
                            prefix="$"
                          />
                        ) : (
                          "****"
                        )}
                      </div>
                      <button
                        onClick={() => setShowBalance(!showBalance)}
                        className="p-1 hover:bg-red-100 rounded"
                      >
                        {showBalance ? (
                          <Eye className="h-3 w-3" />
                        ) : (
                          <EyeOff className="h-3 w-3" />
                        )}
                      </button>
                    </div>
                    <div className="flex items-center space-x-1">
                      <ArrowDownRight className="h-3 w-3 text-red-600" />
                      <span className="text-xs font-medium text-red-600">
                        -8% from last month
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200/50 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-blue-700">
                    Net Savings
                  </h3>
                  <div className="rounded-full p-2 bg-blue-100">
                    <PiggyBank className="h-4 w-4 text-blue-600" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <div
                        className={`text-2xl font-bold ${
                          stats.netSavings >= 0
                            ? "text-blue-800"
                            : "text-red-800"
                        }`}
                      >
                        {showBalance ? (
                          <AnimatedCounter
                            value={stats.netSavings}
                            prefix="$"
                          />
                        ) : (
                          "****"
                        )}
                      </div>
                      <button
                        onClick={() => setShowBalance(!showBalance)}
                        className="p-1 hover:bg-blue-100 rounded"
                      >
                        {showBalance ? (
                          <Eye className="h-3 w-3" />
                        ) : (
                          <EyeOff className="h-3 w-3" />
                        )}
                      </button>
                    </div>
                    <div className="flex items-center space-x-1">
                      {stats.netSavings >= 0 ? (
                        <ArrowUpRight className="h-3 w-3 text-blue-600" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3 text-red-600" />
                      )}
                      <span
                        className={`text-xs font-medium ${
                          stats.netSavings >= 0
                            ? "text-blue-600"
                            : "text-red-600"
                        }`}
                      >
                        {stats.savingsRate.toFixed(1)}% savings rate
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-200/50 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-purple-700">
                    Top Category
                  </h3>
                  <div className="rounded-full p-2 bg-purple-100">
                    <Target className="h-4 w-4 text-purple-600" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">
                      {getCategoryIcon(stats.topCategory)}
                    </span>
                    <div className="text-lg font-bold text-purple-800">
                      {stats.topCategory}
                    </div>
                  </div>
                  <div className="text-xs text-purple-600 font-medium">
                    {stats.transactionCount} transactions this month
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Charts Section */}
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Monthly Trends */}
              <div className="lg:col-span-2 bg-white/60 backdrop-blur-sm border border-white/30 shadow-xl rounded-xl p-6">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Monthly Trends
                  </h3>
                  <p className="text-sm text-gray-600">
                    Income vs Expenses over the last 12 months
                  </p>
                </div>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={monthlyTrends}>
                      <defs>
                        <linearGradient
                          id="incomeGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#3B82F6"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor="#3B82F6"
                            stopOpacity={0}
                          />
                        </linearGradient>
                        <linearGradient
                          id="expensesGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#EF4444"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor="#EF4444"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis
                        dataKey="month"
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis axisLine={false} tickLine={false} />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="income"
                        stroke="#3B82F6"
                        fillOpacity={1}
                        fill="url(#incomeGradient)"
                        strokeWidth={3}
                      />
                      <Area
                        type="monotone"
                        dataKey="expenses"
                        stroke="#EF4444"
                        fillOpacity={1}
                        fill="url(#expensesGradient)"
                        strokeWidth={3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Category Breakdown */}
              <div className="bg-white/60 backdrop-blur-sm border border-white/30 shadow-xl rounded-xl p-6">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Wallet className="h-5 w-5" />
                    Spending Categories
                  </h3>
                  <p className="text-sm text-gray-600">
                    This month's expense breakdown
                  </p>
                </div>
                {categoryBreakdown.length > 0 ? (
                  <div className="space-y-4">
                    {categoryBreakdown.slice(0, 5).map((category) => (
                      <div
                        key={category.name}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{
                              backgroundColor: getCategoryColor(category.name),
                            }}
                          />
                          <div className="flex items-center space-x-2">
                            <span className="text-sm">
                              {getCategoryIcon(category.name)}
                            </span>
                            <span className="text-sm font-medium">
                              {category.name}
                            </span>
                          </div>
                        </div>
                        <div className="text-sm font-bold">
                          {formatCurrency(category.value)}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex h-[200px] items-center justify-center text-gray-500">
                    No expense data for this month
                  </div>
                )}
              </div>
            </div>

            {/* Recent Transactions Preview */}
            <div className="bg-white/60 backdrop-blur-sm border border-white/30 shadow-xl rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Recent Transactions
                  </h3>
                  <p className="text-sm text-gray-600">
                    Your latest financial activity
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab("transactions")}
                  className="bg-white/50 hover:bg-white/70 border border-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                >
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {transactions.slice(0, 5).map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 rounded-xl bg-white/50 border border-white/30 hover:bg-white/70 transition-all duration-200"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl">
                        {getCategoryIcon(transaction.category)}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">
                          {transaction.description}
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                            {transaction.category}
                          </span>
                          <span>•</span>
                          <span>{formatDateRelative(transaction.date)}</span>
                          {transaction.location && (
                            <>
                              <span>•</span>
                              <div className="flex items-center space-x-1">
                                <MapPin className="h-3 w-3" />
                                <span>{transaction.location}</span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`text-lg font-bold ${
                          transaction.amount > 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {transaction.amount > 0 ? "+" : ""}
                        {formatCurrency(Math.abs(transaction.amount))}
                      </div>
                      <div className="text-xs text-gray-500">
                        {transaction.paymentMethod}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "transactions" && (
          <div className="space-y-6">
            {/* Enhanced Filters */}
            <div className="bg-white/60 backdrop-blur-sm border border-white/30 shadow-xl rounded-xl p-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Transaction Management
                </h3>
                <p className="text-sm text-gray-600">
                  Search, filter, and manage all your transactions
                </p>
              </div>
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search transactions, categories, or tags..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-white/50 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-4 py-2 bg-white/50 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Categories</option>
                  {allCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleAddTransaction}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200"
                >
                  <Plus className="h-4 w-4" />
                  Add Transaction
                </button>
              </div>
            </div>

            {/* Enhanced Transactions List */}
            <div className="bg-white/60 backdrop-blur-sm border border-white/30 shadow-xl rounded-xl overflow-hidden">
              {filteredTransactions.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">💸</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No transactions found
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your search or filters
                  </p>
                  <button
                    onClick={handleAddTransaction}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium"
                  >
                    Add Your First Transaction
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {filteredTransactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="p-6 hover:bg-white/50 transition-all duration-200"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="text-3xl">
                            {getCategoryIcon(transaction.category)}
                          </div>
                          <div className="space-y-1">
                            <div className="font-semibold text-gray-900">
                              {transaction.description}
                            </div>
                            <div className="flex items-center space-x-3 text-sm text-gray-600">
                              <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                                {transaction.category}
                              </span>
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-3 w-3" />
                                <span>{formatDate(transaction.date)}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <CreditCard className="h-3 w-3" />
                                <span>{transaction.paymentMethod}</span>
                              </div>
                              {transaction.location && (
                                <div className="flex items-center space-x-1">
                                  <MapPin className="h-3 w-3" />
                                  <span>{transaction.location}</span>
                                </div>
                              )}
                            </div>
                            {transaction.tags.length > 0 && (
                              <div className="flex items-center space-x-2">
                                <Tag className="h-3 w-3 text-gray-400" />
                                <div className="flex space-x-1">
                                  {transaction.tags.map((tag) => (
                                    <span
                                      key={tag}
                                      className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                            {transaction.notes && (
                              <p className="text-sm text-gray-500 italic">
                                {transaction.notes}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <div
                              className={`text-xl font-bold ${
                                transaction.amount > 0
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              {transaction.amount > 0 ? "+" : ""}
                              {formatCurrency(Math.abs(transaction.amount))}
                            </div>
                            <div className="text-xs text-gray-500 capitalize">
                              {transaction.type}
                            </div>
                          </div>
                          <div className="relative">
                            <button
                              className="p-2 hover:bg-gray-100 rounded-lg"
                              onClick={() =>
                                setDropdownOpen(
                                  dropdownOpen === transaction.id
                                    ? null
                                    : transaction.id
                                )
                              }
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </button>
                            {dropdownOpen === transaction.id && (
                              <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                                <button
                                  onClick={() =>
                                    handleEditTransaction(transaction)
                                  }
                                  className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50 w-full text-left"
                                >
                                  <Edit className="h-4 w-4" />
                                  Edit
                                </button>
                                <button
                                  onClick={() =>
                                    handleDeleteTransaction(transaction)
                                  }
                                  className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50 w-full text-left text-red-600"
                                >
                                  <Trash2 className="h-4 w-4" />
                                  Delete
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="grid gap-8">
            <div className="bg-white/60 backdrop-blur-sm border border-white/30 shadow-xl rounded-xl p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Advanced Analytics
                </h3>
                <p className="text-sm text-gray-600">
                  Deep insights into your financial patterns
                </p>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                  <div className="text-3xl font-bold text-blue-600">
                    <AnimatedCounter value={stats.savingsRate} suffix="%" />
                  </div>
                  <div className="text-sm text-blue-700 font-medium">
                    Savings Rate
                  </div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                  <div className="text-3xl font-bold text-green-600">
                    <AnimatedCounter value={stats.monthlyAverage} prefix="$" />
                  </div>
                  <div className="text-sm text-green-700 font-medium">
                    Monthly Average
                  </div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl">
                  <div className="text-3xl font-bold text-purple-600">
                    <AnimatedCounter value={stats.transactionCount} />
                  </div>
                  <div className="text-sm text-purple-700 font-medium">
                    Transactions
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "goals" && (
          <div className="bg-white/60 backdrop-blur-sm border border-white/30 shadow-xl rounded-xl p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Target className="h-5 w-5" />
                Financial Goals
              </h3>
              <p className="text-sm text-gray-600">
                Set and track your financial objectives
              </p>
            </div>
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Goals feature coming soon!
              </h3>
              <p className="text-gray-600">
                Set savings goals, track progress, and achieve your financial
                dreams.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Transaction Form Modal */}
      <TransactionFormModal
        open={showTransactionModal}
        onOpenChange={setShowTransactionModal}
        onSubmit={handleTransactionSubmit}
        transaction={editingTransaction}
      />

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-2">Delete Transaction</h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to delete this transaction? This action
              cannot be undone.
            </p>
            {deletingTransaction && (
              <div className="bg-gray-50 p-4 rounded-lg space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="font-medium">Description:</span>
                  <span>{deletingTransaction.description}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Amount:</span>
                  <span
                    className={
                      deletingTransaction.amount > 0
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {formatCurrency(Math.abs(deletingTransaction.amount))}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Category:</span>
                  <span>{deletingTransaction.category}</span>
                </div>
              </div>
            )}
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteDialog(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete Transaction
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Click outside to close dropdown */}
      {dropdownOpen && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setDropdownOpen(null)}
        />
      )}
    </div>
  );
}
