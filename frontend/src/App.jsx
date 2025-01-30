import { createBrowserRouter, RouterProvider } from "react-router";
import "./App.css";
import MainLayout from "./Layout/MainLayout";
import HeroSection from "./pages/client/HeroSection";
import Login from "./pages/Login";
import Courses from "./pages/client/Courses";
import MyLearning from "./pages/client/mylearning";
import Profile from "./pages/client/Profile";

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
            <Courses/>
          </>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/my-learning",
        element: <MyLearning />,
      },
      {
        path: "/profile",
        element: <Profile />,
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
