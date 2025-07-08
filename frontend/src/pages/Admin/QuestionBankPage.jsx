import React, { useState, useEffect } from "react";
import QuestionTable from "../../components/Admin/QuestionTable";
import QuestionFormModal from "../../components/Admin/QuestionFormModal";
import Header from "../../components/Admin/Header";
import Footer from "../../components/Admin/Footer"; 
import { getQuestions, addQuestion, updateQuestion, deleteQuestion } from "../../api/questionApi";  

const QuestionBankPage = () => {
  const [questions, setQuestions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editQuestion, setEditQuestion] = useState(null);

  // Lấy danh sách câu hỏi từ API
  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getQuestions();
      setQuestions(data);
    } catch (err) {
      setError("Không thể tải danh sách câu hỏi");
    }
    setLoading(false);
  };

  // Thêm câu hỏi mới
  const handleAddQuestion = async (question) => {
    try {
      await addQuestion(question);
      fetchQuestions();
      setShowModal(false);
    } catch (err) {
      setError("Thêm câu hỏi thất bại");
    }
  };

  // Sửa câu hỏi
  const handleEditQuestion = (question) => {
    setEditQuestion(question);
    setShowModal(true);
  };

  const handleUpdateQuestion = async (question) => {
    try {
      await updateQuestion(question.id, question);
      fetchQuestions();
      setShowModal(false);
      setEditQuestion(null);
    } catch (err) {
      setError("Cập nhật câu hỏi thất bại");
    }
  };

  // Xoá câu hỏi
  const handleDeleteQuestion = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xoá?")) return;
    try {
      await deleteQuestion(id);
      fetchQuestions();
    } catch (err) {
      setError("Xoá câu hỏi thất bại");
    }
  };

  return (
    <div className="p-8">
      <Header />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Ngân hàng câu hỏi</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          onClick={() => {
            setShowModal(true);
            setEditQuestion(null);
          }}
        >
          ➕ Thêm câu hỏi
        </button>
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}
      {loading ? (
        <div>Đang tải...</div>
      ) : (
        <QuestionTable
          questions={questions}
          onEdit={handleEditQuestion}
          onDelete={handleDeleteQuestion}
        />
      )}

      <QuestionFormModal
        show={showModal}
        onClose={() => {
          setShowModal(false);
          setEditQuestion(null);
        }}
        onSubmit={editQuestion ? handleUpdateQuestion : handleAddQuestion}
        initialData={editQuestion}
      />

      <Footer />
    </div>
  );
};

export default QuestionBankPage;