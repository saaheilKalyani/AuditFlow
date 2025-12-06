// frontend/src/components/Mapping/MappingFilters.jsx
import React from "react";

const MappingFilters = ({ search, onSearch, statusFilter, onStatusChange }) => {
  return (
    <div className="flex items-center gap-4 mb-4">
      <input
        className="px-3 py-2 border rounded w-64"
        placeholder="Search control name..."
        value={search}
        onChange={(e) => onSearch(e.target.value)}
      />

      <select
        className="px-3 py-2 border rounded"
        value={statusFilter}
        onChange={(e) => onStatusChange(e.target.value)}
      >
        <option value="ALL">All</option>
        <option value="MAPPED">Mapped</option>
        <option value="UNMAPPED">Unmapped</option>
      </select>
    </div>
  );
};

export default MappingFilters;
