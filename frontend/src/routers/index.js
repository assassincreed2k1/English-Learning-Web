// AppRouter.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import QuestionBankPage from "../pages/Admin/QuestionBankPage";
import AdminDashboard from "../pages/Admin/AdminDashboard";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
      <Route path="/question-bank" element={<QuestionBankPage />} />
    </Routes>
  );
};

export default AppRouter;
