// frontend/src/pages/Mapping.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import MappingTable from "../components/Mapping/MappingTable";
import MappingFilters from "../components/Mapping/MappingFilters";

const Mapping = () => {
  const { projectId } = useParams();
  const [mappingData, setMappingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  useEffect(() => {
    const load = async () => {
      try {
        const resp = await api.get(`/api/mapping/${projectId}`);
        setMappingData(resp.data);
      } catch (err) {
        console.error("Mapping load failed", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [projectId]);

  if (loading) return <div className="p-4">Loading mapping...</div>;
  if (!mappingData) return <div className="p-4 text-red-600">Failed to load mapping</div>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Framework Mapping</h1>

      <MappingFilters
        search={search}
        onSearch={setSearch}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
      />

      <MappingTable
        mapping={mappingData}
        search={search}
        statusFilter={statusFilter}
      />
    </div>
  );
};

export default Mapping;
