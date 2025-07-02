import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchExamById } from "../../api/examSlice";
import { useParams } from "react-router-dom";

const ExamPage = () => {
  const { examId } = useParams();
  const dispatch = useDispatch();
  const { examDetail, loading, error } = useSelector((state) => state.exam);

  useEffect(() => {
    if (examId) {
      dispatch(fetchExamById(examId));
    }
  }, [dispatch, examId]);

  if (loading)
    return <div className="text-center py-8">Đang tải đề thi...</div>;
  if (error)
    return <div className="text-center text-red-500 py-8">{error}</div>;
  if (!examDetail) return null;

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="bg-white rounded-xl shadow p-8">
        <h2 className="text-2xl font-bold mb-4 text-blue-600">
          {examDetail.title}
        </h2>
        {examDetail.image && (
          <img
            src={examDetail.image}
            alt={examDetail.title}
            className="w-40 h-40 object-cover rounded mb-4 mx-auto"
          />
        )}
        <div className="mb-2 text-gray-700">
          <span className="font-semibold">Thời gian:</span>{" "}
          {examDetail.duration} phút
        </div>
        <div className="mb-2 text-gray-700">
          <span className="font-semibold">Tổng số bài tập:</span>{" "}
          {examDetail.totalAssignment}
        </div>
        <div className="mb-2 text-gray-700">
          <span className="font-semibold">Loại đề thi:</span>{" "}
          {examDetail.examType}
        </div>
        {/* Hiển thị danh sách assignment nếu có */}
        {/* Hiển thị danh sách assignment nếu có */}
        {examDetail.examAssignments &&
          examDetail.examAssignments.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Danh sách bài tập:</h3>
              <ul className="list-disc list-inside space-y-3">
                {examDetail.examAssignments.map((assignment) => (
                  <li key={assignment.id}>
                    <div>
                      <span className="font-medium">{assignment.content}</span>
                      {assignment.description && (
                        <span className="text-gray-500">
                          {" "}
                          - {assignment.description}
                        </span>
                      )}
                    </div>
                    {/* Hiển thị danh sách câu hỏi */}
                    {assignment.questions &&
                      assignment.questions.length > 0 && (
                        <ul className="ml-6 mt-2 list-decimal space-y-1">
                          {assignment.questions.map((question) => (
                            <li key={question.id}>
                              <span className="font-semibold">Câu hỏi:</span>{" "}
                              {question.content}
                              <div className="ml-4 text-sm text-gray-600">
                                <div>A: {question.optionA}</div>
                                <div>B: {question.optionB}</div>
                                <div>C: {question.optionC}</div>
                                <div>D: {question.optionD}</div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                  </li>
                ))}
              </ul>
            </div>
          )}
      </div>
    </div>
  );
};

export default ExamPage;
