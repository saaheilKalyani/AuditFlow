// frontend/src/components/KnowledgeHub/KnowledgeCard.jsx
import React from "react";
import { Link } from "react-router-dom";

const KnowledgeCard = ({ item }) => {
  return (
    <Link
      to={`/knowledge/${item.id}`}
      className="border rounded p-4 bg-white hover:shadow transition block"
    >
      <h3 className="text-lg font-semibold">{item.title}</h3>
      {item.excerpt && (
        <p className="text-sm text-gray-600 mt-1">{item.excerpt}</p>
      )}
    </Link>
  );
};

export default KnowledgeCard;
