import React, { useEffect, useState } from "react";
import { addVocabularyLesson, getVocabularyLessonById, updateVocabularyLesson } from "../../../api/vocabularyLessonApi";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../../components/Admin/Header";
import Footer from "../../../components/Admin/Footer";

const AdminVocabularyLessonForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [form, setForm] = useState({ title: "", image: "", content: "", exam: null });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isEdit) {
      setLoading(true);
      getVocabularyLessonById(id)
        .then((data) => setForm({
          title: data.title || "",
          image: data.image || "",
          content: data.content || "",
          exam: data.exam ? data.exam.id : null,
        }))
        .catch(setError)
        .finally(() => setLoading(false));
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { ...form, exam: form.exam ? { id: form.exam } : null };
      if (isEdit) {
        await updateVocabularyLesson(id, payload);
      } else {
        await addVocabularyLesson(payload);
      }
      navigate("/admin/vocabulary-lessons");
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-xl mx-auto py-8 min-h-[60vh]">
        <h1 className="text-2xl font-bold mb-4">{isEdit ? "Edit" : "Add"} Vocabulary Post</h1>
        {error && <div className="text-red-600 mb-2">Error: {error.message}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold">Title</label>
            <input name="title" value={form.title} onChange={handleChange} className="w-full border p-2 rounded" required />
          </div>
          <div>
            <label className="block font-semibold">Image (URL)</label>
            <input name="image" value={form.image} onChange={handleChange} className="w-full border p-2 rounded" />
          </div>
          <div>
            <label className="block font-semibold">Content (HTML or text)</label>
            <textarea name="content" value={form.content} onChange={handleChange} className="w-full border p-2 rounded min-h-[120px]" required />
          </div>
          <div>
            <label className="block font-semibold">Linked Exam (ID)</label>
            <input name="exam" value={form.exam || ""} onChange={handleChange} className="w-full border p-2 rounded" type="number" />
          </div>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded" disabled={loading}>
          {loading ? "Saving..." : isEdit ? "Update" : "Create"}
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default AdminVocabularyLessonForm;
