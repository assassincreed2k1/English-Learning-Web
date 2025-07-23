import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API_URL = "http://localhost:8080/api";
const getToken = () => localStorage.getItem("token");
const getAuthHeaders = () => ({
  Authorization: `Bearer ${getToken()}`,
});

const SubmissionDetail = () => {
  const navigate = useNavigate();
  const { submissionId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/submissions/${submissionId}/results`, {
      headers: getAuthHeaders(),
    })
      .then(async (res) => {
        if (!res.ok) throw new Error(await res.text());
        return res.json();
      })
      .then((data) => {
        setQuestions(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Không thể tải chi tiết bài nộp");
        setLoading(false);
      });
  }, [submissionId]);

  if (loading) return <div className="text-center py-8">Đang tải...</div>;
  if (error)
    return <div className="text-center text-red-500 py-8">{error}</div>;

  return (
    <>
      <header className="bg-white shadow py-4 px-8 flex justify-between items-center">
        <a href="/" className="text-2xl font-bold text-blue-600">
          English Learning
        </a>
      </header>
      <div className="max-w-2xl mx-auto py-8">
        <h2 className="text-2xl font-bold mb-6 text-blue-600 text-center">
          Chi tiết bài làm
        </h2>
        {!questions || questions.length === 0 ? (
          <div className="text-center text-gray-500">Không có dữ liệu.</div>
        ) : (
          <ul className="space-y-4">
            {questions.map((item, idx) => (
              <li key={item.questionId} className="p-3 rounded border">
                <div>
                  <span className="font-semibold">Câu {idx + 1}:</span>{" "}
                  {item.content}
                </div>
                <div className="ml-4 text-sm space-y-1 mt-1">
                  {["A", "B", "C", "D"].map((opt) => {
                    const isCorrect = opt === item.correctAnswer;
                    const isChosen = opt === item.userAnswer;
                    const color = isCorrect
                      ? "text-green-600"
                      : isChosen
                      ? "text-red-600"
                      : "text-gray-700";

                    return (
                      <div key={opt} className={`${color}`}>
                        {opt}: {item[`option${opt}`]}
                        {isCorrect && " ✅"}
                        {isChosen && !isCorrect && " ❌"}
                      </div>
                    );
                  })}
                  <div>
                    Kết quả:{" "}
                    {item.correct ? (
                      <span className="text-green-600 font-semibold">Đúng</span>
                    ) : (
                      <span className="text-red-600 font-semibold">Sai</span>
                    )}
                  </div>
                  {item.explanation && (
                    <div className="italic text-gray-500">
                      📘 Giải thích: {item.explanation}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
        <div className="text-center">
          <button
            onClick={() => navigate("/exams")}
            className="mt-6 bg-gray-300 text-gray-800 px-6 py-2 rounded font-semibold hover:bg-gray-400 transition"
          >
            ← Trở về danh sách đề thi
          </button>
        </div>
      </div>
    </>
  );
};

export default SubmissionDetail;
