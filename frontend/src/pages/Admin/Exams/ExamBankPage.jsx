import React, { useEffect, useState } from "react";
import Header from "../../../components/Admin/Header";
import Footer from "../../../components/Admin/Footer";
import { useNavigate } from "react-router-dom";
import { getExams, deleteExam } from "../../../api/examAPI";

const ExamBankPage = () => {
  const [exams, setExams] = useState([]);
  const [filteredExams, setFilteredExams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchExams();
    // eslint-disable-next-line
  }, []);

  const fetchExams = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getExams();
      setExams(data);
      setFilteredExams(data);
    } catch (err) {
      setError("Cannot load exam list");
    }
    setLoading(false);
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term.trim() === "") {
      setFilteredExams(exams);
    } else {
      const filtered = exams.filter(
        (exam) =>
          exam.title.toLowerCase().includes(term.toLowerCase()) ||
          exam.description?.toLowerCase().includes(term.toLowerCase()) ||
          exam.examType?.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredExams(filtered);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        await deleteExam(id);
        const updatedExams = exams.filter((ex) => ex.id !== id);
        setExams(updatedExams);
        setFilteredExams(updatedExams);
      } catch (err) {
        alert("Delete failed!");
      }
    }
  };

  const handleViewDetails = (id) => {
    navigate(`/admin/exam-details/${id}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-100 p-8">
        <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Exam Bank</h1>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            onClick={() => navigate("/admin/exam-bank/create")}
          >
            ➕ Add Exam
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search exam by name, description, type..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          {error && <div className="text-red-500 mb-2">{error}</div>}
          {loading ? (
            <div>Đang tải...</div>
          ) : (
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 text-left">#</th>
                  <th className="p-2 text-left">Exam Name</th>
                  <th className="p-2 text-left">Description</th>
                  <th className="p-2 text-left">Type</th>
                  <th className="p-2 text-left">Difficulty</th>
                  <th className="p-2 text-left">Duration (min)</th>
                  <th className="p-2 text-left">Passing Score</th>
                  <th className="p-2 text-left">Assignments</th>
                  <th className="p-2 text-left">Status</th>
                  <th className="p-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredExams.map((ex, idx) => (
                  <tr key={ex.id} className="border-b">
                    <td className="p-2">{idx + 1}</td>
                    <td className="p-2 font-medium">{ex.title}</td>
                    <td className="p-2 text-sm text-gray-600">
                      {ex.description ? 
                        (ex.description.length > 50 ? 
                          ex.description.substring(0, 50) + "..." : 
                          ex.description) : 
                        "No description"}
                    </td>
                    <td className="p-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                        {ex.examType}
                      </span>
                    </td>
                    <td className="p-2">
                      <span className={`px-2 py-1 rounded text-sm ${
                        ex.difficulty === 'BEGINNER' ? 'bg-green-100 text-green-800' :
                        ex.difficulty === 'INTERMEDIATE' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {ex.difficulty}
                      </span>
                    </td>
                    <td className="p-2">{ex.duration}</td>
                    <td className="p-2">{ex.passingScore || 60}</td>
                    <td className="p-2">
                      {ex.examAssignments ? ex.examAssignments.length : 0}
                    </td>
                    <td className="p-2">
                      <span className={`px-2 py-1 rounded text-sm ${
                        ex.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {ex.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="p-2 space-x-2">
                      <button
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={() => handleViewDetails(ex.id)}
                      >
                        Details
                      </button>
                      <button
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        onClick={() => handleDelete(ex.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredExams.length === 0 && (
                  <tr>
                    <td colSpan={10} className="text-center py-4 text-gray-500">
                      {searchTerm ? "No matching exams found." : "No exams yet."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ExamBankPage;
