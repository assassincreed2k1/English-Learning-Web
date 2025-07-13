import React, { useEffect, useState } from "react";
import Header from "../../../components/Admin/Header";
import Footer from "../../../components/Admin/Footer";
import { getQuestions } from "../../../api/questionApi";
import { useNavigate } from "react-router-dom";
import { addAssignment } from "../../../api/assignmentApi";

const CreateExercisePage = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [exerciseTitle, setExerciseTitle] = useState("");
  const [exerciseDesc, setExerciseDesc] = useState("");
  const [exerciseType, setExerciseType] = useState("READING"); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      const data = await getQuestions();
      setQuestions(data);
    };
    fetchQuestions();
  }, []);

  const handleAddQuestion = (q) => {
    if (!selectedQuestions.find((item) => item.id === q.id)) {
      setSelectedQuestions([...selectedQuestions, q]);
    }
  };

  const handleRemoveQuestion = (id) => {
    setSelectedQuestions(selectedQuestions.filter((q) => q.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addAssignment({
        content: exerciseTitle, 
        description: exerciseDesc,
        type: exerciseType,
        questions: selectedQuestions,
        quantity: selectedQuestions.length,
      });
      alert("Đã tạo bài tập mới!");
      navigate("/exercise-bank");
    } catch (err) {
      alert("Tạo bài tập thất bại!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-100 p-8">
        <h1 className="text-2xl font-bold mb-4">Tạo bài tập mới</h1>
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
            Lưu bài tập
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

export default CreateExercisePage;
