// AppRouter.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import QuestionBankPage from "../pages/Admin/QuestionBankPage";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import ExerciseBankPage from "../pages/Admin/ExerciseBankPage";
import CreateExercisePage from "../pages/Admin/CreateExercisePage";
import EditExercisePage from "../pages/Admin/EditExercisePage";
import ExamBankPage from "../pages/Admin/ExamBankPage";
import CreateExamPage from "../pages/Admin/CreateExamPage";
import EditExamPage from "../pages/Admin/EditExamPage";


const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
      <Route path="/question-bank" element={<QuestionBankPage />} />
      <Route path="/exercise-bank" element={<ExerciseBankPage />} />
      <Route path="/exercise-bank/create" element={<CreateExercisePage />} />
      <Route path="/edit-exercise/:id" element={<EditExercisePage />} />
      <Route path="/exam-bank" element={<ExamBankPage />} />
      <Route path="/exam-bank/create" element={<CreateExamPage />} />
      <Route path="/edit-exam/:id" element={<EditExamPage />} />

      {/* Add more routes as needed */}
    </Routes>
  );
};

export default AppRouter;
