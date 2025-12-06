// frontend/src/pages/KnowledgeHub.jsx
import React, { useState, useMemo } from "react";
import SearchBar from "../components/KnowledgeHub/SearchBar";
import KnowledgeGrid from "../components/KnowledgeHub/KnowledgeGrid";
import { faqs, blogs, caseStudies } from "../data/knowledge";

const KnowledgeHub = () => {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("BLOGS"); // BLOGS | FAQ | CASE

  const filteredBlogs = useMemo(
    () =>
      blogs.filter(
        (b) =>
          b.title.toLowerCase().includes(search.toLowerCase()) ||
          b.excerpt.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  );

  const filteredCases = useMemo(
    () =>
      caseStudies.filter(
        (c) =>
          c.title.toLowerCase().includes(search.toLowerCase()) ||
          c.excerpt.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  );

  const filteredFaqs = useMemo(
    () =>
      faqs.filter(
        (f) =>
          f.question.toLowerCase().includes(search.toLowerCase()) ||
          f.answer.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  );

  let content = null;
  if (tab === "BLOGS") content = <KnowledgeGrid items={filteredBlogs} />;
  else if (tab === "CASE") content = <KnowledgeGrid items={filteredCases} />;
  else
    content = (
      <div className="space-y-3">
        {filteredFaqs.map((f) => (
          <div key={f.id} className="border p-4 rounded bg-white">
            <h3 className="font-semibold">{f.question}</h3>
            <p className="text-sm text-gray-700 mt-1">{f.answer}</p>
          </div>
        ))}
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Knowledge Hub</h1>

      <SearchBar value={search} onChange={setSearch} />

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setTab("BLOGS")}
          className={`px-3 py-1 rounded ${
            tab === "BLOGS" ? "bg-indigo-600 text-white" : "border"
          }`}
        >
          Blogs
        </button>
        <button
          onClick={() => setTab("CASE")}
          className={`px-3 py-1 rounded ${
            tab === "CASE" ? "bg-indigo-600 text-white" : "border"
          }`}
        >
          Case Studies
        </button>
        <button
          onClick={() => setTab("FAQ")}
          className={`px-3 py-1 rounded ${
            tab === "FAQ" ? "bg-indigo-600 text-white" : "border"
          }`}
        >
          FAQ
        </button>
      </div>

      {content}
    </div>
  );
};

export default KnowledgeHub;
