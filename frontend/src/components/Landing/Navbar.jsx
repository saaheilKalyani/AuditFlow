import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full py-4 border-b bg-white">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4">
        <h1 className="text-xl font-semibold">AuditFlow</h1>

        <div className="flex items-center gap-4">
          <Link to="/login" className="text-sm text-gray-700 hover:underline">
            Login
          </Link>
          <Link
            to="/register"
            className="px-3 py-1 text-sm bg-indigo-600 text-white rounded"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
