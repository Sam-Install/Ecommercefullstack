import React from "react";
import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Sidebar */}
      <div className="w-full sm:w-1/2 bg-white shadow-md p-4">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>
        <ul className="space-y-3">
          <li>
            <Link
              to="/admin/show/"
              className="block p-2 rounded-lg hover:bg-gray-200 transition"
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              to="contacts"
              className="block p-2 rounded-lg hover:bg-gray-200 transition"
            >
              Contacts
            </Link>
          </li>
          <li>
            <Link
              to="/admin/showB"
              className="block p-2 rounded-lg hover:bg-gray-200 transition"
            >
              Bestsellers
            </Link>
          </li>
          <li>
            <Link
              to="/admin/showL"
              className="block p-2 rounded-lg hover:bg-gray-200 transition"
            >
              Latest Collection
            </Link>
          </li>
        </ul>
      </div>

      {/* Right Workspace */}
      <div className="flex-1 bg-gray-50 p-6">
        <Outlet /> {/* 👈 This will show the selected page */}
      </div>
    </div>
  );
};

export default Dashboard;
