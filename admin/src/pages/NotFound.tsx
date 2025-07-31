import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 via-orange-100 to-yellow-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <h1 className="text-4xl font-extrabold text-orange-500 mb-4">404</h1>
        <p className="text-xl font-medium text-gray-700 mb-4">
          Page Not Found
        </p>
        <p className="text-sm text-gray-500 mb-8">
          Sorry, the page <code className="bg-orange-50 px-2 py-1 rounded text-orange-600">{location.pathname}</code> doesn’t exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block px-[1.25rem] py-[0.75rem] text-[0.8rem] font-semibold bg-orange-500 text-white rounded-[0.75rem] shadow hover:bg-orange-600 transition-colors"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
