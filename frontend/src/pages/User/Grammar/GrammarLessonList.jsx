import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:8080/api";

const GrammarLessonList = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_URL}/grammar-lessons`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();
        setLessons(data);
      } catch (err) {
        setLessons([]);
        setError("Không thể tải danh sách bài học.");
      } finally {
        setLoading(false);
      }
    };
    fetchLessons();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <span className="text-lg text-gray-500">
          Đang tải danh sách bài học...
        </span>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-64">
        <span className="text-lg text-red-500">{error}</span>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-extrabold mb-8 text-blue-700 text-center">
          Danh sách bài học ngữ pháp
        </h2>
        {lessons.length === 0 ? (
          <div className="text-gray-500 text-center">Không có bài học nào.</div>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {lessons.map((lesson) => (
              <li
                key={lesson.id}
                className="bg-white border border-blue-100 rounded-xl shadow hover:shadow-lg transition p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="font-bold text-lg text-blue-600 mb-2">
                    {lesson.title}
                  </div>
                  {lesson.image && (
                    <img
                      src={lesson.image}
                      alt={lesson.title}
                      className="w-full h-32 object-cover rounded mb-3"
                    />
                  )}
                  <div className="text-gray-600 text-sm mb-2 line-clamp-3">
                    {lesson.content &&
                      lesson.content.replace(/<[^>]+>/g, "").slice(0, 120) +
                        (lesson.content.length > 120 ? "..." : "")}
                  </div>
                </div>
                <button
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
                  onClick={() => navigate(`/grammar-lessons/${lesson.id}`)}
                >
                  Xem chi tiết
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default GrammarLessonList;