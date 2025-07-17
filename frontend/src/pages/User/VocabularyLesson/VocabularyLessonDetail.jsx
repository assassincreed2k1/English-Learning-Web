import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getVocabularyLessonById } from "../../../api/vocabularyLessonApi";
import Header from "../../../components/Admin/Header";
import Footer from "../../../components/Admin/Footer";

const VocabularyLessonDetail = () => {
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getVocabularyLessonById(id)
      .then(setLesson)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <><Header /><div className="max-w-2xl mx-auto py-8">Loading...</div><Footer /></>;
  if (error) return <><Header /><div className="max-w-2xl mx-auto py-8 text-red-600">Error: {error.message}</div><Footer /></>;
  if (!lesson) return <><Header /><div className="max-w-2xl mx-auto py-8">Post not found.</div><Footer /></>;

  return (
    <>
      <Header />
      <div className="max-w-2xl mx-auto py-8 min-h-[60vh]">
        <Link to="/vocabulary-lessons" className="text-blue-600 hover:underline">← Back to list</Link>
        <h1 className="text-3xl font-bold mt-4 mb-2">{lesson.title}</h1>
        {lesson.image && (
          <img src={lesson.image} alt={lesson.title} className="w-full h-64 object-cover rounded mb-4" />
        )}
        <div className="prose max-w-none mb-6" dangerouslySetInnerHTML={{ __html: lesson.content }} />
        {lesson.exam && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Related Exam</h2>
            <div className="p-4 border rounded bg-gray-50">
              <div><b>ID:</b> {lesson.exam.id}</div>
              <div><b>Name:</b> {lesson.exam.title || lesson.exam.name}</div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default VocabularyLessonDetail;
