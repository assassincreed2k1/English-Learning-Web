import React, { useState } from "react";
import Header from "../../components/Admin/Header";
import Footer from "../../components/Admin/Footer";

const mockExercises = [
  {
    id: 1,
    title: "Bài tập 1: Điền từ vào chỗ trống",
    description: "Luyện tập điền từ còn thiếu vào câu.",
    level: "Dễ",
    questionCount: 10,
  },
  {
    id: 2,
    title: "Bài tập 2: Đọc hiểu",
    description: "Đọc đoạn văn và trả lời câu hỏi.",
    level: "Trung bình",
    questionCount: 5,
  },
];

const ExerciseBankPage = () => {
  const [exercises] = useState(mockExercises);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-100 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Ngân hàng bài tập</h1>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
            ➕ Thêm bài tập
          </button>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 text-left">#</th>
                <th className="p-2 text-left">Tên bài tập</th>
                <th className="p-2 text-left">Mô tả</th>
                <th className="p-2 text-left">Cấp độ</th>
                <th className="p-2 text-left">Số câu hỏi</th>
                <th className="p-2 text-left">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {exercises.map((ex, idx) => (
                <tr key={ex.id} className="border-b">
                  <td className="p-2">{idx + 1}</td>
                  <td className="p-2">{ex.title}</td>
                  <td className="p-2">{ex.description}</td>
                  <td className="p-2">{ex.level}</td>
                  <td className="p-2">{ex.questionCount}</td>
                  <td className="p-2 space-x-2">
                    <button className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500">
                      Sửa
                    </button>
                    <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
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
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ExerciseBankPage;
