// AppRouter.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import HomePage from "../pages/User/HomePage";
import ExamList from "../pages/User/ExamList";

// Admin pages (import từ đúng folder)
import AdminDashboard from "../pages/Admin/Dashboard/AdminDashboard";
import VocabularyLessonList from "../pages/User/VocabularyLesson/VocabularyLessonList";
import VocabularyLessonDetail from "../pages/User/VocabularyLesson/VocabularyLessonDetail";
import AdminVocabularyLessonList from "../pages/Admin/VocabularyLesson/AdminVocabularyLessonList";
import AdminVocabularyLessonForm from "../pages/Admin/VocabularyLesson/AdminVocabularyLessonForm";
import AdminVocabularyLessonDetail from "../pages/Admin/VocabularyLesson/AdminVocabularyLessonDetail";
import QuestionBankPage from "../pages/Admin/Questions/QuestionBankPage";
import QuestionDetailPage from "../pages/Admin/Questions/QuestionDetailPage";
import ExerciseBankPage from "../pages/Admin/Exercises/ExerciseBankPage";
import CreateExercisePage from "../pages/Admin/Exercises/CreateExercisePage";
import AssignmentDetailPage from "../pages/Admin/Exercises/AssignmentDetailPage";
import ExamBankPage from "../pages/Admin/Exams/ExamBankPage";
import CreateExamPage from "../pages/Admin/Exams/CreateExamPage";

import EditExamPage from "../pages/Admin/Exams/EditExamPage";
import ExamDetails from "../pages/User/ExamDetails";
import SubmissonList from "../pages/User/SubmissonList";
import SubmissionDetail from "../pages/User/SubmissionDetail";
import ExamDetailPage from "../pages/User/ExamDetailPage";
import GrammarLessonList from "../pages/User/Grammar/GrammarLessonList";
import GrammarLessonDetail from "../pages/User/Grammar/GrammarLessonDetail";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/exams" element={<ExamList />} />

      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/question-bank" element={<QuestionBankPage />} />
      <Route path="/admin/questions/:id" element={<QuestionDetailPage />} />
      <Route path="/admin/exercise-bank" element={<ExerciseBankPage />} />
      <Route path="/admin/exercises/create" element={<CreateExercisePage />} />
      <Route path="/admin/assignments/:id" element={<AssignmentDetailPage />} />
      <Route path="/admin/exam-bank" element={<ExamBankPage />} />
      <Route path="/admin/exam-bank/create" element={<CreateExamPage />} />
      <Route path="/admin/exam-details/:id" element={<ExamDetailPage />} />
      <Route path="/admin/edit-exam/:id" element={<EditExamPage />} />
      {/* User VocabularyLesson */}
      <Route path="/vocabulary-lessons" element={<VocabularyLessonList />} />
      <Route
        path="/vocabulary-lessons/:id"
        element={<VocabularyLessonDetail />}
      />
       <Route path="/grammar-lessons" element={<GrammarLessonList />} />
      <Route
        path="/grammar-lessons/:id"
        element={<GrammarLessonDetail />}
      />
      <Route path="/exam/:examId" element={<ExamDetails />} />
      <Route path="/exam/:id/detail" element={<ExamDetailPage />} />

      <Route path="/exam/:examId/history" element={<SubmissonList />} />
      <Route
        path="/submission/:submissionId/detail"
        element={<SubmissionDetail />}
      />

      {/* Admin VocabularyLesson */}
      <Route
        path="/admin/vocabulary-lessons"
        element={<AdminVocabularyLessonList />}
      />
      <Route
        path="/admin/vocabulary-lessons/create"
        element={<AdminVocabularyLessonForm />}
      />
      <Route
        path="/admin/vocabulary-lessons/edit/:id"
        element={<AdminVocabularyLessonForm />}
      />
      <Route
        path="/admin/vocabulary-lessons/:id"
        element={<AdminVocabularyLessonDetail />}
      />
    </Routes>
  );
};

export default AppRouter;
