import {
  ChartNoAxesColumn,
  SquareLibrary,
  Users,
  ListChecks,
  Menu,
} from "lucide-react";
import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import logo from "@/assets/logo.jpg";

const Sidebar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const closeSidebar = () => {
    setIsMobileOpen(false);
  };

  const navItems = (
    <nav className="space-y-2">
      <Link
        to="dashboard"
        onClick={closeSidebar}
        className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
      >
        <ChartNoAxesColumn size={24} />
        <h1 className="text-lg">Dashboard</h1>
      </Link>
      <Link
        to="course"
        onClick={closeSidebar}
        className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
      >
        <SquareLibrary size={24} />
        <h1 className="text-lg">Courses</h1>
      </Link>
      <Link
        to="course-reviews"
        onClick={closeSidebar}
        className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
      >
        <Users size={24} />
        <h1 className="text-lg">Course Reviews</h1>
      </Link>
      <Link
        to="manage-courses"
        onClick={closeSidebar}
        className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
      >
        <SquareLibrary size={24} />
        <h1 className="text-lg">Manage Courses</h1>
      </Link>
      <Link
        to="users"
        onClick={closeSidebar}
        className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
      >
        <Users size={24} />
        <h1 className="text-lg">Users</h1>
      </Link>
      <Link
        to="quiz-management"
        onClick={closeSidebar}
        className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
      >
        <ListChecks size={24} />
        <h1 className="text-lg">Quiz Management</h1>
      </Link>
    </nav>
  );

  return (
    <div className="flex min-h-screen">
      {/* Mobile Topbar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-20 flex items-center justify-between bg-white dark:bg-gray-900 px-4 py-3 shadow-md">
        <button onClick={toggleSidebar}>
          <Menu size={28} />
        </button>
        <img src={logo} alt="StudyVerse Logo" className="h-12 w-auto" />
      </div>

      {/* Sidebar for large screens */}
      <aside className="hidden lg:flex flex-col w-[250px] sm:w-[300px] bg-white dark:bg-gray-900 border-r border-gray-300 dark:border-gray-700 p-5 sticky top-0 h-screen shadow-lg">
        <div className="flex flex-col items-center justify-center mt-8 mb-8">
          <Link to="/">
            <img
              src={logo}
              alt="StudyVerse Logo"
              className="w-48 h-auto object-contain"
            />
          </Link>
        </div>
        {navItems}
      </aside>

      {/* Sidebar drawer for mobile */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-black bg-opacity-50"
          onClick={closeSidebar}
        >
          <aside
            className="absolute left-0 top-0 h-full w-64 bg-white dark:bg-gray-900 shadow-lg p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-center mb-6">
              <Link to="/">
                <img
                  src={logo}
                  alt="StudyVerse Logo"
                  className="w-40 h-auto object-contain"
                />
              </Link>
            </div>
            {navItems}
          </aside>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 pt-20 lg:pt-0 p-4 sm:p-6 md:p-10 bg-white dark:bg-gray-950 w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default Sidebar;
