import React, { useState, useEffect } from "react";
import QuestionTable from "../../../components/Admin/QuestionTable";
import QuestionFormModal from "../../../components/Admin/QuestionFormModal";
import Header from "../../../components/Admin/Header";
import Footer from "../../../components/Admin/Footer"; 
import { getQuestions, addQuestion, updateQuestion, deleteQuestion } from "../../../api/questionApi";  

const QuestionBankPage = () => {
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editQuestion, setEditQuestion] = useState(null);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedType, setSelectedType] = useState("");
  // Đã xoá filter điểm số
  const [showFilters, setShowFilters] = useState(false);

  // Topics and types from backend
  const topics = [
    { value: "GRAMMAR", label: "Ngữ pháp" },
    { value: "VOCABULARY", label: "Từ vựng" },
    { value: "LISTENING", label: "Nghe" },
    { value: "READING", label: "Đọc" },
    { value: "SPEAKING", label: "Nói" },
    { value: "WRITING", label: "Viết" }
  ];

  const questionTypes = [
    { value: "MULTIPLE_CHOICE", label: "Trắc nghiệm" },
    { value: "TRUE_FALSE", label: "Đúng/Sai" },
    { value: "FILL_IN_THE_BLANK", label: "Điền vào chỗ trống" },
    { value: "ESSAY", label: "Tự luận" }
  ];

  // Đã xoá biến pointOptions

  // Lấy danh sách câu hỏi từ API
  useEffect(() => {
    fetchQuestions();
  }, []);

  // Filter questions when search term or filters change
  useEffect(() => {
    filterQuestions();
  }, [questions, searchTerm, selectedTopic, selectedType]);

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

  const filterQuestions = () => {
    let filtered = [...questions];

    // Search by content
    if (searchTerm) {
      filtered = filtered.filter(q => 
        q.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.explanation?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by topic
    if (selectedTopic) {
      filtered = filtered.filter(q => q.topic === selectedTopic);
    }

    // Filter by type
    if (selectedType) {
      filtered = filtered.filter(q => q.questionType === selectedType);
    }

    // Đã xoá filter theo điểm số

    setFilteredQuestions(filtered);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedTopic("");
    setSelectedType("");
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
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Ngân hàng câu hỏi</h1>
              <p className="text-gray-600 mt-1">
                Quản lý {filteredQuestions.length} / {questions.length} câu hỏi
              </p>
            </div>
            <button
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium"
              onClick={() => {
                setShowModal(true);
                setEditQuestion(null);
              }}
            >
              <span className="text-xl">+</span>
              Thêm câu hỏi
            </button>
          </div>
        </div>
        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm câu hỏi theo nội dung..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Bộ lọc
            </button>
          </div>
          {/* Filter Options */}
          {showFilters && (
            <div className="border-t pt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Topic Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Chủ đề</label>
                  <select
                    value={selectedTopic}
                    onChange={(e) => setSelectedTopic(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Tất cả chủ đề</option>
                    {topics.map(topic => (
                      <option key={topic.value} value={topic.value}>
                        {topic.label}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Type Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Loại câu hỏi</label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Tất cả loại</option>
                    {questionTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Clear Filters */}
                <div className="flex items-end">
                  <button
                    onClick={clearFilters}
                    className="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Xóa bộ lọc
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <svg className="h-5 w-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="text-red-800">{error}</span>
            </div>
          </div>
        )}
        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600">Đang tải...</span>
            </div>
          ) : filteredQuestions.length === 0 ? (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">
                {questions.length === 0 ? "Chưa có câu hỏi nào" : "Không tìm thấy câu hỏi"}
              </h3>
              <p className="mt-1 text-gray-500">
                {questions.length === 0 
                  ? "Hãy thêm câu hỏi đầu tiên vào ngân hàng."
                  : "Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc."
                }
              </p>
            </div>
          ) : (
            <QuestionTable
              questions={filteredQuestions}
              onEdit={handleEditQuestion}
              onDelete={handleDeleteQuestion}
            />
          )}
        </div>
      </div>
      {/* Modal */}
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
