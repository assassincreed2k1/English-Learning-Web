// import React, { useState, useEffect } from "react";
// import QuestionTable from "../components/Admin/QuestionTable";
// import QuestionFormModal from "../components/Admin/QuestionFormModal";
// import Header from "../components/Admin/Header";
// import Footer from "../components/Admin/Footer";

// const QuestionBankPage = () => {
//   const [questions, setQuestions] = useState([]);
//   const [showModal, setShowModal] = useState(false);

//   // Tạm thời dùng dữ liệu giả
//   useEffect(() => {
//     setQuestions([
//       {
//         id: 1,
//         content: "What is the capital of France?",
//         level: "Easy",
//         topic: "Geography",
//       },
//       {
//         id: 2,
//         content: "What is 5 + 7?",
//         level: "Easy",
//         topic: "Math",
//       },
//     ]);
//   }, []);

//   return (
//     <div className="p-8">
//       <Header />
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold text-gray-800">Ngân hàng câu hỏi</h1>
//         <button
//           className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
//           onClick={() => setShowModal(true)}
//         >
//           ➕ Thêm câu hỏi
//         </button>
//       </div>

//       <QuestionTable questions={questions} />
//       <QuestionFormModal show={showModal} onClose={() => setShowModal(false)} />

//       <Footer />
//     </div>
//   );
// };

// export default QuestionBankPage;
