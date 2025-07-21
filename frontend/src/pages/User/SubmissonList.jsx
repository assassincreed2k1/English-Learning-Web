import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubmissionsByExam } from "../../api/SubmissionSlice";
import { useParams } from "react-router-dom";

const SubmissonList = () => {
  const { examId } = useParams();
  const dispatch = useDispatch();
  const { submissions, loading, error } = useSelector((state) => state.submission);

  useEffect(() => {
    if (examId) {
      dispatch(fetchSubmissionsByExam(examId));
    }
  }, [dispatch, examId]);

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6 text-blue-600 text-center">
        Exam Submission History
      </h2>
      {loading && <div className="text-center py-8">Loading...</div>}
      {error && <div className="text-center text-red-500 py-8">{error}</div>}
      {!loading && !error && (
        <>
          {(!submissions || submissions.length === 0) ? (
            <div className="text-center text-gray-500">No submissions yet.</div>
          ) : (
            <table className="w-full bg-white shadow rounded">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4">#</th>
                  <th className="py-2 px-4">Score</th>
                  <th className="py-2 px-4">Correct Answers</th>
                  <th className="py-2 px-4">Total Questions</th>
                  <th className="py-2 px-4">Correct Rate (%)</th>
                  <th className="py-2 px-4">Submitted At</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((sub, idx) => (
                  <tr key={sub.id} className="border-t">
                    <td className="py-2 px-4 text-center">{idx + 1}</td>
                    <td className="py-2 px-4 text-center">{sub.score}</td>
                    <td className="py-2 px-4 text-center">{sub.rightAnswers}</td>
                    <td className="py-2 px-4 text-center">{sub.totalQuestion}</td>
                    <td className="py-2 px-4 text-center">{sub.percentageCorrect}</td>
                    <td className="py-2 px-4 text-center">{sub.createdAt ? new Date(sub.createdAt).toLocaleString() : ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
};

export default  SubmissonList;