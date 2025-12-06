// frontend/src/components/Mapping/MappingRow.jsx
import React from "react";

const MappingRow = ({ row }) => {
  // row = { source, target, score }
  const mapped = row?.target ? true : false;

  return (
    <tr className="border-b">
      <td className="p-2 text-sm w-64">
        <div className="font-medium">{row.source.name}</div>
        <div className="text-xs text-gray-500">{row.source.controlId}</div>
      </td>

      {/* Mapping cell */}
      <td
        className={`p-2 text-sm text-center ${
          mapped ? "bg-green-100" : "bg-red-100"
        }`}
        title={
          mapped
            ? `${row.target.name}\n${row.target.requirement}`
            : "No mapping available"
        }
      >
        {mapped ? row.target.controlId : "—"}
      </td>

      {/* Score */}
      <td className="p-2 text-sm text-center">{mapped ? row.score : "—"}</td>
    </tr>
  );
};

export default MappingRow;
