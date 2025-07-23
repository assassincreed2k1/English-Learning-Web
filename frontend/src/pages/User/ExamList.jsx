import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchExams } from "../../api/examSlice";
import { useNavigate } from "react-router-dom";

const ExamList = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { exams, loading, error } = useSelector((state) => state.exam);

  useEffect(() => {
    dispatch(fetchExams());
  }, [dispatch]);
  const handleClick = (id) => {
    navigate(`/exam/${id}`);
  };
  const handleClickHistory = (examId) => {
    navigate(`/exam/${examId}/history`);
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500 py-8">{error}</div>;

  return (
    <>
      <header className="bg-white shadow py-4 px-8 flex justify-between items-center">
        <a href="/" className="text-2xl font-bold text-blue-600">
          English Learning
        </a>
      </header>
      <div className="max-w-3xl mx-auto py-8">
        <h2 className="text-2xl font-bold mb-6 text-blue-600 text-center">
          Exam List
        </h2>
        {!exams || exams.length === 0 ? (
          <div className="text-center text-gray-500">No exams available.</div>
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
                      Duration: {exam.duration} min
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mt-4 sm:mt-0">
                  <button
                    onClick={() => handleClickHistory(exam.id)}
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition"
                  >
                    View History
                  </button>
                  <button
                    onClick={() => handleClick(exam.id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                  >
                    Take Exam
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default ExamList;
