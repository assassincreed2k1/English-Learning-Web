import React, { useState, useEffect } from "react";
import Header from "../../components/Admin/Header";
import Footer from "../../components/Admin/Footer";
import { useNavigate } from "react-router-dom";
import { getAssignments, deleteAssignment } from "../../api/assignmentApi";

const ExerciseBankPage = () => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchExercises();
    // eslint-disable-next-line
  }, []);

  const fetchExercises = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getAssignments();
      setExercises(data);
    } catch (err) {
      setError("Không thể tải danh sách bài tập");
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xoá?")) {
      try {
        await deleteAssignment(id);
        setExercises(exercises.filter((ex) => ex.id !== id));
      } catch (err) {
        alert("Xoá thất bại!");
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit-exercise/${id}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-100 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Ngân hàng bài tập
          </h1>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            onClick={() => navigate("/admin/exercise-bank/create")}
          >
            ➕ Thêm bài tập
          </button>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          {error && <div className="text-red-500 mb-2">{error}</div>}
          {loading ? (
            <div>Đang tải...</div>
          ) : (
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 text-left">#</th>
                  <th className="p-2 text-left">Tên bài tập</th>
                  <th className="p-2 text-left">Mô tả</th>
                  <th className="p-2 text-left">Loại</th>
                  <th className="p-2 text-left">Số câu hỏi</th>
                  <th className="p-2 text-left">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {exercises.map((ex, idx) => (
                  <tr key={ex.id} className="border-b">
                    <td className="p-2">{idx + 1}</td>
                    <td className="p-2">{ex.content}</td>
                    <td className="p-2">{ex.description}</td>
                    <td className="p-2">{ex.type}</td>
                    <td className="p-2">
                      {ex.questions ? ex.questions.length : 0}
                    </td>
                    <td className="p-2 space-x-2">
                      <button
                        className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500"
                        onClick={() => handleEdit(ex.id)}
                      >
                        Sửa
                      </button>
                      <button
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        onClick={() => handleDelete(ex.id)}
                      >
                        Xoá
                      </button>
                    </td>
                  </tr>
                ))}
                {exercises.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center py-4 text-gray-500">
                      Chưa có bài tập nào.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ExerciseBankPage;
