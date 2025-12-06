// frontend/src/pages/Article.jsx
import React from "react";
import { useParams } from "react-router-dom";
import { blogs, caseStudies } from "../data/knowledge";

const Article = () => {
  const { id } = useParams();

  const article =
    blogs.find((b) => b.id === id) ||
    caseStudies.find((c) => c.id === id) ||
    null;

  if (!article)
    return <div className="p-4 text-red-600">Article not found.</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">{article.title}</h1>

      <div className="prose max-w-none whitespace-pre-wrap">
        {article.content}
      </div>
    </div>
  );
};

export default Article;
