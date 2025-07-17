import React, { useEffect, useState } from "react";
import { getVocabularyLessons } from "../../../api/vocabularyLessonApi";
import { Link } from "react-router-dom";
import Header from "../../../components/Admin/Header";
import Footer from "../../../components/Admin/Footer";

const VocabularyLessonList = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getVocabularyLessons()
      .then(setLessons)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Header />
      <div className="max-w-3xl mx-auto py-8 min-h-[60vh]">
        <h1 className="text-2xl font-bold mb-6">Vocabulary Post List</h1>
        {loading && <div>Loading...</div>}
        {error && <div className="text-red-600">Error: {error.message}</div>}
        <div className="grid gap-6">
          {lessons.map((lesson) => (
            <Link
              to={`/vocabulary-lessons/${lesson.id}`}
              key={lesson.id}
              className="block border rounded-lg p-4 hover:shadow-lg bg-white"
            >
              <div className="flex items-center gap-4">
                {lesson.image && (
                  <img
                    src={lesson.image}
                    alt={lesson.title}
                    className="w-24 h-24 object-cover rounded"
                  />
                )}
                <div>
                  <h2 className="text-lg font-semibold">{lesson.title}</h2>
                  <div className="text-gray-500 line-clamp-2">
                    {lesson.content?.slice(0, 100)}...
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default VocabularyLessonList;
