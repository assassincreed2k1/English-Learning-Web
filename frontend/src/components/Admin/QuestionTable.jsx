// src/components/QuestionTable.jsx
import React from "react";

const QuestionTable = ({ questions }) => {
  return (
    <div className="overflow-x-auto mt-6">
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-blue-100 text-left">
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">Nội dung</th>
            <th className="px-4 py-2">Cấp độ</th>
            <th className="px-4 py-2">Chủ đề</th>
            <th className="px-4 py-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {questions.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center py-4 text-gray-500">
                Không có câu hỏi nào.
              </td>
            </tr>
          ) : (
            questions.map((q, index) => (
              <tr key={q.id} className="border-t">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{q.content}</td>
                <td className="px-4 py-2">{q.level}</td>
                <td className="px-4 py-2">{q.topic}</td>
                <td className="px-4 py-2">
                  <button className="text-blue-500 hover:underline">Sửa</button>
                  {" | "}
                  <button className="text-red-500 hover:underline">Xoá</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionTable;
