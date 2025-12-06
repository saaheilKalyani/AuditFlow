import React from "react";

const Footer = () => {
  return (
    <footer className="w-full py-6 border-t bg-white mt-10">
      <div className="max-w-6xl mx-auto px-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} AuditFlow — All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
