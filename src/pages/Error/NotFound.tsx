import { Link } from "react-router-dom";
import { FaExclamationCircle } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <FaExclamationCircle className="text-red-500 text-6xl mb-4" />
      <h1 className="text-2xl font-semibold my-4 dark:text-gray-300">
        404 - Not Found
      </h1>
      <p className="text-gray-600">
        The page you are looking for doesn't exist.
      </p>
      <Link to="/" className="text-blue-500 hover:underline mt-4">
        Go back to home
      </Link>
    </div>
  );
};

export default NotFound;
