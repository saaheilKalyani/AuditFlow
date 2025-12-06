import React, { useEffect, useState } from "react";
import api from "../../services/api";
import FrameworkCard from "./FrameworkCard";
import FrameworkModal from "./FrameworkModal";

const FrameworkList = () => {
  const [frameworks, setFrameworks] = useState([]);
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState(null);

  const loadFrameworks = async () => {
    try {
      const resp = await api.get("/api/frameworks");
      setFrameworks(resp.data || []);
    } catch (err) {
      setError("Failed to load frameworks.");
    }
  };

  useEffect(() => {
    loadFrameworks();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Frameworks</h2>

      {error && <div className="text-red-600 text-sm mb-2">{error}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {frameworks.map((fw) => (
          <FrameworkCard
            key={fw._id}
            framework={fw}
            onClick={setSelected}
          />
        ))}
      </div>

      <FrameworkModal
        framework={selected}
        onClose={() => setSelected(null)}
      />
    </div>
  );
};

export default FrameworkList;
