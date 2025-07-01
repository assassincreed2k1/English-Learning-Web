import React, { useState, useEffect } from "react";

const defaultData = {
  content: "",
  optionA: "",
  optionB: "",
  optionC: "",
  optionD: "",
  correctAnswer: "A",
  questionType: "CHOICE_QUESTION",
};

const QuestionFormModal = ({ show, onClose, onSubmit, initialData }) => {
  const [form, setForm] = useState(defaultData);

  useEffect(() => {
    if (initialData) setForm(initialData);
    else setForm(defaultData);
  }, [initialData, show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">
          {initialData ? "Sửa câu hỏi" : "Thêm câu hỏi"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Nội dung</label>
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label>Đáp án A</label>
              <input
                name="optionA"
                value={form.optionA}
                onChange={handleChange}
                className="w-full border rounded p-2"
                required
              />
            </div>
            <div>
              <label>Đáp án B</label>
              <input
                name="optionB"
                value={form.optionB}
                onChange={handleChange}
                className="w-full border rounded p-2"
                required
              />
            </div>
            <div>
              <label>Đáp án C</label>
              <input
                name="optionC"
                value={form.optionC}
                onChange={handleChange}
                className="w-full border rounded p-2"
                required
              />
            </div>
            <div>
              <label>Đáp án D</label>
              <input
                name="optionD"
                value={form.optionD}
                onChange={handleChange}
                className="w-full border rounded p-2"
                required
              />
            </div>
          </div>
          <div>
            <label className="block font-medium">Đáp án đúng</label>
            <select
              name="correctAnswer"
              value={form.correctAnswer}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            >
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
          </div>
          <div>
            <label className="block font-medium">Loại câu hỏi</label>
            <select
              name="questionType"
              value={form.questionType}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            >
              <option value="ESSAY_QUESTION">Tự luận</option>
              <option value="TF_QUESTION">Đúng/Sai</option>
              <option value="CHOICE_QUESTION">Trắc nghiệm</option>
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
            >
              Huỷ
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
            >
              {initialData ? "Cập nhật" : "Thêm"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuestionFormModal;
