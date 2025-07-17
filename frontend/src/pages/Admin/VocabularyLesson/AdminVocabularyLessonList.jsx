import React, { useEffect, useState } from "react";
import { getVocabularyLessons, deleteVocabularyLesson } from "../../../api/vocabularyLessonApi";
import { Link } from "react-router-dom";
import Header from "../../../components/Admin/Header";
import Footer from "../../../components/Admin/Footer";

const AdminVocabularyLessonList = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    if (window.confirm("Are you sure you want to delete this vocabulary post?")) {
      await deleteVocabularyLesson(id);
      fetchLessons();
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto py-8 min-h-[60vh]">
        <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">Vocabulary Post Management</h1>
      <Link to="/admin/vocabulary-lessons/create" className="px-4 py-2 bg-blue-600 text-white rounded">Add New</Link>
        </div>
        {loading && <div>Loading...</div>}
        {error && <div className="text-red-600">Error: {error.message}</div>}
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">ID</th>
              <th className="p-2">Title</th>
              <th className="p-2">Image</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {lessons.map((lesson) => (
              <tr key={lesson.id} className="border-t">
                <td className="p-2">{lesson.id}</td>
                <td className="p-2">{lesson.title}</td>
                <td className="p-2">
                  {lesson.image && <img src={lesson.image} alt="img" className="w-16 h-16 object-cover rounded" />}
                </td>
                <td className="p-2 flex gap-2">
                  <Link to={`/admin/vocabulary-lessons/edit/${lesson.id}`} className="text-blue-600">Edit</Link>
                  <button onClick={() => handleDelete(lesson.id)} className="text-red-600">Delete</button>
                  <Link to={`/vocabulary-lessons/${lesson.id}`} className="text-green-600">View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default AdminVocabularyLessonList;
