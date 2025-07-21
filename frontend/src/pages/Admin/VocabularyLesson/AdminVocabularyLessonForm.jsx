import React, { useEffect, useState } from "react";
import { addVocabularyLesson } from "../../../api/vocabularyLessonApi";
import { getExams } from "../../../api/examAPI";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/Admin/Header";
import Footer from "../../../components/Admin/Footer";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AdminVocabularyLessonForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    thumbnail: "",
    content: "",
    examId: "",
    isPublished: false
  });
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getExams()
      .then(setExams)
      .catch(setError);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleContentChange = (content) => {
    setForm(prev => ({
      ...prev,
      content
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addVocabularyLesson(form);
      navigate("/admin/vocabulary-lessons");
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'align': [] }],
      ['link', 'image', 'video'],
      ['clean']
    ]
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <nav className="mb-4">
              <button
                onClick={() => navigate("/admin/vocabulary-lessons")}
                className="text-blue-600 hover:text-blue-800"
              >
                ← Quay lại danh sách bài học
              </button>
            </nav>
            <h1 className="text-3xl font-bold text-gray-900">Tạo bài học mới</h1>
            <p className="mt-2 text-sm text-gray-600">
              Tạo một bài học từ vựng mới với nội dung phong phú
            </p>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex">
                <svg className="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <div className="ml-3">
                  <p className="text-sm text-red-700">Lỗi: {error.message}</p>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white shadow rounded-lg">
            <form onSubmit={handleSubmit} className="px-6 py-6 space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Tiêu đề <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Nhập tiêu đề bài học..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Exam liên kết</label>
                  <select
                    name="examId"
                    value={form.examId}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Không chọn exam</option>
                    {exams.map(exam => (
                      <option key={exam.id} value={exam.id}>
                        {exam.title} (ID: {exam.id})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Mô tả ngắn</label>
                <textarea
                  name="description"
                  rows={3}
                  value={form.description}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Mô tả ngắn về bài học..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Ảnh đại diện (URL)</label>
                <input
                  type="url"
                  name="thumbnail"
                  value={form.thumbnail}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://example.com/image.jpg"
                />
                {form.thumbnail && (
                  <img
                    src={form.thumbnail}
                    alt="Preview"
                    className="mt-2 w-32 h-32 object-cover rounded-lg"
                    onError={(e) => e.target.style.display = 'none'}
                  />
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nội dung bài học <span className="text-red-500">*</span>
                </label>
                <ReactQuill
                  theme="snow"
                  value={form.content}
                  onChange={handleContentChange}
                  modules={quillModules}
                  style={{ height: '400px', marginBottom: '50px' }}
                  placeholder="Nhập nội dung bài học..."
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isPublished"
                  checked={form.isPublished}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  Xuất bản bài học ngay
                </label>
              </div>

              <div className="flex justify-end space-x-3 pt-6 border-t">
                <button
                  type="button"
                  onClick={() => navigate("/admin/vocabulary-lessons")}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  disabled={loading}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? 'Đang tạo...' : 'Tạo bài học'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminVocabularyLessonForm;
