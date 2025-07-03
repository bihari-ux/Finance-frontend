"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  CreditCard,
  Calendar,
  PieChart,
  Settings,
  HelpCircle,
  Menu,
  MoreHorizontal,
  TrendingUp,
  TrendingDown,
  Plus,
  Minus,
  Moon,
} from "lucide-react";

// Custom Card Components
const Card = ({ children, className = "" }) => (
  <div
    className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}
  >
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={`px-6 py-4 ${className}`}>{children}</div>
);

const CardTitle = ({ children, className = "" }) => (
  <h3
    className={`text-lg font-semibold leading-none tracking-tight ${className}`}
  >
    {children}
  </h3>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`px-6 pb-6 ${className}`}>{children}</div>
);

// Custom Button Component
const Button = ({
  children,
  variant = "default",
  size = "default",
  className = "",
  onClick,
  disabled,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";

  const variants = {
    default:
      "bg-primary text-primary-foreground hover:bg-primary/90 bg-blue-600 text-white hover:bg-blue-700",
    destructive: "bg-red-600 text-white hover:bg-red-700",
    ghost: "hover:bg-gray-100 hover:text-gray-900",
  };

  const sizes = {
    default: "h-10 py-2 px-4",
    sm: "h-9 px-3 rounded-md",
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

// Custom Progress Component
const Progress = ({ value = 0, className = "" }) => (
  <div
    className={`relative h-4 w-full overflow-hidden rounded-full bg-gray-200 ${className}`}
  >
    <div
      className="h-full bg-blue-600 transition-all duration-300 ease-in-out"
      style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
    />
  </div>
);

export default function BudgetDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: "Overview", active: true },
    { icon: CreditCard, label: "Transactions" },
    { icon: Calendar, label: "Scheduled transactions" },
    { icon: CreditCard, label: "Accounts" },
    { icon: CreditCard, label: "Credit cards" },
    { icon: PieChart, label: "Budgets" },
    { icon: TrendingDown, label: "Debts" },
    { icon: PieChart, label: "Charts" },
    { icon: Calendar, label: "Calendar" },
    { icon: Settings, label: "Import/Export" },
    { icon: Settings, label: "Preferences" },
    { icon: Settings, label: "Bank synchronization" },
    { icon: Settings, label: "Settings" },
    { icon: HelpCircle, label: "Help" },
  ];

  const accounts = [
    { name: "Wallet", balance: "€90.24", currency: "EUR - €" },
    { name: "Bank account", balance: "€13,537.47", currency: "EUR - €" },
  ];

  const budgets = [
    {
      name: "Entertainment",
      icon: "🎬",
      date: "27/05/2024",
      spent: "€0.00",
      budget: "€8.00",
      total: "€30.00",
      percentage: 27,
      color: "bg-cyan-500",
    },
    {
      name: "Eating out",
      icon: "🍽️",
      date: "01/05/2024",
      spent: "€0.00",
      budget: "€45.50",
      total: "€100.00",
      percentage: 46,
      color: "bg-red-500",
    },
    {
      name: "Fuel",
      icon: "⛽",
      date: "01/05/2024",
      spent: "€0.00",
      budget: "€30.00",
      total: "€120.00",
      percentage: 25,
      color: "bg-yellow-500",
    },
  ];

  const transactions = [
    {
      icon: "🍺",
      name: "Bar",
      account: "Wallet",
      amount: "-€2.00",
      date: "29/05/2024",
    },
  ];

  const chartData = [
    { day: "23 Thu", income: 0, expense: 120 },
    { day: "24 Fri", income: 45, expense: 10 },
    { day: "25 Sat", income: 0, expense: 65 },
    { day: "26 Sun", income: 0, expense: 25 },
    { day: "27 Mon", income: 0, expense: 45 },
    { day: "28 Tue", income: 0, expense: 22 },
  ];

  // Donut Chart Component
  const DonutChart = ({ percentage, color = "red" }) => {
    const radius = 28;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = `${
      (percentage / 100) * circumference
    } ${circumference}`;

    return (
      <div className="relative w-16 h-16">
        <svg className="w-16 h-16 transform -rotate-90">
          <circle
            cx="32"
            cy="32"
            r={radius}
            stroke={color === "red" ? "#fee2e2" : "#dcfce7"}
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="32"
            cy="32"
            r={radius}
            stroke={color === "red" ? "#ef4444" : "#22c55e"}
            strokeWidth="8"
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-medium">{percentage}%</span>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">FB</span>
            </div>
            <span className="font-semibold text-gray-800">Fast Budget</span>
          </div>
        </div>

        <nav className="mt-4">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href="#"
              className={`flex items-center px-4 py-2 text-sm ${
                item.active
                  ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <item.icon className="w-4 h-4 mr-3" />
              {item.label}
            </a>
          ))}
        </nav>

        <div className="absolute bottom-4 left-4 flex items-center space-x-2">
          <Moon className="w-4 h-4" />
          <span className="text-sm text-gray-600">Dark mode</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-blue-500 text-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden text-white hover:bg-blue-600"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <Menu className="w-5 h-5" />
              </Button>
              <h1 className="text-xl font-semibold">Overview</h1>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-blue-600"
            >
              <MoreHorizontal className="w-5 h-5" />
            </Button>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Summary Section */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Balance Summary */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">
                      Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Balance:</span>
                        <span className="font-semibold text-green-600">
                          €13,627.71
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Credit cards:</span>
                        <span className="font-semibold text-red-600">
                          -€249.00
                        </span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span className="text-sm font-medium">Total:</span>
                        <span className="font-semibold text-green-600">
                          €13,378.71
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* This Month */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">
                      This month
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-2">
                      <DonutChart percentage={70} color="red" />
                      <div className="text-right">
                        <div className="flex items-center text-green-600">
                          <TrendingUp className="w-4 h-4 mr-1" />
                          <span className="font-semibold">€1,452.00</span>
                        </div>
                        <div className="flex items-center text-red-600 text-sm">
                          <TrendingDown className="w-4 h-4 mr-1" />
                          <span>-€617.29</span>
                        </div>
                        <div className="text-sm font-medium">€834.71</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Last Month */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">
                      Last month
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-2">
                      <DonutChart percentage={80} color="green" />
                      <div className="text-right">
                        <div className="flex items-center text-green-600">
                          <TrendingUp className="w-4 h-4 mr-1" />
                          <span className="font-semibold">€1,500.00</span>
                        </div>
                        <div className="flex items-center text-red-600 text-sm">
                          <TrendingDown className="w-4 h-4 mr-1" />
                          <span>-€345.00</span>
                        </div>
                        <div className="text-sm font-medium">€1,155.00</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Balance Chart */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">
                      Balance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-24 flex items-end justify-between">
                      <svg className="w-full h-full" viewBox="0 0 200 100">
                        <polyline
                          fill="none"
                          stroke="#3b82f6"
                          strokeWidth="2"
                          points="10,80 30,75 50,85 70,60 90,50 110,40 130,45 150,30 170,25 190,20"
                        />
                        <polygon
                          fill="rgba(59, 130, 246, 0.1)"
                          points="10,100 30,75 50,85 70,60 90,50 110,40 130,45 150,30 170,25 190,20 190,100"
                        />
                      </svg>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Accounts */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Accounts</CardTitle>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {accounts.map((account, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center"
                      >
                        <div>
                          <div className="font-medium">{account.name}</div>
                          <div className="text-sm text-gray-500">
                            {account.currency}
                          </div>
                        </div>
                        <div className="font-semibold text-green-600">
                          {account.balance}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Credit Cards */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Credit cards</CardTitle>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Credit card</span>
                      <span className="font-semibold text-red-600">
                        -€189.00
                      </span>
                    </div>
                    <Progress value={19} className="h-2" />
                    <div className="text-right text-sm text-gray-500">19%</div>
                  </div>
                </CardContent>
              </Card>

              {/* Last 7 Days Chart */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Last 7 days</CardTitle>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="h-48 flex items-end justify-between space-x-2">
                    {chartData.map((data, index) => (
                      <div
                        key={index}
                        className="flex-1 flex flex-col items-center space-y-1"
                      >
                        <div className="flex flex-col items-center space-y-1 h-32 justify-end">
                          {data.expense > 0 && (
                            <div
                              className="w-full bg-red-500 rounded-t"
                              style={{
                                height: `${(data.expense / 120) * 80}px`,
                              }}
                            />
                          )}
                          {data.income > 0 && (
                            <div
                              className="w-full bg-green-500 rounded-t"
                              style={{
                                height: `${(data.income / 120) * 80}px`,
                              }}
                            />
                          )}
                        </div>
                        <span className="text-xs text-gray-500 text-center">
                          {data.day}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center space-x-4 mt-4 text-sm">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                      <span>Income</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-500 rounded mr-2"></div>
                      <span>Expenses</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Transactions */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Transactions</CardTitle>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {transactions.map((transaction, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                            <span className="text-lg">{transaction.icon}</span>
                          </div>
                          <div>
                            <div className="font-medium">
                              {transaction.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {transaction.account}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-red-600">
                            {transaction.amount}
                          </div>
                          <div className="text-sm text-gray-500">
                            {transaction.date}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Budgets */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Budgets</CardTitle>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {budgets.map((budget, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div
                              className={`w-8 h-8 ${budget.color} rounded-full flex items-center justify-center`}
                            >
                              <span className="text-white text-sm">
                                {budget.icon}
                              </span>
                            </div>
                            <span className="font-medium">{budget.name}</span>
                          </div>
                          <span className="text-sm text-gray-500">
                            {budget.percentage}%
                          </span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>{budget.date}</span>
                          <span>{budget.date}</span>
                        </div>
                        <Progress value={budget.percentage} className="h-2" />
                        <div className="flex justify-between text-sm">
                          <span>{budget.spent}</span>
                          <span>{budget.budget}</span>
                          <span>{budget.total}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Cash Flow */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Cash flow (Transactions)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center text-gray-500 py-8">
                    <Calendar className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">May 2024</p>
                    <div className="flex justify-between mt-4 text-xs">
                      <span>Income</span>
                      <span>Expenses</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <Button className="flex-1 bg-green-500 hover:bg-green-600">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Income
                </Button>
                <Button variant="destructive" className="flex-1">
                  <Minus className="w-4 h-4 mr-2" />
                  Add Expense
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
