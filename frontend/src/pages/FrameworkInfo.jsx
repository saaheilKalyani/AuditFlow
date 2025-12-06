import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

const FrameworkInfo = () => {
  const { id } = useParams();
  const [framework, setFramework] = useState(null);
  const [error, setError] = useState(null);

  const loadFramework = async () => {
    try {
      const resp = await api.get(`/api/frameworks/${id}`);
      setFramework(resp.data);
    } catch (err) {
      setError("Unable to load framework details.");
    }
  };

  useEffect(() => {
    loadFramework();
  }, [id]);

  if (error) return <div className="p-4 text-red-600">{error}</div>;
  if (!framework) return <div className="p-4">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-semibold">{framework.name}</h2>

      <p className="text-sm mt-2 text-gray-500">
        {framework.year} • {framework.sector}
      </p>

      <p className="text-sm mt-4 text-gray-700">{framework.description}</p>
    </div>
  );
};

export default FrameworkInfo;
