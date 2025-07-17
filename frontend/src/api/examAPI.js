const API_URL = "http://localhost:8080/api/exams";

// Hàm lấy token từ localStorage
const getToken = () => localStorage.getItem("token");

// Hàm tạo headers có token
const getAuthHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
});

export const getExams = async () => {
  const res = await fetch(API_URL, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  if (!res.ok) throw new Error("Không thể tải danh sách đề thi");
  return res.json();
};

export const addExam = async (data) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Tạo đề thi thất bại");
  return res.json();
};

export const deleteExam = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  if (!res.ok) throw new Error("Xoá đề thi thất bại");
};

export const updateExam = async (id, data) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Cập nhật đề thi thất bại");
  return res.json();
};

export const getExamById = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  if (!res.ok) throw new Error("Không tìm thấy đề thi");
  return res.json();
};
