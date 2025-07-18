import React, { useEffect, useState } from "react";
import { getVocabularyLessons, deleteVocabularyLesson } from "../../../api/vocabularyLessonApi";
import { Link } from "react-router-dom";
import Header from "../../../components/Admin/Header";
import Footer from "../../../components/Admin/Footer";

const AdminVocabularyLessonList = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchLessons = () => {
    setLoading(true);
    getVocabularyLessons()
      .then(setLessons)
      .catch(setError)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchLessons();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa bài học này?")) {
      try {
        await deleteVocabularyLesson(id);
        fetchLessons();
      } catch (err) {
        setError(err);
      }
    }
  };

  const filteredLessons = lessons.filter(lesson =>
    lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (lesson.description && lesson.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getStatusBadge = (isPublished) => {
    return isPublished ? (
      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
        Đã xuất bản
      </span>
    ) : (
      <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
        Bản nháp
      </span>
    );
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Quản lý Bài học Từ vựng</h1>
                <p className="mt-2 text-sm text-gray-600">
                  Quản lý và tổ chức các bài học từ vựng của bạn
                </p>
              </div>
              <div className="mt-4 sm:mt-0">
                <Link
                  to="/admin/vocabulary-lessons/create"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Tạo bài học mới
                </Link>
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="mb-6">
            <div className="max-w-md">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Tìm kiếm bài học..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
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

          {!loading && !error && (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              {filteredLessons.length === 0 ? (
                <div className="text-center py-12">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">Không có bài học nào</h3>
                  <p className="mt-1 text-sm text-gray-500">Hãy tạo bài học đầu tiên của bạn</p>
                  <div className="mt-6">
                    <Link
                      to="/admin/vocabulary-lessons/create"
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    >
                      <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Tạo bài học mới
                    </Link>
                  </div>
                </div>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {filteredLessons.map((lesson) => (
                    <li key={lesson.id}>
                      <div className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center min-w-0 flex-1">
                            {lesson.thumbnail && (
                              <div className="flex-shrink-0">
                                <img
                                  className="h-16 w-16 rounded-lg object-cover"
                                  src={lesson.thumbnail}
                                  alt={lesson.title}
                                />
                              </div>
                            )}
                            <div className={`min-w-0 flex-1 ${lesson.thumbnail ? 'ml-4' : ''}`}>
                              <div className="flex items-center justify-between">
                                <div className="min-w-0 flex-1">
                                  <Link to={`/admin/vocabulary-lessons/details/${lesson.id}`} className="block focus:outline-none">
                                    <p className="text-lg font-medium text-blue-600 hover:text-blue-500 truncate">
                                      {lesson.title}
                                    </p>
                                  </Link>
                                  {lesson.description && (
                                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                      {lesson.description}
                                    </p>
                                  )}
                                  <div className="mt-2 flex items-center text-sm text-gray-500">
                                    <span>ID: {lesson.id}</span>
                                    {lesson.examId && (
                                      <>
                                        <span className="mx-2">•</span>
                                        <span>Exam ID: {lesson.examId}</span>
                                      </>
                                    )}
                                    <span className="mx-2">•</span>
                                    <span>{lesson.viewCount || 0} lượt xem</span>
                                  </div>
                                </div>
                                <div className="ml-4 flex-shrink-0 flex items-center space-x-2">
                                  {getStatusBadge(lesson.isPublished)}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="ml-4 flex-shrink-0 flex items-center space-x-2">
                            <Link
                              to={`/admin/vocabulary-lessons/details/${lesson.id}`}
                              className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                              Xem chi tiết
                            </Link>
                            <button
                              onClick={() => handleDelete(lesson.id)}
                              className="inline-flex items-center px-3 py-1 border border-red-300 shadow-sm text-sm leading-4 font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                              Xóa
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminVocabularyLessonList;
