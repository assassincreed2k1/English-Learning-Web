import axios from "axios";

const API_URL = "http://localhost:8080/api/words";
// Lấy toàn bộ words
export const getWords = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Lấy 1 word theo id
export const getWordById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Thêm 1 word mới
export const createWord = async (word) => {
  const response = await axios.post(API_URL, word);
  return response.data;
};

// Cập nhật word
export const updateWord = async (id, word) => {
  const response = await axios.put(`${API_URL}/${id}`, word);
  return response.data;
};

// Xoá word
export const deleteWord = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return true;
};
