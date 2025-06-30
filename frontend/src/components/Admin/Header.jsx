import React from "react";
import { Link } from "react-router-dom";


const Header = () => {
  return (
    <header className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <img src="/logo192.png" alt="Logo" className="w-10 h-10" />
        <Link to ="/" className="text-2xl font-bold text-gray-800 hover:text-blue-500"> English Learning</Link>
      </div>
      <nav className="space-x-6 text-gray-700 font-medium">
        <Link to="/question-bank" className="hover:text-blue-500">
          Ngân hàng câu hỏi
        </Link>
        <a href="#" className="hover:text-blue-500">
          Ngân hàng bài tập
        </a>
        <a href="#" className="hover:text-blue-500">
          Ngân hàng đề thi
        </a>
        <a href="#" className="hover:text-blue-500">
          Kho học liệu
        </a>
      </nav>
    </header>
  );
};

export default Header;
