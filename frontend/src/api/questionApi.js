const API_URL = "http://localhost:8080/api/questions";

// Hàm lấy token từ localStorage
const getToken = () => localStorage.getItem("token");

// Hàm tạo headers có token
// Only multiple-choice questions are supported
const getAuthHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
});

export const getQuestions = async () => {
  const res = await fetch(API_URL, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  if (!res.ok) throw new Error("Lấy danh sách câu hỏi thất bại");
  return res.json();
};

export const addQuestion = async (data) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

export const updateQuestion = async (id, data) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Cập nhật câu hỏi thất bại");
  return res.json();
};

export const deleteQuestion = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  if (!res.ok) throw new Error("Xoá câu hỏi thất bại");
};