import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import CustomNavbar from "./components/Navbar"; 
import Dashboard from "./pages/Dashboard ";
import Expense from "./pages/Expense";
import Overview from "./pages/Overview";
import Transactions from "./pages/Transactions";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";
import Pricing from "./pages/Pricing";



const App = () => {
  return (
    <Router>
      <CustomNavbar />
      <div className="pt-5">
        {" "}
        {/* To avoid navbar overlap */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/expense" element={<Expense />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/logIn" element={<LoginPage />} />
          <Route path="/register" element={<SignUpPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <Footer/>
    </Router>
  );
};

export default App;
