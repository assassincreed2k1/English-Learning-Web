import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createWord } from "../../../api/dictionary";

export default function WordCreate() {
  const navigate = useNavigate();
  const [word, setWord] = useState({
    word: "",
    imageUrl: "",
    phoneticUk: "",
    phoneticUs: "",
  });

  const handleSave = async () => {
    if (!word.word) return alert("Word không được để trống");
    await createWord(word);
    navigate("/admin/words"); // quay lại danh sách
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">➕ Thêm từ mới</h1>
      <div className="grid grid-cols-1 gap-4">
        <input
          type="text"
          placeholder="Word"
          className="border p-2"
          value={word.word}
          onChange={(e) => setWord({ ...word, word: e.target.value })}
        />
        <input
          type="text"
          placeholder="Image URL"
          className="border p-2"
          value={word.imageUrl}
          onChange={(e) => setWord({ ...word, imageUrl: e.target.value })}
        />
        <input
          type="text"
          placeholder="Phonetic UK"
          className="border p-2"
          value={word.phoneticUk}
          onChange={(e) => setWord({ ...word, phoneticUk: e.target.value })}
        />
        <input
          type="text"
          placeholder="Phonetic US"
          className="border p-2"
          value={word.phoneticUs}
          onChange={(e) => setWord({ ...word, phoneticUs: e.target.value })}
        />
      </div>
      <div className="mt-4 space-x-3">
        <button
          onClick={handleSave}
          className="bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          💾 Save
        </button>
        <button
          onClick={() => navigate("/admin/words")}
          className="bg-gray-300 px-4 py-2 rounded-lg"
        >
          ❌ Cancel
        </button>
      </div>
    </div>
  );
}
