import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getWordById, updateWord } from "../../../api/dictionary";

export default function WordEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [word, setWord] = useState(null);

  useEffect(() => {
    getWordById(id).then((data) => setWord(data));
  }, [id]);

  const handleSave = async () => {
    await updateWord(id, word);
    navigate("/admin/words");
  };

  if (!word) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">✏️ Chỉnh sửa từ</h1>
      <div className="grid grid-cols-1 gap-4">
        <input
          type="text"
          className="border p-2"
          value={word.word}
          onChange={(e) => setWord({ ...word, word: e.target.value })}
        />
        <input
          type="text"
          className="border p-2"
          value={word.imageUrl}
          onChange={(e) => setWord({ ...word, imageUrl: e.target.value })}
        />
        <input
          type="text"
          className="border p-2"
          value={word.phoneticUk}
          onChange={(e) => setWord({ ...word, phoneticUk: e.target.value })}
        />
        <input
          type="text"
          className="border p-2"
          value={word.phoneticUs}
          onChange={(e) => setWord({ ...word, phoneticUs: e.target.value })}
        />
      </div>
      <div className="mt-4 space-x-3">
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
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
