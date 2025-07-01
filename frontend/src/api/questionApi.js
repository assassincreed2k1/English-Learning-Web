const API_URL = "http://localhost:8080/api/questions";

export const getQuestions = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Lấy danh sách câu hỏi thất bại");
  return res.json();
};

export const addQuestion = async (data) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

export const updateQuestion = async (id, data) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Cập nhật câu hỏi thất bại");
  return res.json();
};

export const deleteQuestion = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Xoá câu hỏi thất bại");
};
