import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
const API_URL = "http://localhost:8080/api";

const getToken = () => localStorage.getItem("token");
const getAuthHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
});

const ExamDetails = () => {
  const navigate = useNavigate();
  const { examId } = useParams();
  const [questionResults, setQuestionResults] = useState([]);
  const [examDetail, setExamDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submissionDetail, setSubmissionDetail] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const timerRef = useRef();

  // Lấy đề thi
  useEffect(() => {
    setLoading(true);
    setError("");
    fetch(`${API_URL}/exams/${examId}`, {
      headers: getAuthHeaders(),
    })
      .then(async (res) => {
        if (!res.ok) throw new Error(await res.text());
        return res.json();
      })
      .then((data) => {
        setExamDetail(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Không thể tải đề thi");
        setLoading(false);
      });
  }, [examId]);

  // Reset khi đổi đề
  useEffect(() => {
    setAnswers({});
    setIsSubmitted(false);
    setSubmissionDetail(null);
    setTimeLeft(null);
    setSubmitError("");
    if (timerRef.current) clearInterval(timerRef.current);
  }, [examId]);

  // Gom tất cả câu hỏi từ các assignment
  const allQuestions =
    examDetail?.examAssignments?.flatMap((a) => a.questions || []) || [];

  // Bắt đầu đếm ngược khi có đề thi
  useEffect(() => {
    if (examDetail && examDetail.duration) {
      setTimeLeft(examDetail.duration * 60); // phút -> giây
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev === 1) {
            clearInterval(timerRef.current);
            handleSubmit();
            return 0;
          }
          return prev > 0 ? prev - 1 : 0;
        });
      }, 1000);
      return () => clearInterval(timerRef.current);
    }
  }, [examDetail]); // eslint-disable-line

  // Xử lý chọn đáp án
  const handleChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  // Xử lý nộp bài
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (isSubmitted) return;
    setIsSubmitted(true);
    setSubmitLoading(true);
    setSubmitError("");
    if (timerRef.current) clearInterval(timerRef.current);

    // Tạo mảng SubmissionAnswer gửi backend
    const submissionAnswers = allQuestions.map((q, idx) => ({
      question: { id: q.id },
      answer: answers[q.id] || "",
      orderIndex: idx + 1,
    }));

    try {
      const res = await fetch(`${API_URL}/exams/${examId}/submissions`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(submissionAnswers),
      });
      if (!res.ok) throw new Error(await res.text());
      const submission = await res.json();

      // ✅ Gọi API kết quả từng câu
      const res2 = await fetch(
        `${API_URL}/submissions/${submission.id}/results`,
        {
          headers: getAuthHeaders(),
        }
      );
      if (!res2.ok) throw new Error(await res2.text());
      const detail = await res2.json();
      setQuestionResults(detail);
      setSubmissionDetail(submission);
    } catch (err) {
      setSubmitError("Nộp bài thất bại");
    } finally {
      setSubmitLoading(false);
    }
  };

  // Hiển thị thời gian còn lại
  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  if (loading)
    return <div className="text-center py-8">Đang tải đề thi...</div>;
  if (error)
    return <div className="text-center text-red-500 py-8">{error}</div>;
  if (!examDetail) return null;

  return (
    <>
     <header className="bg-white shadow py-4 px-8 flex justify-between items-center">
        <a href="/" className="text-2xl font-bold text-blue-600">
          English Learning
        </a>
      </header>
    <div className="max-w-2xl mx-auto py-8">
      <div className="bg-white rounded-xl shadow p-8">
        <h2 className="text-2xl font-bold mb-4 text-blue-600">
          {examDetail.title}
        </h2>
        <div className="mb-4 text-gray-700">
          <span className="font-semibold">Thời gian còn lại:</span>{" "}
          {timeLeft !== null ? formatTime(timeLeft) : "N/A"}
        </div>
        {!isSubmitted ? (
          <form onSubmit={handleSubmit}>
            {allQuestions.length === 0 ? (
              <div className="text-gray-500">Không có câu hỏi nào.</div>
            ) : (
              allQuestions.map((question, idx) => (
                <div key={question.id} className="mb-6">
                  <div className="font-semibold mb-2">
                    Câu {idx + 1}: {question.content}
                  </div>
                  <div className="ml-4 space-y-1">
                    {["A", "B", "C", "D"].map((opt) => (
                      <label key={opt} className="block">
                        <input
                          type="radio"
                          name={`question_${question.id}`}
                          value={opt}
                          checked={answers[question.id] === opt}
                          onChange={() => handleChange(question.id, opt)}
                          className="mr-2"
                          required
                        />
                        {opt}: {question[`option${opt}`]}
                      </label>
                    ))}
                  </div>
                </div>
              ))
            )}
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded font-semibold hover:bg-blue-600 transition"
              disabled={submitLoading}
            >
              {submitLoading ? "Đang nộp bài..." : "Nộp bài"}
            </button>
          </form>
        ) : (
          <>
            <h3 className="text-xl font-bold mt-6 mb-2 text-green-700">
              Kết quả bài thi
            </h3>
            {submitError && (
              <div className="text-red-500 mt-4">{submitError}</div>
            )}
            {submissionDetail ? (
              <div>
                <div className="mb-2">Điểm: {submissionDetail.score}</div>
                <div className="mb-2">
                  Số câu đúng: {submissionDetail.rightAnswers}/
                  {submissionDetail.totalQuestion}
                </div>
                <div className="mb-2">
                  Tỷ lệ đúng: {submissionDetail.percentageCorrect}%
                </div>
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Kết quả từng câu hỏi:</h4>
                  <ul className="space-y-3">
                    {questionResults.map((item, idx) => (
                      <li key={item.questionId} className="p-3 rounded border">
                        <div>
                          <span className="font-semibold">Câu {idx + 1}:</span>{" "}
                          {item.content}
                        </div>
                        <div className="ml-4 text-sm space-y-1 mt-1">
                          {["A", "B", "C", "D"].map((opt) => {
                            const isCorrect = opt === item.correctAnswer;
                            const isChosen = opt === item.userAnswer;
                            const color = isCorrect
                              ? "text-green-600"
                              : isChosen
                              ? "text-red-600"
                              : "text-gray-700";

                            return (
                              <div key={opt} className={`${color}`}>
                                {opt}: {item[`option${opt}`]}
                                {isCorrect && " ✅"}
                                {isChosen && !isCorrect && " ❌"}
                              </div>
                            );
                          })}
                          <div>
                            Kết quả:{" "}
                            {item.correct ? (
                              <span className="text-green-600 font-semibold">
                                Đúng
                              </span>
                            ) : (
                              <span className="text-red-600 font-semibold">
                                Sai
                              </span>
                            )}
                          </div>
                          {item.explanation && (
                            <div className="italic text-gray-500">
                              📘 Giải thích: {item.explanation}
                            </div>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-gray-500">Đang tải kết quả...</div>
            )}
          </>
        )}
        <div className="text-center">
          <button
            onClick={() => navigate("/exams")}
            className="mt-6 bg-gray-300 text-gray-800 px-6 py-2 rounded font-semibold hover:bg-gray-400 transition"
          >
            ← Trở về danh sách đề thi
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default ExamDetails;
