import React, { useEffect, useState } from "react";
import Header from "../../components/Admin/Header";
import Footer from "../../components/Admin/Footer";
import { getAssignments } from "../../api/assignmentApi";
import { useNavigate, useParams } from "react-router-dom";
import { getExamById, updateExam } from "../../api/examAPI";

const examTypeOptions = [
  { value: "VOCABULARY", label: "Từ vựng" },
  { value: "GRAMMAR", label: "Ngữ pháp" },
  { value: "LISTENING", label: "Nghe hiểu" },
  { value: "READING", label: "Đọc hiểu" },
];

const EditExamPage = () => {
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignments, setSelectedAssignments] = useState([]);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [duration, setDuration] = useState(60);
  const [examType, setExamType] = useState("VOCABULARY");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const exam = await getExamById(id);
        setTitle(exam.title || "");
        setImage(exam.image || "");
        setDuration(exam.duration || 60);
        setExamType(exam.examType || "VOCABULARY");
        setSelectedAssignments(exam.examAssignments || []);
        const data = await getAssignments();
        setAssignments(data);
      } catch (err) {
        alert("Không thể tải dữ liệu đề thi!");
        navigate("/exam-bank");
      }
      setLoading(false);
    };
    fetchData();
    // eslint-disable-next-line
  }, [id]);

  const handleAddAssignment = (a) => {
    if (!selectedAssignments.find((item) => item.id === a.id)) {
      setSelectedAssignments([...selectedAssignments, a]);
    }
  };

  const handleRemoveAssignment = (id) => {
    setSelectedAssignments(selectedAssignments.filter((a) => a.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateExam(id, {
        title,
        image,
        duration,
        examType,
        totalAssignment: selectedAssignments.length,
        examAssignments: selectedAssignments,
      });
      alert("Đã cập nhật đề thi!");
      navigate("/exam-bank");
    } catch (err) {
      alert("Cập nhật đề thi thất bại!");
    }
  };

  if (loading) return <div>Đang tải...</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-100 p-8">
        <h1 className="text-2xl font-bold mb-4">Sửa đề thi</h1>
        <form onSubmit={handleSubmit} className="mb-6 flex items-center gap-4">
          <input
            className="border rounded p-2 w-1/4"
            placeholder="Tên đề thi"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            className="border rounded p-2 w-1/4"
            placeholder="Link ảnh (tuỳ chọn)"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <input
            className="border rounded p-2 w-1/6"
            type="number"
            min={1}
            placeholder="Thời gian (phút)"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            required
          />
          <select
            className="border rounded p-2 w-1/6"
            value={examType}
            onChange={(e) => setExamType(e.target.value)}
          >
            {examTypeOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Lưu thay đổi
          </button>
        </form>
        <div className="flex gap-8">
          {/* Danh sách bài tập */}
          <div className="w-1/2 bg-white rounded shadow p-4">
            <h2 className="font-bold mb-2">Danh sách bài tập</h2>
            <ul>
              {assignments.map((a) => (
                <li
                  key={a.id}
                  className="flex justify-between items-center border-b py-2"
                >
                  <span>{a.content}</span>
                  <button
                    className="ml-2 px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    onClick={() => handleAddAssignment(a)}
                    disabled={selectedAssignments.find(
                      (item) => item.id === a.id
                    )}
                  >
                    Thêm
                  </button>
                </li>
              ))}
            </ul>
          </div>
          {/* Bài tập đã chọn cho đề thi */}
          <div className="w-1/2 bg-white rounded shadow p-4">
            <h2 className="font-bold mb-2">Bài tập trong đề thi</h2>
            <ul>
              {selectedAssignments.map((a) => (
                <li
                  key={a.id}
                  className="flex justify-between items-center border-b py-2"
                >
                  <span>{a.content}</span>
                  <button
                    className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => handleRemoveAssignment(a.id)}
                  >
                    Xoá
                  </button>
                </li>
              ))}
              {selectedAssignments.length === 0 && (
                <li className="text-gray-500 py-2">Chưa có bài tập nào.</li>
              )}
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EditExamPage;
