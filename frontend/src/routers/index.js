// AppRouter.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import QuestionBankPage from "../pages/Admin/QuestionBankPage";
import HomePage from "../pages/User/HomePage";
import ExamList from "../pages/User/ExamList";
const AppRouter = () => {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/exams" element={<ExamList />} />

      {/* <Route path="/" element={<AdminDashboard />} />
      <Route path="/question-bank" element={<QuestionBankPage />} /> */}
    </Routes>
  );
};

export default AppRouter;
