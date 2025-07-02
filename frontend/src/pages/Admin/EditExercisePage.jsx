import React, { useEffect, useState } from "react";
import Header from "../../components/Admin/Header";
import Footer from "../../components/Admin/Footer";
import { getQuestions } from "../../api/questionApi";
import { useNavigate, useParams } from "react-router-dom";
import { updateAssignment, getAssignments } from "../../api/assignmentApi";

const EditExercisePage = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [exerciseTitle, setExerciseTitle] = useState("");
  const [exerciseDesc, setExerciseDesc] = useState("");
  const [exerciseType, setExerciseType] = useState("READING");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Lấy tất cả bài tập, tìm bài tập theo id
        const assignments = await getAssignments();
        const assignment = assignments.find((a) => String(a.id) === String(id));
        if (!assignment) {
          alert("Không tìm thấy bài tập!");
          navigate("/exercise-bank");
          return;
        }
        setExerciseTitle(assignment.content || "");
        setExerciseDesc(assignment.description || "");
        setExerciseType(assignment.type || "READING");
        setSelectedQuestions(assignment.questions || []);
        // Lấy danh sách câu hỏi
        const qs = await getQuestions();
        setQuestions(qs);
      } catch (err) {
        alert("Lỗi tải dữ liệu!");
        navigate("/exercise-bank");
      }
      setLoading(false);
    };
    fetchData();
    // eslint-disable-next-line
  }, [id]);

  const handleAddQuestion = (q) => {
    if (!selectedQuestions.find((item) => item.id === q.id)) {
      setSelectedQuestions([...selectedQuestions, q]);
    }
  };

  const handleRemoveQuestion = (qid) => {
    setSelectedQuestions(selectedQuestions.filter((q) => q.id !== qid));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateAssignment(id, {
        content: exerciseTitle,
        description: exerciseDesc,
        type: exerciseType,
        questions: selectedQuestions,
        quantity: selectedQuestions.length,
      });
      alert("Đã cập nhật bài tập!");
      navigate("/exercise-bank");
    } catch (err) {
      alert("Cập nhật bài tập thất bại!");
    }
  };

  if (loading) return <div>Đang tải...</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-100 p-8">
        <h1 className="text-2xl font-bold mb-4">Sửa bài tập</h1>
        <form onSubmit={handleSubmit} className="mb-6">
          <input
            className="border rounded p-2 mr-2 w-1/3"
            placeholder="Tên bài tập"
            value={exerciseTitle}
            onChange={(e) => setExerciseTitle(e.target.value)}
            required
          />
          <input
            className="border rounded p-2 w-1/2"
            placeholder="Mô tả bài tập"
            value={exerciseDesc}
            onChange={(e) => setExerciseDesc(e.target.value)}
          />
          <select
            className="border rounded p-2 ml-2"
            value={exerciseType}
            onChange={(e) => setExerciseType(e.target.value)}
          >
            <option value="READING">Đọc hiểu</option>
            <option value="PRONUNCIATION">Phát âm</option>
            <option value="LISTENING">Nghe hiểu</option>
          </select>
          <button
            type="submit"
            className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Lưu thay đổi
          </button>
        </form>
        <div className="flex gap-8">
          {/* Danh sách câu hỏi */}
          <div className="w-1/2 bg-white rounded shadow p-4">
            <h2 className="font-bold mb-2">Danh sách câu hỏi</h2>
            <ul>
              {questions.map((q) => (
                <li
                  key={q.id}
                  className="flex justify-between items-center border-b py-2"
                >
                  <span>{q.content}</span>
                  <button
                    className="ml-2 px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    onClick={() => handleAddQuestion(q)}
                    disabled={selectedQuestions.find(
                      (item) => item.id === q.id
                    )}
                  >
                    Thêm
                  </button>
                </li>
              ))}
            </ul>
          </div>
          {/* Danh sách câu hỏi đã chọn */}
          <div className="w-1/2 bg-white rounded shadow p-4">
            <h2 className="font-bold mb-2">Câu hỏi trong bài tập</h2>
            <ul>
              {selectedQuestions.map((q) => (
                <li
                  key={q.id}
                  className="flex justify-between items-center border-b py-2"
                >
                  <span>{q.content}</span>
                  <button
                    className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => handleRemoveQuestion(q.id)}
                  >
                    Xoá
                  </button>
                </li>
              ))}
              {selectedQuestions.length === 0 && (
                <li className="text-gray-500 py-2">Chưa có câu hỏi nào.</li>
              )}
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EditExercisePage;
