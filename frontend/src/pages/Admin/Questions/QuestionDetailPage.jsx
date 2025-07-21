import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getQuestions, updateQuestion } from "../../../api/questionApi";

const QuestionDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const allQuestions = await getQuestions();
        const found = allQuestions.find(q => String(q.id) === String(id));
        if (!found) throw new Error("Question not found");
        setQuestion(found);
        setForm(found);
      } catch (e) {
        setError(e.message);
      }
      setLoading(false);
    };
    fetchData();
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async e => {
    e.preventDefault();
    try {
      await updateQuestion(id, form);
      setEditMode(false);
      setQuestion(form);
      alert("Update successful!");
    } catch (err) {
      alert("Update failed: " + err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!question) return null;

  return (
    <div className="max-w-2xl mx-auto bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl shadow-lg mt-10">
      <div className="flex items-center mb-6">
        <div className="bg-blue-500 text-white rounded-full p-3 mr-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 17l4 4 4-4m-4-5v9"
            />
          </svg>
        </div>
        <h2 className="text-3xl font-extrabold text-blue-700 tracking-tight">
          Question Details
        </h2>
      </div>
      {!editMode ? (
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow p-5">
            <div className="text-lg font-semibold text-gray-700 mb-2 flex items-center">
              <svg
                className="h-5 w-5 text-blue-400 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V7a2 2 0 00-2-2H6a2 2 0 00-2 2v6"
                />
              </svg>
              Content:
            </div>
            <div className="text-gray-900 text-base whitespace-pre-line">
              {question.content}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl shadow p-4">
              <div className="font-medium text-gray-600 mb-1">Topic</div>
              <div className="text-blue-700 font-bold">{question.topic}</div>
            </div>
            <div className="bg-white rounded-xl shadow p-4">
              <div className="font-medium text-gray-600 mb-1">
                Category
              </div>
              <div className="text-blue-700 font-bold">{question.category}</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl shadow p-4">
              <div className="font-medium text-gray-600 mb-1">Correct Answer</div>
              <div className="text-red-700 font-bold">
                {question.correctAnswer}
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-4">
            <div className="font-medium text-gray-600 mb-1">Explanation</div>
            <div className="text-gray-900">
              {question.explanation || (
                <span className="italic text-gray-400">No explanation</span>
              )}
            </div>
          </div>
          <div className="flex gap-3 mt-6 justify-end">
            <button
              className="px-5 py-2 rounded-lg bg-yellow-500 text-white font-semibold shadow hover:bg-yellow-600 transition"
              onClick={() => setEditMode(true)}
            >
              <svg
                className="h-5 w-5 inline-block mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536M9 13l6.293-6.293a1 1 0 011.414 0l2.586 2.586a1 1 0 010 1.414L13 17H9v-4z"
                />
              </svg>
              Edit
            </button>
            <button
              className="px-5 py-2 rounded-lg bg-gray-300 text-gray-700 font-semibold shadow hover:bg-gray-400 transition"
              onClick={() => navigate(-1)}
            >
              <svg
                className="h-5 w-5 inline-block mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back
            </button>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleUpdate}
          className="space-y-4 bg-white rounded-xl shadow p-6"
        >
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Content
            </label>
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Topic
              </label>
              <input
                name="topic"
                value={form.topic}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-200"
                required
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Category
              </label>
              <input
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-200"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Correct Answer
              </label>
              <input
                name="correctAnswer"
                value={form.correctAnswer}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:ring focus:ring-red-200"
                required
              />
            </div>
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Explanation
            </label>
            <textarea
              name="explanation"
              value={form.explanation}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-200"
            />
          </div>
          <div className="flex gap-3 mt-6 justify-end">
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-blue-500 text-white font-semibold shadow hover:bg-blue-600 transition"
            >
              Save
            </button>
            <button
              type="button"
              className="px-5 py-2 rounded-lg bg-gray-300 text-gray-700 font-semibold shadow hover:bg-gray-400 transition"
              onClick={() => setEditMode(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default QuestionDetailPage;
