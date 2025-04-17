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
import Sidebar from "./pages/admin/Sidebar";
import Dashboard from "./pages/admin/Dashboard";
import CourseTable from "./pages/admin/course/CourseTable";
import AddCourse from "./pages/admin/course/AddCourse";
import EditCourse from "./pages/admin/course/EditCourse";
import CreateLecture from "./pages/admin/lecture/CreateLecture";
import EditLecture from "./pages/admin/lecture/EditLecture";
import CourseDetail from "./pages/client/CourseDetail";
import CourseProgress from "./pages/client/CourseProgress";
import SearchPage from "./pages/client/SearchPage";
import ReviewTable from "./pages/admin/ReviewTable";
import Users from "./pages/admin/Users";
import UserDetailPage from "./pages/admin/UserDetailPage";
import QuizManagement from "./pages/admin/QuizManagement";
import CreateQuiz from "./pages/admin/CreateQuiz";
import EditQuiz from "./pages/admin/EditQuiz";
import QuizPage from "./pages/client/QuizPage";
import QuizResult from "./pages/client/QuizResult";
import ManageCourses from "./pages/admin/ManageCourses";
import ContactUs from "./pages/client/ContactUs";
import PageNotFound from "./components/PageNotFound";
import AboutUs from "./pages/client/AboutUs";
import {
  AdminRoute,
  AuthenticatedUser,
  ProtectedRoute,
} from "./components/ProtectedRoutes";
import PurchaseCourseProtectedRoute from "./components/PurchaseCourseProtectedRoute";

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
        path: "/contact",
        element: <ContactUs />,
      },
      {
        path: "/aboutus",
        element: <AboutUs />,
      },

      {
        path: "/login",
        element: (
          <AuthenticatedUser>
            <Login />
          </AuthenticatedUser>
        ),
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/my-learning",
        element: (
          <ProtectedRoute>
            <MyLearning />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "course/search",
        element: <SearchPage />,
      },
      {
        path: "/course-detail/:courseId",
        element: <CourseDetail />,
      },
      {
        path: "/course-progress/:courseId",
        element: (
          <ProtectedRoute>
            <PurchaseCourseProtectedRoute>
              <CourseProgress />
            </PurchaseCourseProtectedRoute>
          </ProtectedRoute>
        ),
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

      { path: "/quiz/:courseId", element: <QuizPage /> },
      { path: "/quiz/result/:courseId", element: <QuizResult /> },
      //admin route
      {
        path: "admin",
        element: (
          <AdminRoute>
            <Sidebar />
          </AdminRoute>
        ),
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "manage-courses", // New route
            element: <ManageCourses />,
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
          {
            path: "course-reviews",
            element: <ReviewTable />,
          },
          {
            path: "users",
            element: <Users />, // Add Users route
          },
          {
            path: "user/:userId", // Fixed relative path
            element: <UserDetailPage />, // Add Users route
          },
          {
            path: "quiz-management", //
            element: <QuizManagement />,
          },
          {
            path: "quiz/create",
            element: <CreateQuiz />,
          },
          { path: "quiz/create/:courseId", element: <CreateQuiz /> },
          { path: "quiz/edit/:quizId", element: <EditQuiz /> },
        ],
      },
      {
        path: "*",
        element: <PageNotFound />,
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
