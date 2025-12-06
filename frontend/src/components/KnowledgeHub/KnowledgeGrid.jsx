// frontend/src/components/KnowledgeHub/KnowledgeGrid.jsx
import React from "react";
import KnowledgeCard from "./KnowledgeCard";

const KnowledgeGrid = ({ items }) => {
  if (!items.length)
    return <div className="text-sm text-gray-600">No articles found.</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {items.map((i) => (
        <KnowledgeCard key={i.id} item={i} />
      ))}
    </div>
  );
};

export default KnowledgeGrid;
