import React, { useEffect, useState } from "react";
import axios from "axios";

const ExamList = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/exams");
        setExams(res.data.result || []);
      } catch (err) {
        setError("Không thể tải danh sách đề thi.");
      } finally {
        setLoading(false);
      }
    };
    fetchExams();
  }, []);

  if (loading) return <div className="text-center py-8">Đang tải...</div>;
  if (error)
    return <div className="text-center text-red-500 py-8">{error}</div>;

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6 text-blue-600 text-center">
        Danh sách đề thi
      </h2>
      {exams.length === 0 ? (
        <div className="text-center text-gray-500">Chưa có đề thi nào.</div>
      ) : (
        <ul className="space-y-4">
          {exams.map((exam) => (
            <li
              key={exam.id}
              className="bg-white shadow rounded p-4 flex flex-col sm:flex-row justify-between items-center gap-4"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                {exam.image && (
                  <img
                    src={exam.image}
                    alt={exam.title}
                    className="w-20 h-20 object-cover rounded border"
                  />
                )}
                <div>
                  <div className="font-semibold text-lg">{exam.title}</div>
                  <div className="text-gray-500 text-sm">
                    Thời gian: {exam.duration} phút
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-4 sm:mt-0">
                <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition">
                  Xem lịch sử làm bài
                </button>
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                  Làm bài thi
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExamList;
