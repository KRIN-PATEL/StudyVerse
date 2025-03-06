import { createBrowserRouter, RouterProvider } from "react-router";
import "./App.css";
import MainLayout from "./Layout/MainLayout";
import HeroSection from "./pages/client/HeroSection";
import Login from "./pages/Login";
import Courses from "./pages/client/Courses";
import MyLearning from "./pages/client/mylearning";
import Profile from "./pages/client/Profile";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOTP from "./pages/VerifyOTP";
import ResetPassword from "./pages/ResetPassword";
import  Sidebar  from "./pages/admin/Sidebar";
import Dashboard from "./pages/admin/Dashboard";
import CourseTable from "./pages/admin/course/CourseTable";
import AddCourse from "./pages/admin/course/AddCourse";
import EditCourse from "./pages/admin/course/EditCourse";
import CreateLecture from "./pages/admin/lecture/CreateLecture";
import EditLecture from "./pages/admin/lecture/EditLecture";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <>
            <HeroSection />
            <Courses />
          </>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/my-learning",
        element: <MyLearning />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/verify-otp",
        element: <VerifyOTP />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
      //admin route
      {
        path: "admin",
        element: <Sidebar/>,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "course",
            element: <CourseTable />,
          },
          {
            path: "course/create",
            element: <AddCourse />,
          },
          {
            path: "course/:courseId",
            element: <EditCourse />,
          },
          {
            path: "course/:courseId/lecture",
            element: <CreateLecture />,
          },
          {
            path: "course/:courseId/lecture/:lectureId",
            element: <EditLecture />,
          },
          // {
          //   path: "dashboard",
          //   element: <Dashboard />,
          // },
          // {
          //   path: "course",
          //   element: <CourseTable />,
          // },
          // {
          //   path: "course/create",
          //   element: <AddCourse />,
          // },
          // {
          //   path: "course/:courseId",
          //   element: <EditCourse />,
          // },
          // {
          //   path: "course/:courseId/lecture",
          //   element: <CreateLecture />,
          // },
          // {
          //   path: "course/:courseId/lecture/:lectureId",
          //   element: <EditLecture />,
          // }
        ],
      },
    ],
  
  },
]);

function App() {
  return (
    <main>
      <RouterProvider router={appRouter} />
    </main>
  );
}

export default App;
