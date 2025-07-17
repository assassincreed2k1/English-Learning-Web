import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../../components/Admin/Header";
import Footer from "../../../components/Admin/Footer";
import { getAssignmentById, updateAssignment } from "../../../api/assignmentApi";
import { getQuestions, searchQuestions } from "../../../api/questionApi";

const AssignmentDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [assignment, setAssignment] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  
  // Form states
  const [exerciseTitle, setExerciseTitle] = useState("");
  const [exerciseDesc, setExerciseDesc] = useState("");
  const [exerciseType, setExerciseType] = useState("READING");
  const [timeLimit, setTimeLimit] = useState("");
  const [passage, setPassage] = useState("");
  const [audioUrl, setAudioUrl] = useState("");

  useEffect(() => {
    fetchAssignmentDetail();
    fetchQuestions();
  }, [id]);

  const fetchAssignmentDetail = async () => {
    try {
      const data = await getAssignmentById(id);
      setAssignment(data);
      setExerciseTitle(data.content || "");
      setExerciseDesc(data.description || "");
      setExerciseType(data.type || "READING");
      setTimeLimit(data.timeLimit || "");
      setPassage(data.passage || "");
      setAudioUrl(data.audioUrl || "");
      setSelectedQuestions(data.questions || []);
    } catch (error) {
      console.error("Error fetching assignment:", error);
      alert("Lỗi khi tải thông tin bài tập!");
      navigate("/admin/exercise-bank");
    }
  };

  const fetchQuestions = async () => {
    try {
      const data = await getQuestions();
      setQuestions(data);
    } catch (error) {
      console.error("Error fetching questions:", error);
      alert("Lỗi khi tải danh sách câu hỏi!");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchQuestions = async () => {
    if (searchKeyword.trim()) {
      try {
        const data = await searchQuestions(searchKeyword);
        setQuestions(data);
      } catch (error) {
        console.error("Error searching questions:", error);
        alert("Lỗi khi tìm kiếm câu hỏi!");
      }
    } else {
      fetchQuestions();
    }
  };

  const handleAddQuestion = (question) => {
    if (!selectedQuestions.find((q) => q.id === question.id)) {
      setSelectedQuestions([...selectedQuestions, question]);
    }
  };

  const handleRemoveQuestion = (questionId) => {
    setSelectedQuestions(selectedQuestions.filter((q) => q.id !== questionId));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    if (!exerciseTitle.trim()) {
      alert("Vui lòng nhập tên bài tập!");
      return;
    }

    try {
      await updateAssignment(id, {
        content: exerciseTitle,
        description: exerciseDesc,
        type: exerciseType,
        timeLimit: timeLimit ? parseInt(timeLimit) : null,
        passage: passage,
        audioUrl: audioUrl,
        questions: selectedQuestions,
      });
      alert("Đã cập nhật bài tập thành công!");
      setIsEditing(false);
      fetchAssignmentDetail();
    } catch (error) {
      console.error("Error updating assignment:", error);
      alert("Lỗi khi cập nhật bài tập!");
    }
  };

  const getTypeDisplayName = (type) => {
    const typeMap = {
      VOCABULARY: "Từ vựng",
      GRAMMAR: "Ngữ pháp", 
      PRONUNCIATION: "Phát âm",
      LISTENING: "Nghe hiểu",
      READING: "Đọc hiểu",
      MIXED: "Hỗn hợp"
    };
    return typeMap[type] || type;
  };

  const getCorrectAnswerText = (question) => {
    const answerMap = {
      A: question.optionA,
      B: question.optionB,
      C: question.optionC,
      D: question.optionD
    };
    return answerMap[question.correctAnswer] || "";
  };

  if (loading || !assignment) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 bg-gray-100 p-8">
          <div className="text-center">Đang tải...</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-100 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Chi tiết bài tập</h1>
            <div className="flex gap-2">
              <button
                onClick={() => navigate("/admin/exercise-bank")}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Quay lại
              </button>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={`px-4 py-2 rounded ${
                  isEditing 
                    ? "bg-red-500 hover:bg-red-600" 
                    : "bg-blue-500 hover:bg-blue-600"
                } text-white`}
              >
                {isEditing ? "Hủy chỉnh sửa" : "Chỉnh sửa"}
              </button>
            </div>
          </div>

          {/* Assignment Information */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            {isEditing ? (
              <form onSubmit={handleUpdate}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tên bài tập *
                    </label>
                    <input
                      type="text"
                      value={exerciseTitle}
                      onChange={(e) => setExerciseTitle(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Loại bài tập
                    </label>
                    <select
                      value={exerciseType}
                      onChange={(e) => setExerciseType(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="VOCABULARY">Từ vựng</option>
                      <option value="GRAMMAR">Ngữ pháp</option>
                      <option value="PRONUNCIATION">Phát âm</option>
                      <option value="LISTENING">Nghe hiểu</option>
                      <option value="READING">Đọc hiểu</option>
                      <option value="MIXED">Hỗn hợp</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mô tả bài tập
                    </label>
                    <textarea
                      value={exerciseDesc}
                      onChange={(e) => setExerciseDesc(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="3"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Thời gian giới hạn (phút)
                    </label>
                    <input
                      type="number"
                      value={timeLimit}
                      onChange={(e) => setTimeLimit(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      min="1"
                    />
                  </div>
                </div>
                
                {exerciseType === "READING" && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Đoạn văn đọc hiểu
                    </label>
                    <textarea
                      value={passage}
                      onChange={(e) => setPassage(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="5"
                    />
                  </div>
                )}
                
                {exerciseType === "LISTENING" && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      URL âm thanh
                    </label>
                    <input
                      type="url"
                      value={audioUrl}
                      onChange={(e) => setAudioUrl(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                )}
                
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Cập nhật bài tập
                </button>
              </form>
            ) : (
              <div>
                <h2 className="text-xl font-bold mb-4">{assignment.content}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="mb-4">
                      <strong>Loại bài tập:</strong> {getTypeDisplayName(assignment.type)}
                    </div>
                    <div className="mb-4">
                      <strong>Số câu hỏi:</strong> {assignment.questions?.length || 0}
                    </div>
                    <div className="mb-4">
                      <strong>Thời gian:</strong> {assignment.timeLimit ? `${assignment.timeLimit} phút` : "Không giới hạn"}
                    </div>
                  </div>
                  <div>
                    {assignment.description && (
                      <div className="mb-4">
                        <strong>Mô tả:</strong> {assignment.description}
                      </div>
                    )}
                    {assignment.passage && (
                      <div className="mb-4">
                        <strong>Đoạn văn:</strong>
                        <div className="mt-2 p-3 bg-gray-50 rounded">
                          {assignment.passage}
                        </div>
                      </div>
                    )}
                    {assignment.audioUrl && (
                      <div className="mb-4">
                        <strong>Audio:</strong>
                        <audio controls className="mt-2 w-full">
                          <source src={assignment.audioUrl} type="audio/mpeg" />
                          Trình duyệt không hỗ trợ audio.
                        </audio>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Questions Section */}
          {isEditing ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Available Questions */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold mb-4">Danh sách câu hỏi</h2>
                
                {/* Search */}
                <div className="mb-4 flex gap-2">
                  <input
                    type="text"
                    placeholder="Tìm kiếm câu hỏi..."
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onKeyPress={(e) => e.key === 'Enter' && handleSearchQuestions()}
                  />
                  <button
                    onClick={handleSearchQuestions}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                  >
                    Tìm
                  </button>
                </div>
                
                {/* Questions List */}
                <div className="max-h-96 overflow-y-auto">
                  {questions.map((question) => (
                    <div key={question.id} className="border rounded-lg p-4 mb-3">
                      <div className="font-medium mb-2">{question.content}</div>
                      <div className="text-sm text-gray-600 mb-2">
                        <div>A. {question.optionA}</div>
                        <div>B. {question.optionB}</div>
                        <div>C. {question.optionC}</div>
                        <div>D. {question.optionD}</div>
                      </div>
                      <div className="text-sm text-green-600 mb-2">
                        Đáp án: {question.correctAnswer}. {getCorrectAnswerText(question)}
                      </div>
                      <button
                        onClick={() => handleAddQuestion(question)}
                        disabled={selectedQuestions.find((q) => q.id === question.id)}
                        className={`px-3 py-1 rounded text-sm ${
                          selectedQuestions.find((q) => q.id === question.id)
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-blue-500 text-white hover:bg-blue-600"
                        }`}
                      >
                        {selectedQuestions.find((q) => q.id === question.id) ? "Đã chọn" : "Thêm"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Selected Questions */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold mb-4">
                  Câu hỏi đã chọn ({selectedQuestions.length})
                </h2>
                
                <div className="max-h-96 overflow-y-auto">
                  {selectedQuestions.map((question, index) => (
                    <div key={question.id} className="border rounded-lg p-4 mb-3">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="font-medium mb-2">
                            {index + 1}. {question.content}
                          </div>
                          <div className="text-sm text-gray-600 mb-2">
                            <div>A. {question.optionA}</div>
                            <div>B. {question.optionB}</div>
                            <div>C. {question.optionC}</div>
                            <div>D. {question.optionD}</div>
                          </div>
                          <div className="text-sm text-green-600">
                            Đáp án: {question.correctAnswer}. {getCorrectAnswerText(question)}
                          </div>
                        </div>
                        <button
                          onClick={() => handleRemoveQuestion(question.id)}
                          className="ml-2 px-2 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                        >
                          Xóa
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Danh sách câu hỏi ({assignment.questions?.length || 0})</h2>
              
              <div className="space-y-4">
                {assignment.questions?.map((question, index) => (
                  <div key={question.id} className="border rounded-lg p-4">
                    <div className="font-medium mb-2">
                      {index + 1}. {question.content}
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      <div>A. {question.optionA}</div>
                      <div>B. {question.optionB}</div>
                      <div>C. {question.optionC}</div>
                      <div>D. {question.optionD}</div>
                    </div>
                    <div className="text-sm text-green-600">
                      Đáp án: {question.correctAnswer}. {getCorrectAnswerText(question)}
                    </div>
                  </div>
                )) || (
                  <div className="text-center text-gray-500">
                    Bài tập này chưa có câu hỏi nào
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AssignmentDetailPage;
