import React from "react";

const QuestionTable = ({ questions, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 text-left">#</th>
            <th className="p-2 text-left">Nội dung</th>
            <th className="p-2 text-left">Phân loại</th>
            <th className="p-2 text-left">Chủ đề</th>
            <th className="p-2 text-left">Hành động</th>
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
              <tr key={q.id} className="border-b">
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{q.content}</td>
                <td className="p-2">{q.questionType}</td>
                <td className="p-2">{q.topic}</td>
                <td className="p-2 space-x-2">
                  <button
                    className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500"
                    onClick={() => onEdit && onEdit(q)}
                  >
                    Sửa
                  </button>
                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => onDelete && onDelete(q.id)}
                  >
                    Xoá
                  </button>
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
