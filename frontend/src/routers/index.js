// AppRouter.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import QuestionBankPage from "../pages/Admin/QuestionBankPage";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import ExerciseBankPage from "../pages/Admin/ExerciseBankPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
      <Route path="/question-bank" element={<QuestionBankPage />} />
      <Route path="/exercise-bank" element={<ExerciseBankPage />} />
      {/* Add more routes as needed */}
    </Routes>
  );
};

export default AppRouter;
