// frontend/src/components/Landing/Navbar.jsx
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="w-full py-4 border-b bg-white">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4">
        <Link to="/" className="text-xl font-semibold">
          AuditFlow
        </Link>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="text-sm text-gray-700 hover:underline"
              >
                Dashboard
              </Link>

              <button
                onClick={logout}
                className="px-3 py-1 text-sm bg-red-500 text-white rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm text-gray-700 hover:underline">
                Login
              </Link>

              <Link
                to="/register"
                className="px-3 py-1 text-sm bg-indigo-600 text-white rounded"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
