"use client";

import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "http://localhost:4000/api/pricing-plans";

export default function PricingPage() {
  const [plans, setPlans] = useState([]);
  const [isAdmin, setIsAdmin] = useState(true); // Toggle this for admin view
  const [showModal, setShowModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    duration: "month",
    description: "",
    features: "",
    isPopular: false,
    buttonText: "Get Started",
  });

  const fetchPlans = async () => {
    try {
      // Mock data for demonstration
      const mockPlans = [
        {
          _id: "1",
          name: "Basic",
          price: 0,
          duration: "month",
          description:
            "Perfect for getting started with personal finance tracking",
          features: [
            "Track up to 3 accounts",
            "Basic expense categorization",
            "Monthly reports",
            "Mobile app access",
          ],
          isPopular: false,
          buttonText: "Start Free",
        },
        {
          _id: "2",
          name: "Pro",
          price: 9.99,
          duration: "month",
          description: "Advanced features for serious finance management",
          features: [
            "Unlimited accounts",
            "Advanced categorization",
            "Custom reports & analytics",
            "Goal tracking",
            "Bill reminders",
            "Export data",
          ],
          isPopular: true,
          buttonText: "Start Pro Trial",
        },
        {
          _id: "3",
          name: "Premium",
          price: 19.99,
          duration: "month",
          description: "Complete financial management solution",
          features: [
            "Everything in Pro",
            "Investment tracking",
            "Tax optimization",
            "Financial advisor chat",
            "Priority support",
            "API access",
          ],
          isPopular: false,
          buttonText: "Go Premium",
        },
      ];
      setPlans(mockPlans);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch pricing plans");
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = e.target.checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const price = Number(formData.price);
      if (isNaN(price) || price < 0) {
        toast.error("Please enter a valid price");
        setSubmitting(false);
        return;
      }

      const featuresArray = formData.features
        .split("\n")
        .map((f) => f.trim())
        .filter((f) => f.length > 0);

      const planData = {
        name: formData.name.trim(),
        price,
        duration: formData.duration,
        description: formData.description.trim(),
        features: featuresArray,
        isPopular: formData.isPopular,
        buttonText: formData.buttonText.trim(),
      };

      // Mock API call
      if (editingPlan) {
        // Update existing plan
        setPlans((prev) =>
          prev.map((plan) =>
            plan._id === editingPlan._id
              ? { ...planData, _id: editingPlan._id }
              : plan
          )
        );
        toast.success("Pricing plan updated successfully!");
      } else {
        // Add new plan
        const newPlan = { ...planData, _id: Date.now().toString() };
        setPlans((prev) => [...prev, newPlan]);
        toast.success("Pricing plan created successfully!");
      }

      resetForm();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save pricing plan");
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      duration: "month",
      description: "",
      features: "",
      isPopular: false,
      buttonText: "Get Started",
    });
    setEditingPlan(null);
    setShowModal(false);
  };

  const openModalForAdd = () => {
    resetForm();
    setShowModal(true);
  };

  const openModalForEdit = (plan) => {
    setEditingPlan(plan);
    setFormData({
      name: plan.name,
      price: plan.price.toString(),
      duration: plan.duration,
      description: plan.description,
      features: plan.features.join("\n"),
      isPopular: plan.isPopular,
      buttonText: plan.buttonText,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this pricing plan?"))
      return;

    try {
      setPlans((prev) => prev.filter((plan) => plan._id !== id));
      toast.success("Pricing plan deleted successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete pricing plan");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Finance Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Take control of your finances with our comprehensive tracking and
            management tools
          </p>
        </div>

        {/* Admin Controls */}
        {isAdmin && (
          <div className="mb-8 flex justify-between items-center flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                Admin Mode
              </span>
              <button
                onClick={() => setIsAdmin(!isAdmin)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Toggle Admin View
              </button>
            </div>
            <button
              onClick={openModalForAdd}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add New Plan
            </button>
          </div>
        )}

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan._id}
              className={`relative bg-white rounded-lg shadow-md overflow-hidden ${
                plan.isPopular
                  ? "ring-2 ring-blue-500 shadow-lg transform scale-105"
                  : ""
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-3 mt-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>
              )}

              <div className="p-6  mt-2 text-center">
                <h3 className="text-2xl mt-2 font-bold text-gray-900 mb-4">
                  {plan.name}
                </h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">
                    ${plan.price}
                  </span>
                  <span className="text-gray-600">/{plan.duration}</span>
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
              </div>

              <div className="px-6 pb-6">
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <svg
                        className="w-5 h-5 text-green-500 mr-3 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="space-y-2">
                  <button
                    className={`w-full py-3 px-4 rounded-md font-medium transition-colors ${
                      plan.isPopular
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {plan.buttonText}
                  </button>

                  {isAdmin && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openModalForEdit(plan)}
                        className="flex-1 py-2 px-3 border border-blue-500 text-blue-500 rounded-md text-sm font-medium hover:bg-blue-50 flex items-center justify-center gap-1"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(plan._id)}
                        className="flex-1 py-2 px-3 border border-red-500 text-red-500 rounded-md text-sm font-medium hover:bg-red-50 flex items-center justify-center gap-1"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {plans.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">
              No pricing plans available.
            </p>
            {isAdmin && (
              <button
                onClick={openModalForAdd}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium flex items-center gap-2 mx-auto"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add Your First Plan
              </button>
            )}
          </div>
        )}

        {/* Features Section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Why Choose Our Finance Tracker?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy to Use</h3>
              <p className="text-gray-600">
                Intuitive interface designed for users of all experience levels
              </p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
              <p className="text-gray-600">
                Bank-level security to keep your financial data safe and private
              </p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Insights</h3>
              <p className="text-gray-600">
                AI-powered insights to help you make better financial decisions
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">
                  {editingPlan ? "Edit Pricing Plan" : "Add New Pricing Plan"}
                </h3>
                <button
                  onClick={resetForm}
                  className="text-gray-400 hover:text-gray-600"
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
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <p className="text-gray-600 mb-6">
                {editingPlan
                  ? "Update the pricing plan details"
                  : "Create a new pricing plan for your finance tracker"}
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Plan Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g., Basic, Pro, Premium"
                      required
                      disabled={submitting}
                      className="w-full px-3 py- mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="price"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Price ($)
                    </label>
                    <input
                      id="price"
                      name="price"
                      type="number"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="9.99"
                      min="0"
                      step="0.01"
                      required
                      disabled={submitting}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="duration"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Duration
                    </label>
                    <select
                      id="duration"
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      disabled={submitting}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="month">Monthly</option>
                      <option value="year">Yearly</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="buttonText"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Button Text
                    </label>
                    <input
                      id="buttonText"
                      name="buttonText"
                      type="text"
                      value={formData.buttonText}
                      onChange={handleChange}
                      placeholder="Get Started"
                      required
                      disabled={submitting}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Brief description of the plan"
                    rows={3}
                    disabled={submitting}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="features"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Features (one per line)
                  </label>
                  <textarea
                    id="features"
                    name="features"
                    value={formData.features}
                    onChange={handleChange}
                    placeholder="Track unlimited accounts&#10;Advanced reporting&#10;Mobile app access"
                    rows={5}
                    disabled={submitting}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isPopular"
                    name="isPopular"
                    checked={formData.isPopular}
                    onChange={handleChange}
                    disabled={submitting}
                    className="rounded"
                  />
                  <label
                    htmlFor="isPopular"
                    className="text-sm font-medium text-gray-700"
                  >
                    Mark as popular plan
                  </label>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    disabled={submitting}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                  >
                    {submitting
                      ? "Saving..."
                      : editingPlan
                      ? "Update Plan"
                      : "Create Plan"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
    </div>
  );
}
