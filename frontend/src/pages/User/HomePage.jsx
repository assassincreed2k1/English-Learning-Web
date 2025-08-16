import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProfile } from "../../api/userSlice";
const HomePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);
  const profile = useSelector((state) => state.user.profile);
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow py-4 px-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">English Learning</h1>
        <nav>
          <nav>
            {profile ? (
              <>
                <span className="text-gray-700 font-medium mr-4">
                  Xin chào, {profile.username}
                </span>
                {profile.role === "ADMIN" && (
                  <Link
                    to="/admin"
                    className="bg-yellow-500 text-white px-4 py-2 rounded mr-2 hover:bg-yellow-600"
                  >
                    Admin
                  </Link>
                )}
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-blue-600 hover:underline mr-4"
                >
                  Đăng nhập
                </Link>
                <Link to="/register" className="text-blue-500 hover:underline">
                  Đăng ký
                </Link>
              </>
            )}
          </nav>
        </nav>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow p-8 max-w-2xl w-full text-center">
          <h2 className="text-3xl font-extrabold text-blue-600 mb-4">
            Chào mừng đến với English Learning!
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Website luyện thi tiếng Anh trực tuyến với ngân hàng câu hỏi phong
            phú, giao diện thân thiện và nhiều tính năng hỗ trợ học tập hiệu
            quả.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/exams"
              className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-green-600 transition"
            >
              Luyện tập ngay
            </Link>
          </div>
        </div>
      </main>
      <footer className="text-center py-4 text-gray-500">
        © {new Date().getFullYear()} English Learning. All rights reserved.
      </footer>
    </div>
  );
};
export default HomePage;
