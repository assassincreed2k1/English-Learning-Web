import React from "react";
import Header from "../../components/Admin/Header";
import Footer from "../../components/Admin/Footer";

const AdminDashboard = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 bg-gray-100 p-6">
        <h2 className="text-3xl font-semibold mb-6">Trang quản trị</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <p className="text-gray-600">Tổng người dùng</p>
            <h2 className="text-2xl font-bold">0</h2>
          </div>
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <p className="text-gray-600">Tổng câu hỏi</p>
            <h2 className="text-2xl font-bold">0</h2>
          </div>
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <p className="text-gray-600">Tổng bài học</p>
            <h2 className="text-2xl font-bold">0</h2>
          </div>
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <p className="text-gray-600">Lượt truy cập</p>
            <h2 className="text-2xl font-bold">0</h2>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
