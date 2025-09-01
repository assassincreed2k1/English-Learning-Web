import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <img src="/logo192.png" alt="Logo" className="w-10 h-10" />
        <Link
          to="/"
          className="text-2xl font-bold text-gray-800 hover:text-blue-500"
        >
          {" "}
          English Learning
        </Link>
      </div>
      <nav className="space-x-6 text-gray-700 font-medium">
        <Link to="/admin/question-bank" className="hover:text-blue-500">
          Question Bank
        </Link>
        <Link to="/admin/exercise-bank" className="hover:text-blue-500">
          Exercise Bank
        </Link>
        <Link to="/admin/exam-bank" className="hover:text-blue-500">
          Exam Bank
        </Link>
        <Link to="/admin/vocabulary-lessons" className="hover:text-blue-500">
          Vocabulary Posts
        </Link>
        <Link to="/admin/words" className="hover:text-blue-500">
          Dictionary
        </Link>
        <Link to="/admin/vocabulary-lessons" className="hover:text-blue-500">
          Vocabulary
        </Link>
      </nav>
    </header>
  );
};

export default Header;
