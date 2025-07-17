import React from "react";
import { Link } from "react-router-dom";

const QuestionTable = ({ questions, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 overflow-x-auto">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 text-left">#</th>
            <th className="p-2 text-left">Content</th>
            <th className="p-2 text-left">Topic</th>
            <th className="p-2 text-left">Category</th>
            <th className="p-2 text-left">Correct Answer</th>
            <th className="p-2 text-left">Explanation</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {questions.length === 0 ? (
            <tr>
              <td colSpan="10" className="text-center py-4 text-gray-500">
                No questions found.
              </td>
            </tr>
          ) : (
            questions.map((q, index) => (
              <tr key={q.id} className="border-b">
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{q.content}</td>
                <td className="p-2">{q.topic}</td>
                <td className="p-2">{q.category}</td>
                <td className="p-2">{q.correctAnswer}</td>
                <td className="p-2">{q.explanation}</td>
                <td className="p-2 space-x-2">
                  <Link
                    to={`/admin/questions/${q.id}`}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    View Details
                  </Link>
                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => onDelete && onDelete(q.id)}
                  >
                    Delete
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