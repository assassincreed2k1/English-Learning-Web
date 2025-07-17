import React, { useEffect, useState } from "react";
import Header from "../../../components/Admin/Header";
import Footer from "../../../components/Admin/Footer";
import { getAssignments } from "../../../api/assignmentApi";
import { getQuestions } from "../../../api/questionApi";
import { useNavigate } from "react-router-dom";
import { addExam } from "../../../api/examAPI";

const examTypeOptions = [
  { value: "VOCABULARY", label: "Từ vựng" },
  { value: "GRAMMAR", label: "Ngữ pháp" },
  { value: "LISTENING", label: "Nghe hiểu" },
  { value: "READING", label: "Đọc hiểu" },
  { value: "MIXED", label: "Hỗn hợp" },
  { value: "MOCK_TEST", label: "Thi thử" },
];

const difficultyOptions = [
  { value: "BEGINNER", label: "Cơ bản" },
  { value: "INTERMEDIATE", label: "Trung bình" },
  { value: "ADVANCED", label: "Nâng cao" },
];

const CreateExamPage = () => {
  const [assignments, setAssignments] = useState([]);
  const [filteredAssignments, setFilteredAssignments] = useState([]);
  const [selectedAssignments, setSelectedAssignments] = useState([]);
  const [assignmentQuestions, setAssignmentQuestions] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Form states
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    duration: 60,
    examType: "VOCABULARY",
    difficulty: "BEGINNER",
    passingScore: 60,
    maxAttempts: 3,
    isActive: true,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const data = await getAssignments();
        setAssignments(data);
        setFilteredAssignments(data);
      } catch (error) {
        console.error("Error fetching assignments:", error);
      }
    };
    fetchAssignments();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term.trim() === "") {
      setFilteredAssignments(assignments);
    } else {
      const filtered = assignments.filter(assignment =>
        assignment.content.toLowerCase().includes(term.toLowerCase()) ||
        assignment.title?.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredAssignments(filtered);
    }
  };

  const fetchAssignmentQuestions = async (assignmentId) => {
    try {
      const questions = await getQuestions();
      const assignmentQuestions = questions.filter(q => q.assignmentId === assignmentId);
      setAssignmentQuestions(prev => ({
        ...prev,
        [assignmentId]: assignmentQuestions
      }));
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleAddAssignment = async (assignment) => {
    if (!selectedAssignments.find((item) => item.id === assignment.id)) {
      setSelectedAssignments([...selectedAssignments, assignment]);
      await fetchAssignmentQuestions(assignment.id);
    }
  };

  const handleRemoveAssignment = (id) => {
    setSelectedAssignments(selectedAssignments.filter((a) => a.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const totalQuestions = selectedAssignments.reduce((sum, assignment) => {
        const questions = assignmentQuestions[assignment.id] || [];
        return sum + questions.length;
      }, 0);

      await addExam({
        ...formData,
        totalAssignment: selectedAssignments.length,
        totalQuestions,
        examAssignments: selectedAssignments,
      });
      alert("Đã tạo đề thi mới!");
      navigate("/admin/exam-bank");
    } catch (err) {
      alert("Tạo đề thi thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-100 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Tạo đề thi mới</h1>
          
          {/* Form thông tin đề thi */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Thông tin đề thi</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Tên đề thi */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tên đề thi *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Mô tả */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mô tả
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Thời gian */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Thời gian (phút) *
                  </label>
                  <input
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    min="1"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Loại đề thi */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loại đề thi *
                  </label>
                  <select
                    name="examType"
                    value={formData.examType}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {examTypeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Độ khó */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Độ khó *
                  </label>
                  <select
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {difficultyOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Điểm đạt */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Điểm đạt *
                  </label>
                  <input
                    type="number"
                    name="passingScore"
                    value={formData.passingScore}
                    onChange={handleInputChange}
                    min="0"
                    max="100"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Số lần làm tối đa */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số lần làm tối đa *
                  </label>
                  <input
                    type="number"
                    name="maxAttempts"
                    value={formData.maxAttempts}
                    onChange={handleInputChange}
                    min="1"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Hình ảnh */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Link hình ảnh
                  </label>
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Trạng thái */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <label className="text-sm font-medium text-gray-700">
                    Kích hoạt đề thi
                  </label>
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
                >
                  {loading ? "Đang tạo..." : "Tạo đề thi"}
                </button>
              </div>
            </form>
          </div>
          {/* Phần chọn bài tập */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Bên trái: Danh sách bài tập */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Danh sách bài tập</h2>
              
              {/* Thanh tìm kiếm */}
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Tìm kiếm bài tập..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Bảng bài tập */}
              <div className="max-h-96 overflow-y-auto">
                <table className="w-full table-auto">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="p-3 text-left text-sm font-medium text-gray-700">Tiêu đề</th>
                      <th className="p-3 text-left text-sm font-medium text-gray-700">Loại</th>
                      <th className="p-3 text-left text-sm font-medium text-gray-700">Số câu</th>
                      <th className="p-3 text-left text-sm font-medium text-gray-700">Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAssignments.map((assignment) => (
                      <tr key={assignment.id} className="border-b hover:bg-gray-50">
                        <td className="p-3">
                          <div className="font-medium text-gray-900">{assignment.title}</div>
                          <div className="text-sm text-gray-600">{assignment.content}</div>
                        </td>
                        <td className="p-3">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                            {assignment.type}
                          </span>
                        </td>
                        <td className="p-3 text-sm text-gray-600">{assignment.quantity}</td>
                        <td className="p-3">
                          <button
                            onClick={() => handleAddAssignment(assignment)}
                            disabled={selectedAssignments.some(item => item.id === assignment.id)}
                            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-sm"
                          >
                            {selectedAssignments.some(item => item.id === assignment.id) ? "Đã chọn" : "Chọn"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredAssignments.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    {searchTerm ? "Không tìm thấy bài tập nào phù hợp" : "Không có bài tập nào"}
                  </div>
                )}
              </div>
            </div>

            {/* Bên phải: Bài tập đã chọn */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Bài tập trong đề thi</h2>
              
              {selectedAssignments.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  Chưa có bài tập nào được chọn
                </div>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {selectedAssignments.map((assignment) => (
                    <div key={assignment.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-medium text-gray-900">{assignment.title}</h3>
                          <p className="text-sm text-gray-600">{assignment.content}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                              {assignment.type}
                            </span>
                            <span className="text-xs text-gray-500">
                              {assignment.quantity} câu hỏi
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleRemoveAssignment(assignment.id)}
                          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                        >
                          Xóa
                        </button>
                      </div>

                      {/* Hiển thị câu hỏi */}
                      <div className="mt-3 pt-3 border-t">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Câu hỏi:</h4>
                        {assignmentQuestions[assignment.id] ? (
                          <div className="space-y-2">
                            {assignmentQuestions[assignment.id].map((question, index) => (
                              <div key={question.id} className="bg-gray-50 p-2 rounded text-sm">
                                <div className="font-medium text-gray-800">
                                  {index + 1}. {question.questionText}
                                </div>
                                <div className="text-xs text-gray-600 mt-1">
                                  <strong>Đáp án:</strong> {question.correctAnswer}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-sm text-gray-500">Đang tải câu hỏi...</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CreateExamPage;
