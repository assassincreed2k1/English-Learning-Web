import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:8080/api";
const getToken = () => localStorage.getItem("token");
const getAuthHeaders = () => ({
  Authorization: `Bearer ${getToken()}`,
});

const SubmissonList = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/exams/${examId}/submissions`, {
      headers: getAuthHeaders(),
    })
      .then(async (res) => {
        if (!res.ok) throw new Error(await res.text());
        return res.json();
      })
      .then((data) => {
        setSubmissions(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Không thể tải lịch sử làm bài");
        setLoading(false);
      });
  }, [examId]);

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
          Lịch sử làm bài
        </h2>
        {!submissions || submissions.length === 0 ? (
          <div className="text-center text-gray-500">Chưa có bài nộp nào.</div>
        ) : (
          <table className="w-full bg-white shadow rounded">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4">#</th>
                <th className="py-2 px-4">Điểm</th>
                <th className="py-2 px-4">Số câu đúng</th>
                <th className="py-2 px-4">Tổng số câu</th>
                <th className="py-2 px-4">Tỷ lệ đúng (%)</th>
                <th className="py-2 px-4">Xem chi tiết</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((sub, idx) => (
                <tr key={sub.id} className="border-t">
                  <td className="py-2 px-4 text-center">{idx + 1}</td>
                  <td className="py-2 px-4 text-center">{sub.score}</td>
                  <td className="py-2 px-4 text-center">{sub.rightAnswers}</td>
                  <td className="py-2 px-4 text-center">{sub.totalQuestion}</td>
                  <td className="py-2 px-4 text-center">
                    {sub.percentageCorrect}
                  </td>
                  <td className="py-2 px-4 text-center">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      onClick={() => navigate(`/submission/${sub.id}/detail`)}
                    >
                      View Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default SubmissonList;
