// frontend/src/components/Mapping/MappingTable.jsx
import React, { useMemo } from "react";
import MappingRow from "./MappingRow";

/*
mapping = {
  frameworks: [{...}, {...}],
  mappings: [
    {
      frameworkA: {...},
      frameworkB: {...},
      pairs: [
        { source, target, score }
      ]
    }
  ]
}
*/

const MappingTable = ({ mapping, search, statusFilter }) => {
  const pairs = useMemo(() => {
    if (!mapping?.mappings?.length) return [];

    // For now assume mapping.mappings[0] is the active pair (A→B)
    const rows = mapping.mappings[0].pairs || [];

    return rows.filter((row) => {
      const nameMatch = row.source.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const mapped = row.target ? true : false;
      const statusMatch =
        statusFilter === "ALL" ||
        (statusFilter === "MAPPED" && mapped) ||
        (statusFilter === "UNMAPPED" && !mapped);

      return nameMatch && statusMatch;
    });
  }, [mapping, search, statusFilter]);

  const frameworkA = mapping.mappings[0].frameworkA.name;
  const frameworkB = mapping.mappings[0].frameworkB.name;

  return (
    <div className="overflow-x-auto border rounded bg-white">
      <table className="min-w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="p-2 w-64">{frameworkA} Controls</th>
            <th className="p-2 text-center">{frameworkB} Mapping</th>
            <th className="p-2 text-center">Score</th>
          </tr>
        </thead>

        <tbody>
          {pairs.length === 0 ? (
            <tr>
              <td className="p-3 text-gray-500" colSpan={3}>
                No results match your filters.
              </td>
            </tr>
          ) : (
            pairs.map((row) => <MappingRow key={row.source._id} row={row} />)
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MappingTable;
