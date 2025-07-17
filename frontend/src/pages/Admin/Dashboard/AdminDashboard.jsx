import React from "react";
import Header from "../../../components/Admin/Header";
import Footer from "../../../components/Admin/Footer";

const AdminDashboard = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 bg-gray-100 p-6">
        <h2 className="text-3xl font-semibold mb-6">Admin Dashboard</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <p className="text-gray-600">Total Users</p>
            <h2 className="text-2xl font-bold">0</h2>
          </div>
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <p className="text-gray-600">Total Questions</p>
            <h2 className="text-2xl font-bold">0</h2>
          </div>
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <p className="text-gray-600">Total Lessons</p>
            <h2 className="text-2xl font-bold">0</h2>
          </div>
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <p className="text-gray-600">Visits</p>
            <h2 className="text-2xl font-bold">0</h2>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
