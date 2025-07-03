import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  AreaChart,
  Area,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  CreditCard,
  PieChart as PieChartIcon,
  BarChart3,
  Calendar,
  Bell,
  Settings,
  User,
  Plus,
  Minus,
  Eye,
  EyeOff,
  Shield,
  Smartphone,
  Zap,
  Target,
  CheckCircle,
  ArrowRight,
  Star,
  Users,
  Award,
  Globe,
  Lock,
  Download,
  Play,
} from "lucide-react";

const FinanceTrackerHomepage = () => {
  const [showBalance, setShowBalance] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const [activeTab, setActiveTab] = useState(0);

  // Enhanced sample data with more realistic values
  const expenseData = [
    { month: "Jan", income: 85000, expense: 62000, savings: 23000 },
    { month: "Feb", income: 87000, expense: 65000, savings: 22000 },
    { month: "Mar", income: 82000, expense: 58000, savings: 24000 },
    { month: "Apr", income: 90000, expense: 68000, savings: 22000 },
    { month: "May", income: 88000, expense: 64000, savings: 24000 },
    { month: "Jun", income: 95000, expense: 70000, savings: 25000 },
    { month: "Jul", income: 92000, expense: 67000, savings: 25000 },
  ];

  const categoryData = [
    { name: "Housing", value: 25000, color: "#3B82F6", icon: "🏠" },
    { name: "Food & Dining", value: 15000, color: "#EF4444", icon: "🍽️" },
    { name: "Transportation", value: 12000, color: "#10B981", icon: "🚗" },
    { name: "Entertainment", value: 8000, color: "#8B5CF6", icon: "🎬" },
    { name: "Shopping", value: 10000, color: "#F59E0B", icon: "🛍️" },
    { name: "Healthcare", value: 7000, color: "#06B6D4", icon: "⚕️" },
    { name: "Others", value: 5000, color: "#6B7280", icon: "📊" },
  ];

  const recentTransactions = [
    {
      id: 1,
      desc: "Salary - Tech Corp",
      amount: 92000,
      category: "Income",
      date: "2024-07-01",
      type: "income",
      icon: "💰",
    },
    {
      id: 2,
      desc: "Rent Payment",
      amount: -25000,
      category: "Housing",
      date: "2024-07-01",
      type: "expense",
      icon: "🏠",
    },
    {
      id: 3,
      desc: "Grocery Store",
      amount: -3500,
      category: "Food",
      date: "2024-06-30",
      type: "expense",
      icon: "🛒",
    },
    {
      id: 4,
      desc: "Uber Rides",
      amount: -850,
      category: "Transport",
      date: "2024-06-30",
      type: "expense",
      icon: "🚗",
    },
    {
      id: 5,
      desc: "Investment Return",
      amount: 5200,
      category: "Investment",
      date: "2024-06-29",
      type: "income",
      icon: "📈",
    },
    {
      id: 6,
      desc: "Netflix Premium",
      amount: -799,
      category: "Entertainment",
      date: "2024-06-29",
      type: "expense",
      icon: "🎬",
    },
  ];

  const budgetData = [
    {
      category: "Housing",
      budget: 30000,
      spent: 25000,
      percentage: 83,
      color: "#3B82F6",
    },
    {
      category: "Food",
      budget: 18000,
      spent: 15000,
      percentage: 83,
      color: "#EF4444",
    },
    {
      category: "Transport",
      budget: 15000,
      spent: 12000,
      percentage: 80,
      color: "#10B981",
    },
    {
      category: "Entertainment",
      budget: 10000,
      spent: 8000,
      percentage: 80,
      color: "#8B5CF6",
    },
    {
      category: "Shopping",
      budget: 12000,
      spent: 10000,
      percentage: 83,
      color: "#F59E0B",
    },
  ];

  const testimonials = [
    {
      quote:
        "This app helped me save ₹5 lakhs in just 8 months! The insights are incredibly detailed.",
      author: "Priya Sharma",
      role: "Software Engineer, Bangalore",
      avatar: "👩‍💻",
      rating: 5,
    },
    {
      quote:
        "Finally, a finance app that actually makes sense. The budgeting features are game-changing.",
      author: "Rahul Gupta",
      role: "Marketing Manager, Mumbai",
      avatar: "👨‍💼",
      rating: 5,
    },
    {
      quote:
        "The best investment I made was downloading this app. My financial goals are now achievable.",
      author: "Sneha Patel",
      role: "Doctor, Delhi",
      avatar: "👩‍⚕️",
      rating: 5,
    },
  ];

  const features = [
    {
      icon: <BarChart3 className="w-8 h-8 text-blue-600" />,
      title: "Advanced Analytics",
      description:
        "AI-powered insights with predictive spending analysis and personalized recommendations.",
      benefits: [
        "Spending pattern analysis",
        "Future expense predictions",
        "Custom reports",
      ],
    },
    {
      icon: <Bell className="w-8 h-8 text-purple-600" />,
      title: "Smart Notifications",
      description:
        "Intelligent alerts that learn your habits and help you stay within budget.",
      benefits: [
        "Budget limit alerts",
        "Bill reminders",
        "Unusual spending detection",
      ],
    },
    {
      icon: <Target className="w-8 h-8 text-green-600" />,
      title: "Goal Achievement",
      description:
        "Set ambitious financial goals and track your progress with milestone celebrations.",
      benefits: ["Savings goals", "Investment targets", "Debt payoff plans"],
    },
    {
      icon: <Shield className="w-8 h-8 text-red-600" />,
      title: "Bank-Level Security",
      description:
        "Your financial data is protected with enterprise-grade encryption.",
      benefits: [
        "256-bit encryption",
        "Biometric authentication",
        "Regular security audits",
      ],
    },
    {
      icon: <Smartphone className="w-8 h-8 text-indigo-600" />,
      title: "Mobile First",
      description:
        "Seamless experience across all devices with offline sync capabilities.",
      benefits: ["iOS & Android apps", "Desktop sync", "Offline mode"],
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-600" />,
      title: "Instant Sync",
      description:
        "Real-time synchronization across all your accounts and devices.",
      benefits: [
        "Real-time updates",
        "Multi-bank support",
        "Automatic categorization",
      ],
    },
  ];

  const stats = [
    {
      number: "500K+",
      label: "Active Users",
      icon: <Users className="w-6 h-6" />,
    },
    {
      number: "₹1000Cr+",
      label: "Money Tracked",
      icon: <DollarSign className="w-6 h-6" />,
    },
    {
      number: "4.9/5",
      label: "App Rating",
      icon: <Star className="w-6 h-6" />,
    },
    { number: "99.9%", label: "Uptime", icon: <Award className="w-6 h-6" /> },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll("[data-animate]").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const AnimatedCard = ({ children, delay = 0, className = "" }) => (
    <div
      className={`transform transition-all duration-700 hover:scale-105 ${className}`}
      style={{
        animationDelay: `${delay}ms`,
        animation: "fadeInUp 0.8s ease-out forwards",
      }}
    >
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .float-animation {
          animation: float 3s ease-in-out infinite;
        }

        .gradient-text {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .glass-effect {
          backdrop-filter: blur(20px);
          background: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .chart-container {
          position: relative;
          background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
          border-radius: 16px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
      `}</style>

      {/* Enhanced Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div
            className="absolute bottom-20 right-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className=" mx-auto relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-blue-200">
              <Zap className="w-4 h-4 mr-2" />
              Trusted by 500,000+ users worldwide
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Master Your Money
              <span className="gradient-text block mt-2">
                Build True Wealth
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600  mx-auto mb-12 leading-relaxed">
              Join India's most intelligent personal finance platform. Track
              expenses, optimize budgets, and achieve your financial dreams with
              AI-powered insights.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-xl font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-300 transform hover:-translate-y-1 shadow-xl hover:shadow-2xl text-lg">
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2 inline-block group-hover:translate-x-1 transition-transform" />
              </button>

              <button className="group flex items-center border-2 border-gray-300 text-gray-700 px-10 py-4 rounded-xl font-semibold hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-300 text-lg">
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </button>
            </div>

            <div className="mt-12 flex justify-center items-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                No credit card required
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                14-day free trial
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Cancel anytime
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <AnimatedCard key={index} delay={index * 100}>
                <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 hover:shadow-lg transition-all duration-300">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-xl mb-4">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Dashboard Preview */}
      <section className="py-20 W-100 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-blue-50">
        <div className=" mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Experience Your Financial Command Center
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get real-time insights into your financial health with our
              intelligent dashboard
            </p>
          </div>

          {/* Enhanced Dashboard Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <AnimatedCard delay={0}>
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-8 rounded-2xl text-white shadow-2xl hover:shadow-3xl transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-emerald-100 text-sm font-medium">
                      Total Balance
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <p className="text-3xl font-bold">
                        {showBalance ? "₹8,45,000" : "₹••••••"}
                      </p>
                      <button
                        onClick={() => setShowBalance(!showBalance)}
                        className="text-emerald-100 hover:text-white transition-colors p-1 rounded-lg hover:bg-emerald-600"
                      >
                        {showBalance ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="float-animation">
                    <TrendingUp className="w-10 h-10 text-emerald-100" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-300 rounded-full"></div>
                  <p className="text-emerald-100 text-sm">
                    +12.5% from last month
                  </p>
                </div>
              </div>
            </AnimatedCard>

            <AnimatedCard delay={100}>
              <div className="bg-gradient-to-br from-blue-500 to-cyan-600 p-8 rounded-2xl text-white shadow-2xl hover:shadow-3xl transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-blue-100 text-sm font-medium">
                      Monthly Income
                    </p>
                    <p className="text-3xl font-bold mt-2">₹92,000</p>
                  </div>
                  <div
                    className="float-animation"
                    style={{ animationDelay: "1s" }}
                  >
                    <DollarSign className="w-10 h-10 text-blue-100" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
                  <p className="text-blue-100 text-sm">+8.2% from last month</p>
                </div>
              </div>
            </AnimatedCard>

            <AnimatedCard delay={200}>
              <div className="bg-gradient-to-br from-red-500 to-pink-600 p-8 rounded-2xl text-white shadow-2xl hover:shadow-3xl transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-red-100 text-sm font-medium">
                      Monthly Expenses
                    </p>
                    <p className="text-3xl font-bold mt-2">₹67,000</p>
                  </div>
                  <div
                    className="float-animation"
                    style={{ animationDelay: "2s" }}
                  >
                    <CreditCard className="w-10 h-10 text-red-100" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-300 rounded-full"></div>
                  <p className="text-red-100 text-sm">-5.3% from last month</p>
                </div>
              </div>
            </AnimatedCard>

            <AnimatedCard delay={300}>
              <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-8 rounded-2xl text-white shadow-2xl hover:shadow-3xl transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-purple-100 text-sm font-medium">
                      Monthly Savings
                    </p>
                    <p className="text-3xl font-bold mt-2">₹25,000</p>
                  </div>
                  <div
                    className="float-animation"
                    style={{ animationDelay: "3s" }}
                  >
                    <Target className="w-10 h-10 text-purple-100" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-300 rounded-full"></div>
                  <p className="text-purple-100 text-sm">
                    +18.7% from last month
                  </p>
                </div>
              </div>
            </AnimatedCard>
          </div>

          {/* Enhanced Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <AnimatedCard delay={400}>
              <div className="chart-container p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-blue-600" />
                    </div>
                    Income vs Expenses
                  </h3>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={expenseData}>
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
                          stopColor="#10b981"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#10b981"
                          stopOpacity={0}
                        />
                      </linearGradient>
                      <linearGradient
                        id="expenseGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#ef4444"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#ef4444"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                    <YAxis stroke="#6b7280" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.95)",
                        border: "none",
                        borderRadius: "12px",
                        boxShadow:
                          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                        backdropFilter: "blur(20px)",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="income"
                      stroke="#10b981"
                      strokeWidth={3}
                      fill="url(#incomeGradient)"
                    />
                    <Area
                      type="monotone"
                      dataKey="expense"
                      stroke="#ef4444"
                      strokeWidth={3}
                      fill="url(#expenseGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </AnimatedCard>

            <AnimatedCard delay={500}>
              <div className="chart-container p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                      <PieChartIcon className="w-5 h-5 text-purple-600" />
                    </div>
                    Expense Breakdown
                  </h3>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={110}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [
                        `₹${value.toLocaleString()}`,
                        "Amount",
                      ]}
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.95)",
                        border: "none",
                        borderRadius: "12px",
                        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                        backdropFilter: "blur(20px)",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-2 gap-3 mt-6">
                  {categoryData.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span className="text-sm">{item.icon}</span>
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedCard>
          </div>

          {/* Enhanced Transactions and Budget */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <AnimatedCard delay={600}>
              <div className="chart-container p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">
                    Recent Transactions
                  </h3>
                  <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                    View All
                  </button>
                </div>
                <div className="space-y-4">
                  {recentTransactions.map((transaction, index) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-2xl">{transaction.icon}</div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">
                            {transaction.desc}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {transaction.category} • {transaction.date}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className={`font-bold text-sm ${
                            transaction.type === "income"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {transaction.type === "income" ? "+" : ""}₹
                          {Math.abs(transaction.amount).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedCard>

            <AnimatedCard delay={700}>
              <div className="chart-container p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">
                    Budget Overview
                  </h3>
                  <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                    Manage Budget
                  </button>
                </div>
                <div className="space-y-6">
                  {budgetData.map((item, index) => (
                    <div key={index} className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-gray-700">
                          {item.category}
                        </span>
                        <span className="text-sm text-gray-500">
                          ₹{item.spent.toLocaleString()} / ₹
                          {item.budget.toLocaleString()}
                        </span>
                      </div>
                      <div className="relative">
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className={`h-3 rounded-full transition-all duration-1000 ${
                              item.percentage > 90
                                ? "bg-gradient-to-r from-red-500 to-red-600"
                                : item.percentage > 75
                                ? "bg-gradient-to-r from-yellow-500 to-orange-500"
                                : "bg-gradient-to-r from-green-500 to-emerald-500"
                            }`}
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <p className="text-xs text-gray-500">
                            {item.percentage}% used
                          </p>
                          <p
                            className={`text-xs font-medium ${
                              item.percentage > 90
                                ? "text-red-600"
                                : item.percentage > 75
                                ? "text-yellow-600"
                                : "text-green-600"
                            }`}
                          >
                            ₹{(item.budget - item.spent).toLocaleString()} left
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className=" mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built with cutting-edge technology and designed for the modern
              Indian user
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <AnimatedCard key={index} delay={index * 100}>
                <div className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{feature.description}</p>
                  </div>
                  <div className="space-y-2">
                    {feature.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className=" mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Loved by Financial Experts
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands who've transformed their financial lives
            </p>
          </div>

          <div className="relative">
            <div className="glass-effect p-12 rounded-3xl border border-gray-200 shadow-2xl">
              <div className="text-center">
                <div className="text-6xl text-blue-600 mb-6">"</div>
                <p className="text-2xl text-gray-800 mb-8 italic font-medium leading-relaxed">
                  {testimonials[currentSlide].quote}
                </p>
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="text-4xl">
                    {testimonials[currentSlide].avatar}
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-gray-900 text-lg">
                      {testimonials[currentSlide].author}
                    </p>
                    <p className="text-gray-600">
                      {testimonials[currentSlide].role}
                    </p>
                  </div>
                </div>
                <div className="flex justify-center gap-1">
                  {[...Array(testimonials[currentSlide].rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-8 space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "bg-blue-600 scale-125"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-white/5 rounded-full blur-2xl"></div>
        </div>

        <div className="mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Financial Future?
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto">
            Join over 500,000 Indians who are already building wealth smarter.
            Start your journey to financial freedom today.
          </p>

          <div className="flex justify-center items-center gap-12 text-sm text-blue-100">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Bank-level security
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Available worldwide
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4" />
              Data encrypted
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FinanceTrackerHomepage;
