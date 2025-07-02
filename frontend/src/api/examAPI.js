const API_URL = "http://localhost:8080/api/exams";

export const getExams = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Không thể tải danh sách đề thi");
  return res.json();
};

export const addExam = async (data) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Tạo đề thi thất bại");
  return res.json();
};

export const deleteExam = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Xoá đề thi thất bại");
};

export const updateExam = async (id, data) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Cập nhật đề thi thất bại");
  return res.json();
};

export const getExamById = async (id) => {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Không tìm thấy đề thi");
  return res.json();
};