// frontend/src/components/KnowledgeHub/SearchBar.jsx
import React from "react";

const SearchBar = ({ value, onChange }) => {
  return (
    <input
      className="w-full px-3 py-2 border rounded mb-4"
      placeholder="Search articles, FAQs, case studies..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default SearchBar;
