import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/Admin/Header";
import Footer from "../../../components/Admin/Footer";
import { getAssignments, deleteAssignment, searchAssignments } from "../../../api/assignmentApi";

const ExerciseBankPage = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      setLoading(true);
      const data = await getAssignments();
      setAssignments(data);
    } catch (error) {
      console.error("Error fetching assignments:", error);
      alert("Lỗi khi tải danh sách bài tập!");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (searchKeyword.trim()) {
      try {
        const data = await searchAssignments(searchKeyword);
        setAssignments(data);
      } catch (error) {
        console.error("Error searching assignments:", error);
        alert("Lỗi khi tìm kiếm bài tập!");
      }
    } else {
      fetchAssignments();
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa bài tập này?")) {
      try {
        await deleteAssignment(id);
        fetchAssignments();
        alert("Đã xóa bài tập thành công!");
      } catch (error) {
        console.error("Error deleting assignment:", error);
        alert("Lỗi khi xóa bài tập!");
      }
    }
  };

  const getTypeDisplayName = (type) => {
    const typeMap = {
      VOCABULARY: "Vocabulary",
      GRAMMAR: "Grammar",
      PRONUNCIATION: "Pronunciation",
      LISTENING: "Listening Comprehension",
      READING: "Reading Comprehension",
      MIXED: "Mixed"
    };
    return typeMap[type] || type;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 bg-gray-100 p-8">
          <div className="text-center">Loading...</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-100 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Exercise Bank</h1>
          <button
            onClick={() => navigate("/admin/exercises/create")}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Create New Exercise
          </button>
        </div>

        {/* Search Section */}
        <div className="mb-6 flex gap-4">
          <input
            type="text"
            placeholder="Search exercises..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button
            onClick={handleSearch}
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Search
          </button>
          <button
            onClick={fetchAssignments}
            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Refresh
          </button>
        </div>

        {/* Assignment Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Exercise Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Number of Questions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {assignments.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                    No exercises found
                  </td>
                </tr>
              ) : (
                assignments.map((assignment) => (
                  <tr key={assignment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {assignment.content}
                      </div>
                      {assignment.description && (
                        <div className="text-sm text-gray-500">
                          {assignment.description}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {getTypeDisplayName(assignment.type)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {assignment.questions ? assignment.questions.length : 0} questions
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {assignment.timeLimit ? `${assignment.timeLimit} min` : "Unlimited"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => navigate(`/admin/assignments/${assignment.id}`)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => handleDelete(assignment.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ExerciseBankPage;
