import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

const API_URL = "http://localhost:8080/api";
const WS_URL = "http://localhost:8080/ws";

const getToken = () => localStorage.getItem("token");
const getAuthHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
});

const ExamDetailPage = () => {
  const { id } = useParams();
  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const stompClientRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);

  // Lấy chi tiết đề thi
  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/exams/${id}`, { headers: getAuthHeaders() })
      .then(async (res) => {
        if (!res.ok) throw new Error(await res.text());
        return res.json();
      })
      .then((data) => {
        setExam(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Không thể tải chi tiết đề thi");
        setLoading(false);
      });
  }, [id]);

  // Lấy danh sách comment ban đầu
  useEffect(() => {
    fetch(`${API_URL}/exams/${id}/comments`, { headers: getAuthHeaders() })
      .then(async (res) => {
        if (!res.ok) throw new Error(await res.text());
        return res.json();
      })
      .then((data) => setComments(data))
      .catch(() => setComments([]));
  }, [id]);

  // Kết nối WebSocket để nhận comment realtime
  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS(WS_URL),
      reconnectDelay: 5000,
      onConnect: () => {
        setIsConnected(true);
        client.subscribe(`/topic/exams/${id}`, (message) => {
          const newComment = JSON.parse(message.body);
          setComments((prev) => [...prev, newComment]);
        });
      },
      onDisconnect: () => setIsConnected(false),
      onStompError: () => setIsConnected(false),
      onWebSocketError: () => setIsConnected(false),
    });

    stompClientRef.current = client;
    client.activate();

    return () => {
      if (stompClientRef.current) {
        stompClientRef.current.deactivate();
        stompClientRef.current = null;
      }
      setIsConnected(false);
    };
  }, [id]);

  // Gửi comment qua REST, nhận realtime qua WebSocket
  const handleSendComment = async () => {
    const text = commentInput.trim();
    if (!text) return;
    try {
      await fetch(`${API_URL}/exams/${id}/comments`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ content: text }),
      });
      setCommentInput("");
    } catch (error) {
      // Có thể hiển thị lỗi nếu muốn
    }
  };

  if (loading)
    return <div className="text-center py-8">Đang tải chi tiết đề thi...</div>;
  if (error)
    return <div className="text-center text-red-500 py-8">{error}</div>;
  if (!exam) return null;

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="bg-white rounded-xl shadow p-8">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">{exam.title}</h2>
        {exam.image && (
          <img
            src={exam.image}
            alt={exam.title}
            className="w-40 h-40 object-cover rounded mb-4 mx-auto"
          />
        )}

        {/* Thông tin đề thi */}
        <div className="mb-2 text-gray-700">
          <span className="font-semibold">Mô tả:</span> {exam.description}
        </div>
        <div className="mb-2 text-gray-700">
          <span className="font-semibold">Thời gian:</span> {exam.duration} phút
        </div>
        <div className="mb-2 text-gray-700">
          <span className="font-semibold">Tổng số bài tập:</span>{" "}
          {exam.totalAssignment}
        </div>
        <div className="mb-2 text-gray-700">
          <span className="font-semibold">Tổng số câu hỏi:</span>{" "}
          {exam.totalQuestions}
        </div>
        <div className="mb-2 text-gray-700">
          <span className="font-semibold">Điểm đạt:</span> {exam.passingScore}
        </div>
        <div className="mb-2 text-gray-700">
          <span className="font-semibold">Loại đề thi:</span> {exam.examType}
        </div>
        <div className="mb-2 text-gray-700">
          <span className="font-semibold">Độ khó:</span> {exam.difficulty}
        </div>

        {/* Danh sách bài tập */}
        {exam.examAssignments?.length > 0 && (
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Danh sách bài tập:</h3>
            <ul className="list-disc list-inside space-y-3">
              {exam.examAssignments.map((assignment) => (
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
                  {assignment.questions?.length > 0 && (
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
                            <div>
                              <span className="font-semibold text-green-700">
                                Đáp án đúng:
                              </span>{" "}
                              {question.correctAnswer}
                            </div>
                            {question.explanation && (
                              <div>
                                <span className="font-semibold">
                                  Giải thích:
                                </span>{" "}
                                {question.explanation}
                              </div>
                            )}
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

        {/* Comment realtime */}
        <div className="mt-8">
          <h3 className="font-semibold mb-2">
            Bình luận về đề thi
            <span
              className={`ml-2 text-xs px-2 py-1 rounded ${
                isConnected
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
            </span>
          </h3>
          <div className="mb-2 max-h-48 overflow-y-auto border rounded p-2 bg-gray-50">
            {comments.length === 0 && (
              <div className="text-gray-400 text-sm">
                Chưa có bình luận nào.
              </div>
            )}
            {comments.map((c, idx) => (
              <div key={idx} className="mb-2">
                <span className="font-semibold text-blue-700">
                  {c.user?.username || "Ẩn danh"}:
                </span>{" "}
                {c.content}
                {c.createdAt && (
                  <span className="text-xs text-gray-400 ml-2">
                    {new Date(c.createdAt).toLocaleTimeString()}
                  </span>
                )}
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-2">
            <input
              type="text"
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              className="flex-1 border rounded px-2 py-1"
              placeholder="Nhập bình luận..."
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSendComment();
              }}
              disabled={!isConnected}
            />
            <button
              onClick={handleSendComment}
              disabled={!isConnected || !commentInput.trim()}
              className={`px-4 py-1 rounded transition ${
                isConnected && commentInput.trim()
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Gửi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamDetailPage;
