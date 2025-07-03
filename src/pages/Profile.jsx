import React, { useState, useEffect } from "react";
import {
  Edit,
  LogOut,
  User,
  Mail,
  Phone,
  Lock,
  Globe,
  Camera,
  DollarSign,
  TrendingUp,
  Target,
  Award,
  Settings,
  Bell,
  Shield,
  Eye,
  EyeOff,
  Check,
  X,
} from "lucide-react";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [profileData, setProfileData] = useState({
    name: "Bihari Kumar Rawat",
    email: "biharikumarrawat123@gmail.com",
    phone: "+91 9262645718",
    bio: "I am Mern Full stack Developer",
    website: "https://next-portfolio-woad-xi.vercel.app/",
    joinDate: "August 2024",
    location: "New Delhi India",
  });
  const [previewImage, setPreviewImage] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfhmX4jvMEl3665bP35u14wQcqSPGzpg0W2A&s"
  );
  const [stats] = useState({
    totalBalance: 45750.25,
    monthlyIncome: 8500,
    monthlyExpenses: 3250,
    savingsGoal: 50000,
    investments: 15000,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    // Simulate API call
    setTimeout(() => {
      setIsEditing(false);
      // In real app, show success toast
    }, 1000);
  };

  const handleLogout = () => {
    // Simulate logout
    console.log("Logout clicked");
  };

  const StatCard = ({ icon: Icon, label, value, change, color }) => (
    <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <div className={`p-3 rounded-xl ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">{label}</p>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
          {change && (
            <p
              className={`text-sm ${
                change.startsWith("+") ? "text-green-600" : "text-red-600"
              }`}
            >
              {change}
            </p>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-800">
                Finance Tracker
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8">
          <div className="h-48 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 relative">
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            <div className="absolute -bottom-20 left-8">
              <div className="relative group">
                <img
                  src={previewImage}
                  alt="Profile"
                  className="w-40 h-40 rounded-3xl border-6 border-white object-cover shadow-2xl"
                />
                {isEditing && (
                  <label className="absolute bottom-2 right-2 bg-white p-3 rounded-full shadow-lg cursor-pointer hover:bg-gray-100 transition-all duration-200 hover:scale-105">
                    <Camera className="w-5 h-5 text-gray-700" />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                )}
              </div>
            </div>
          </div>

          <div className="pt-24 px-8 pb-8">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start">
              <div className="mb-6 lg:mb-0">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">
                  {profileData.name}
                </h1>
                <p className="text-gray-600 mb-2">{profileData.bio}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span> {profileData.location}</span>
                  <span> Joined {profileData.joinDate}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
                  >
                    <Edit className="w-5 h-5" />
                    <span>Edit Profile</span>
                  </button>
                ) : (
                  <div className="flex gap-3">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="flex items-center justify-center space-x-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-xl transition-all duration-200"
                    >
                      <X className="w-5 h-5" />
                      <span>Cancel</span>
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="flex items-center justify-center space-x-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
                    >
                      <Check className="w-5 h-5" />
                      <span>Save</span>
                    </button>
                  </div>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center space-x-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white px-6 py-3 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={DollarSign}
            label="Total Balance"
            value={`$${stats.totalBalance.toLocaleString()}`}
            change="+12.5%"
            color="bg-gradient-to-r from-green-500 to-emerald-500"
          />
          <StatCard
            icon={TrendingUp}
            label="Monthly Income"
            value={`$${stats.monthlyIncome.toLocaleString()}`}
            change="+5.2%"
            color="bg-gradient-to-r from-blue-500 to-indigo-500"
          />
          <StatCard
            icon={Target}
            label="Savings Goal"
            value={`$${stats.savingsGoal.toLocaleString()}`}
            change="91% Complete"
            color="bg-gradient-to-r from-purple-500 to-pink-500"
          />
          <StatCard
            icon={Award}
            label="Investments"
            value={`$${stats.investments.toLocaleString()}`}
            change="+18.7%"
            color="bg-gradient-to-r from-orange-500 to-red-500"
          />
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-8 py-4">
              {[
                { id: "profile", label: "Profile Information", icon: User },
                { id: "security", label: "Security Settings", icon: Shield },
                { id: "preferences", label: "Preferences", icon: Settings },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    activeTab === tab.id
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-8">
            {activeTab === "profile" && (
              <div className="space-y-8">
                {isEditing ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="flex items-center text-gray-700 font-medium">
                          <User className="w-5 h-5 mr-2 text-blue-600" />
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={profileData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="flex items-center text-gray-700 font-medium">
                          <Mail className="w-5 h-5 mr-2 text-blue-600" />
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={profileData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="flex items-center text-gray-700 font-medium">
                          <Phone className="w-5 h-5 mr-2 text-blue-600" />
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={profileData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="flex items-center text-gray-700 font-medium">
                          <Globe className="w-5 h-5 mr-2 text-blue-600" />
                          Website
                        </label>
                        <input
                          type="url"
                          name="website"
                          value={profileData.website}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="flex items-center text-gray-700 font-medium">
                          📍 Location
                        </label>
                        <input
                          type="text"
                          name="location"
                          value={profileData.location}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center text-gray-700 font-medium">
                        <User className="w-5 h-5 mr-2 text-blue-600" />
                        Bio
                      </label>
                      <textarea
                        name="bio"
                        value={profileData.bio}
                        onChange={handleInputChange}
                        rows="4"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Tell us about yourself..."
                      />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      {
                        icon: Mail,
                        label: "Email",
                        value: profileData.email,
                        color: "bg-blue-500",
                      },
                      {
                        icon: Phone,
                        label: "Phone",
                        value: profileData.phone,
                        color: "bg-green-500",
                      },
                      {
                        icon: Globe,
                        label: "Website",
                        value: profileData.website,
                        color: "bg-purple-500",
                        isLink: true,
                      },
                      {
                        icon: User,
                        label: "Location",
                        value: profileData.location,
                        color: "bg-orange-500",
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-4 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300"
                      >
                        <div
                          className={`p-4 ${item.color} rounded-xl shadow-lg`}
                        >
                          <item.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                            {item.label}
                          </p>
                          {item.isLink ? (
                            <a
                              href={item.value}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-lg font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                            >
                              {item.value}
                            </a>
                          ) : (
                            <p className="text-lg font-semibold text-gray-800">
                              {item.value}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {!isEditing && (
                  <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                      <User className="w-6 h-6 mr-2 text-blue-600" />
                      About Me
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {profileData.bio}
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "security" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">
                        Password
                      </h3>
                      <Lock className="w-6 h-6 text-green-600" />
                    </div>
                    <p className="text-gray-600 mb-4">
                      Last changed 2 months ago
                    </p>
                    <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105">
                      Change Password
                    </button>
                  </div>

                  <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">
                        Two-Factor Authentication
                      </h3>
                      <Shield className="w-6 h-6 text-blue-600" />
                    </div>
                    <p className="text-gray-600 mb-4">
                      Secure your account with 2FA
                    </p>
                    <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105">
                      Enable 2FA
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "preferences" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Notifications
                    </h3>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="mr-3"
                          defaultChecked
                        />
                        <span>Email notifications</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="mr-3"
                          defaultChecked
                        />
                        <span>Push notifications</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-3" />
                        <span>SMS notifications</span>
                      </label>
                    </div>
                  </div>

                  <div className="p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl border border-orange-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Privacy
                    </h3>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="mr-3"
                          defaultChecked
                        />
                        <span>Profile visibility</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-3" />
                        <span>Data sharing</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="mr-3"
                          defaultChecked
                        />
                        <span>Activity tracking</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
