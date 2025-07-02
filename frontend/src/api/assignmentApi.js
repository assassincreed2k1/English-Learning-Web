const API_URL = "http://localhost:8080/api/assignments";

export const getAssignments = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Lấy danh sách bài tập thất bại");
  return res.json();
};

export const addAssignment = async (data) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

export const updateAssignment = async (id, data) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

export const deleteAssignment = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Xoá bài tập thất bại");
};
