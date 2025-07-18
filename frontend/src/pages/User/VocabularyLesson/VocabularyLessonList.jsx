import React, { useEffect, useState } from "react";
import { getVocabularyLessons } from "../../../api/vocabularyLessonApi";
import { getExamById } from "../../../api/examAPI";
import { Link } from "react-router-dom";
import Header from "../../../components/Admin/Header";
import Footer from "../../../components/Admin/Footer";

const VocabularyLessonList = () => {
  const [lessons, setLessons] = useState([]);
  const [exams, setExams] = useState({}); // Store exams by examId
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allLessons = await getVocabularyLessons();
        const publishedLessons = allLessons.filter(lesson => lesson.isPublished);
        setLessons(publishedLessons);

        // Fetch exam data for lessons that have examId
        const examPromises = [];
        const examIds = new Set();
        
        publishedLessons.forEach(lesson => {
          if (lesson.examId && !examIds.has(lesson.examId)) {
            examIds.add(lesson.examId);
            examPromises.push(
              getExamById(lesson.examId)
                .then(exam => ({ id: lesson.examId, exam }))
                .catch(error => ({ id: lesson.examId, exam: null, error }))
            );
          }
        });

        if (examPromises.length > 0) {
          const examResults = await Promise.all(examPromises);
          const examsMap = {};
          examResults.forEach(result => {
            if (result.exam) {
              examsMap[result.id] = result.exam;
            }
          });
          setExams(examsMap);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredLessons = lessons.filter(lesson =>
    lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (lesson.description && lesson.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const stripHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Bài học Từ vựng
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Khám phá những bài học từ vựng thú vị và nâng cao vốn từ vựng tiếng Anh của bạn
            </p>
          </div>

          {/* Search */}
          <div className="max-w-md mx-auto mb-12">
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
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-full leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg"
              />
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="max-w-md mx-auto">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex">
                  <svg className="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">Lỗi: {error.message}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Content */}
          {!loading && !error && (
            <>
              {filteredLessons.length === 0 ? (
                <div className="text-center py-20">
                  <svg className="mx-auto h-24 w-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">Không có bài học nào</h3>
                  <p className="mt-2 text-gray-500">
                    {searchTerm ? "Không tìm thấy bài học phù hợp" : "Chưa có bài học được xuất bản"}
                  </p>
                </div>
              ) : (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {filteredLessons.map((lesson) => (
                    <Link
                      key={lesson.id}
                      to={`/vocabulary-lessons/${lesson.id}`}
                      className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                    >
                      {/* Thumbnail */}
                      <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600 overflow-hidden">
                        {lesson.thumbnail ? (
                          <img
                            src={lesson.thumbnail}
                            alt={lesson.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <svg className="h-16 w-16 text-white opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300"></div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                          {lesson.title}
                        </h3>
                        
                        {lesson.description && (
                          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                            {lesson.description}
                          </p>
                        )}

                        {/* Preview content */}
                        {lesson.content && (
                          <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                            {stripHtml(lesson.content).slice(0, 100)}...
                          </p>
                        )}

                        {/* Footer */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <div className="flex items-center">
                              <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                              <span>{lesson.viewCount || 0} lượt xem</span>
                            </div>
                            
                            <div className="text-blue-600 font-medium group-hover:text-blue-800 transition-colors duration-200">
                              Đọc thêm →
                            </div>
                          </div>

                          {/* Exam Link */}
                          {lesson.examId && exams[lesson.examId] && (
                            <div className="pt-2 border-t border-gray-100">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center text-sm text-green-600">
                                  <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  <span>Có bài kiểm tra</span>
                                </div>
                                <Link
                                  to={`/exams/${lesson.examId}`}
                                  onClick={(e) => e.stopPropagation()}
                                  className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors duration-200"
                                >
                                  Làm bài test
                                </Link>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default VocabularyLessonList;
