import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getVocabularyLessonById, updateVocabularyLesson, deleteVocabularyLesson } from "../../../api/vocabularyLessonApi";
import { getExams } from "../../../api/examAPI";
import Header from "../../../components/Admin/Header";
import Footer from "../../../components/Admin/Footer";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AdminVocabularyLessonDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState(null);
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    thumbnail: '',
    content: '',
    examId: '',
    isPublished: false
  });

  useEffect(() => {
    Promise.all([
      getVocabularyLessonById(id),
      getExams()
    ])
    .then(([lessonData, examsData]) => {
      setLesson(lessonData);
      setExams(examsData);
      setEditForm({
        title: lessonData.title || '',
        description: lessonData.description || '',
        thumbnail: lessonData.thumbnail || '',
        content: lessonData.content || '',
        examId: lessonData.examId || '',
        isPublished: lessonData.isPublished || false
      });
    })
    .catch(setError)
    .finally(() => setLoading(false));
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditForm({
      title: lesson.title || '',
      description: lesson.description || '',
      thumbnail: lesson.thumbnail || '',
      content: lesson.content || '',
      examId: lesson.examId || '',
      isPublished: lesson.isPublished || false
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const updatedLesson = await updateVocabularyLesson(id, editForm);
      setLesson(updatedLesson);
      setIsEditing(false);
    } catch (err) {
      setError(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa bài học này? Hành động này không thể hoàn tác.")) {
      try {
        await deleteVocabularyLesson(id);
        navigate("/admin/vocabulary-lessons");
      } catch (err) {
        setError(err);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleContentChange = (content) => {
    setEditForm(prev => ({
      ...prev,
      content
    }));
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

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="text-red-600 mb-4">Lỗi: {error.message}</div>
            <Link to="/admin/vocabulary-lessons" className="text-blue-600 hover:text-blue-800">
              ← Quay lại danh sách
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!lesson) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="text-gray-600 mb-4">Không tìm thấy bài học</div>
            <Link to="/admin/vocabulary-lessons" className="text-blue-600 hover:text-blue-800">
              ← Quay lại danh sách
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <nav className="mb-4">
              <Link to="/admin/vocabulary-lessons" className="text-blue-600 hover:text-blue-800">
                ← Quay lại danh sách bài học
              </Link>
            </nav>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {isEditing ? 'Chỉnh sửa bài học' : 'Chi tiết bài học'}
                </h1>
                <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                  <span>ID: {lesson.id}</span>
                  <span>•</span>
                  <span>{lesson.viewCount || 0} lượt xem</span>
                  <span>•</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${lesson.isPublished ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {lesson.isPublished ? 'Đã xuất bản' : 'Bản nháp'}
                  </span>
                </div>
              </div>
              
              <div className="mt-4 sm:mt-0 flex space-x-3">
                {!isEditing ? (
                  <>
                    <button
                      onClick={handleEdit}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <svg className="-ml-1 mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Chỉnh sửa
                    </button>
                    <button
                      onClick={handleDelete}
                      className="inline-flex items-center px-4 py-2 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50"
                    >
                      <svg className="-ml-1 mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Xóa
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleCancelEdit}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                      disabled={saving}
                    >
                      Hủy
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                    >
                      {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-6">
              {!isEditing ? (
                // View Mode
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{lesson.title}</h2>
                    {lesson.description && (
                      <p className="text-gray-600">{lesson.description}</p>
                    )}
                  </div>

                  {lesson.thumbnail && (
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-3">Ảnh đại diện</h3>
                      <img
                        src={lesson.thumbnail}
                        alt={lesson.title}
                        className="w-full max-w-md h-64 object-cover rounded-lg shadow-sm"
                      />
                    </div>
                  )}

                  {lesson.examId && (
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Exam liên kết</h3>
                      <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                        <span className="text-blue-800">Exam ID: {lesson.examId}</span>
                      </div>
                    </div>
                  )}

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Nội dung bài học</h3>
                    <div 
                      className="prose max-w-none"
                      dangerouslySetInnerHTML={{ __html: lesson.content }}
                    />
                  </div>
                </div>
              ) : (
                // Edit Mode
                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Tiêu đề</label>
                      <input
                        type="text"
                        name="title"
                        value={editForm.title}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Exam liên kết</label>
                      <select
                        name="examId"
                        value={editForm.examId}
                        onChange={handleInputChange}
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
                      value={editForm.description}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Mô tả ngắn về bài học..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Ảnh đại diện (URL)</label>
                    <input
                      type="url"
                      name="thumbnail"
                      value={editForm.thumbnail}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      placeholder="https://example.com/image.jpg"
                    />
                    {editForm.thumbnail && (
                      <img
                        src={editForm.thumbnail}
                        alt="Preview"
                        className="mt-2 w-32 h-32 object-cover rounded-lg"
                        onError={(e) => e.target.style.display = 'none'}
                      />
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nội dung bài học</label>
                    <ReactQuill
                      theme="snow"
                      value={editForm.content}
                      onChange={handleContentChange}
                      modules={quillModules}
                      style={{ height: '400px', marginBottom: '50px' }}
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="isPublished"
                      checked={editForm.isPublished}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-900">
                      Xuất bản bài học
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminVocabularyLessonDetail;
