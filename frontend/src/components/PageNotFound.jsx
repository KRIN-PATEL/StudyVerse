import { Link } from "react-router-dom";
import svg from "../assets/404.svg";

const PageNotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 px-6 py-12">
      <img
        src={svg}
        alt="404 Not Found"
        className="w-full max-w-2xl h-auto mb-8"
      />
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
        Oops! Page Not Found
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6 text-center max-w-md">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link to="/">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded transition duration-200">
          Back to Home
        </button>
      </Link>
    </div>
  );
};

export default PageNotFound;
