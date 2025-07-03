import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  TrendingUp,
  Shield,
  Users,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Expense Tracker", path: "/expense" },
    { name: "Products", path: "/products" },
    { name: "Overview", path: "/overview" },
  ];

  const features = [
    { name: "Budget Planning", icon: CreditCard },
    { name: "Investment Tracking", icon: TrendingUp },
    { name: "Secure Banking", icon: Shield },
    { name: "Financial Advice", icon: Users },
  ];

  const legalLinks = [
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms of Service", path: "/terms" },
    { name: "Cookie Policy", path: "/cookies" },
    { name: "Disclaimer", path: "/disclaimer" },
  ];

  const socialLinks = [
    { name: "Facebook", icon: Facebook, url: "https://facebook.com" },
    { name: "Twitter", icon: Twitter, url: "https://twitter.com" },
    { name: "Instagram", icon: Instagram, url: "https://instagram.com" },
    { name: "LinkedIn", icon: Linkedin, url: "https://linkedin.com" },
  ];

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    alert("Thank you for subscribing!");
    e.target.reset();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white">
      {/* Top Footer Section */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <Link
              to="/"
              className="text-4xl font-extrabold text-white tracking-tight hover:text-blue-300 transition"
            >
              Finance<span className="text-blue-400">+</span>
            </Link>
            <p className="text-gray-300 text-lg leading-relaxed">
              Your trusted partner in financial management. Track expenses, plan
              budgets, and achieve your financial goals with ease.
            </p>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center gap-2 hover:text-white transition">
                <Mail className="text-blue-400 w-5 h-5" />
                support@financeplus.com
              </div>
              <div className="flex items-center gap-2 hover:text-white transition">
                <Phone className="text-blue-400 w-5 h-5" />
                +1 (555) 123-4567
              </div>
              <div className="flex items-center gap-2 hover:text-white transition">
                <MapPin className="text-blue-400 w-5 h-5" />
                123 Finance Street, NY 10001
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold border-b-2 border-blue-400 pb-2 inline-block">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-blue-400 transition text-lg hover:translate-x-2 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Features */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold border-b-2 border-blue-400 pb-2 inline-block">
              Features
            </h3>
            <ul className="space-y-4">
              {features.map(({ name, icon: Icon }) => (
                <li
                  key={name}
                  className="flex items-center gap-3 text-gray-300 hover:text-white transition group"
                >
                  <Icon className="text-blue-400 w-5 h-5 group-hover:scale-110 transition" />
                  <span className="text-lg">{name}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold border-b-2 border-blue-400 pb-2 inline-block">
              Stay Connected
            </h3>
            <p className="text-gray-300 text-lg">
              Subscribe to our newsletter for financial tips and updates.
            </p>
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col sm:flex-row gap-3"
            >
              <input
                type="email"
                name="email"
                required
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 transition"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:from-blue-700 hover:to-blue-800 transition font-semibold shadow hover:shadow-lg transform hover:scale-105"
              >
                Subscribe
              </button>
            </form>
            <div>
              <h4 className="text-xl font-semibold mb-2">Follow Us</h4>
              <div className="flex space-x-4">
                {socialLinks.map(({ name, icon: Icon, url }) => (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:bg-blue-600 transition transform hover:scale-110 hover:rotate-6"
                    aria-label={name}
                  >
                    <Icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 bg-gray-900/50">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <p className="text-gray-400 text-center lg:text-left text-lg">
              © {currentYear} Finance+. All rights reserved. Built with ❤️ for
              better financial management.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-end gap-4">
              {legalLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-gray-400 hover:text-blue-400 transition text-lg"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-8 text-gray-400">
              <div className="flex items-center gap-2">
                <Shield className="text-green-400 w-5 h-5" />
                <span>Bank-level Security</span>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="text-blue-400 w-5 h-5" />
                <span>PCI Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="text-purple-400 w-5 h-5" />
                <span>Trusted by 10,000+ Users</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition flex items-center justify-center z-40"
        aria-label="Scroll to top"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>
    </footer>
  );
};

export default Footer;
