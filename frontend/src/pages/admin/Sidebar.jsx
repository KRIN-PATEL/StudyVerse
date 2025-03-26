
// import { ChartNoAxesColumn, SquareLibrary } from "lucide-react";
// import React from "react";
// import { Link, Outlet } from "react-router-dom";

// const Sidebar = () => {
//   return (
//     <div className="flex">
//       <div className="hidden lg:block w-[250px] sm:w-[300px] space-y-8 border-r border-gray-300 dark:border-gray-700 mt-20  p-5 sticky top-0  h-screen">
//         <div className="space-y-4 ">
//           <Link to="dashboard" className="flex items-center gap-2">
//             <ChartNoAxesColumn size={22} />
//             <h1>Dashboard</h1>
//           </Link>
//           <Link to="course" className="flex items-center gap-2">
//             <SquareLibrary size={22} />
//             <h1>Courses</h1>
//           </Link>
//         </div>
//       </div>
//     <div className="flex-1 p-10 ">
//         <Outlet/>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;




import { ChartNoAxesColumn, SquareLibrary, Users } from "lucide-react";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import logo from "@/assets/logo.jpg";

const Sidebar = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="hidden lg:flex flex-col w-[250px] sm:w-[300px] border-r border-gray-300 dark:border-gray-700 p-5 sticky top-0 h-screen bg-white dark:bg-gray-900 shadow-lg">
        {/* Logo Section */}
        <div className="flex flex-col items-center justify-center mt-7">
          <img
            src={logo}
            alt="StudyVerse Logo"
            className="h-100 w-100 object-contain"
          />
          {/* <h1 className="text-xl font-bold mt-2 text-gray-800 dark:text-white">
            StudyVerse
          </h1> */}
        </div>

        {/* Navigation Links */}
        <div className="space-y-2">
          <Link
            to="dashboard"
            className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            <ChartNoAxesColumn size={24} />
            <h1 className="text-lg">Dashboard</h1>
          </Link>
          <Link
            to="course"
            className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            <SquareLibrary size={24} />
            <h1 className="text-lg">Courses</h1>
          </Link>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-10">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
