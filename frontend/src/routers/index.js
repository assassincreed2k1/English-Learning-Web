// AppRouter.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import HomePage from "../pages/User/HomePage";
import ExamList from "../pages/User/ExamList";

// Admin pages (import từ đúng folder)
import AdminDashboard from "../pages/Admin/Dashboard/AdminDashboard";
import QuestionBankPage from "../pages/Admin/Questions/QuestionBankPage";
import ExerciseBankPage from "../pages/Admin/Exercises/ExerciseBankPage";
import CreateExercisePage from "../pages/Admin/Exercises/CreateExercisePage";
import EditExercisePage from "../pages/Admin/Exercises/EditExercisePage";
import ExamBankPage from "../pages/Admin/Exams/ExamBankPage";
import CreateExamPage from "../pages/Admin/Exams/CreateExamPage";
import EditExamPage from "../pages/Admin/Exams/EditExamPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/exams" element={<ExamList />} />

      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/question-bank" element={<QuestionBankPage />} />
      <Route path="/admin/exercise-bank" element={<ExerciseBankPage />} />
      <Route path="/admin/exercise-bank/create" element={<CreateExercisePage />} />
      <Route path="/admin/edit-exercise/:id" element={<EditExercisePage />} />
      <Route path="/admin/exam-bank" element={<ExamBankPage />} />
      <Route path="/admin/exam-bank/create" element={<CreateExamPage />} />
      <Route path="/admin/edit-exam/:id" element={<EditExamPage />} />
    </Routes>
  );
};

export default AppRouter;
