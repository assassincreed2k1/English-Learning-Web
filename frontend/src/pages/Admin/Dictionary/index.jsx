import React, { useEffect, useState } from "react";
import Header from "../../../components/Admin/Header";
import Footer from "../../../components/Admin/Footer";
import { useNavigate } from "react-router-dom";
import WordCreate from "./WordCreate";
import WordEdit from "./WordEdit";

import {
  getWords,
  createWord,
  updateWord,
  deleteWord,
} from "../../../api/dictionary";

export default function DictionaryAdmin() {
  const navigate = useNavigate();
  const [words, setWords] = useState([]);
  const [newWord, setNewWord] = useState({
    word: "",
    imageUrl: "",
    phoneticUk: "",
    phoneticUs: "",
  });
  const [editingWord, setEditingWord] = useState(null);
  // --- Thêm state cho phân trang ---
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 50;

  useEffect(() => {
    fetchWords();
  }, []);

  const fetchWords = async () => {
    try {
      const data = await getWords();
      setWords(Array.isArray(data) ? data : []);
    } catch (error) {
      setWords([]);
      console.error("Error fetching words:", error);
    }
  };

  const handleAddWord = async () => {
    if (!newWord.word) return alert("Word không được để trống");
    try {
      await createWord(newWord);
      setNewWord({ word: "", imageUrl: "", phoneticUk: "", phoneticUs: "" });
      fetchWords();
    } catch (error) {
      console.error("Error adding word:", error);
    }
  };

  const handleUpdateWord = async () => {
    if (!editingWord) return;
    try {
      await updateWord(editingWord.id, editingWord);
      setEditingWord(null);
      fetchWords();
    } catch (error) {
      console.error("Error updating word:", error);
    }
  };

  const handleDeleteWord = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xoá từ này không?")) return;
    try {
      await deleteWord(id);
      fetchWords();
    } catch (error) {
      console.error("Error deleting word:", error);
    }
  };

  // --- Tính toán dữ liệu phân trang ---
  const totalPages = Math.ceil(words.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedWords = words.slice(startIndex, startIndex + pageSize);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow container mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold mb-6">📚 Dictionary Admin</h1>

        {/* Form thêm / sửa */}
        <div className="bg-white shadow-md rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {editingWord ? "✏️ Chỉnh sửa từ" : "➕ Thêm từ mới"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => navigate("/admin/words/create")}
              className="bg-green-600 text-white px-4 py-2 rounded-lg mb-4"
            >
              ➕ Add Word
            </button>
          </div>
        </div>

        {/* Danh sách từ */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">📖 Danh sách từ</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border">ID</th>
                  <th className="px-4 py-2 border">Word</th>
                  <th className="px-4 py-2 border">Image</th>
                  <th className="px-4 py-2 border">Phonetic UK</th>
                  <th className="px-4 py-2 border">Phonetic US</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedWords.map((w) => (
                  <tr
                    key={w.id}
                    className="hover:bg-gray-50 transition duration-200"
                  >
                    <td className="px-4 py-2 border">{w.id}</td>
                    <td className="px-4 py-2 border">{w.word}</td>
                    <td className="px-4 py-2 border text-center">
                      {w.imageUrl && (
                        <img
                          src={w.imageUrl}
                          alt={w.word}
                          className="w-12 h-12 object-cover mx-auto rounded-lg"
                        />
                      )}
                    </td>
                    <td className="px-4 py-2 border">{w.phoneticUk}</td>
                    <td className="px-4 py-2 border">{w.phoneticUs}</td>
                    <td className="px-4 py-2 border space-x-2">
                      <button
                        onClick={() => navigate(`/admin/words/edit/${w.id}`)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDeleteWord(w.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700"
                      >
                        🗑 Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {paginatedWords.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center text-gray-500 py-4">
                      Không có từ nào trong từ điển.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Phân trang */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-4">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                className="px-3 py-1 rounded-lg border bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
              >
                ⬅ Prev
              </button>
              <span>
                Trang {currentPage} / {totalPages}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                className="px-3 py-1 rounded-lg border bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
              >
                Next ➡
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
