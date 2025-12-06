// frontend/src/pages/GapAnalysis.jsx
import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import ControlCard from "../components/GapAnalysis/ControlCard";
import SummaryPanel from "../components/GapAnalysis/SummaryPanel";

/*
  This file extends previous GapAnalysis:
  - Renders controls (list)
  - Shows SummaryPanel (score, missing, recommendations, exports) on same page
  - Uses /api/projects/:id/gap-summary for summary data
*/

const GapAnalysis = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [controls, setControls] = useState([]);
  const [responsesMap, setResponsesMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [savingMap, setSavingMap] = useState({});
  const [error, setError] = useState(null);
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    if (!projectId) return;
    let mounted = true;
    const loadAll = async () => {
      setLoading(true);
      setError(null);
      try {
        const pResp = await api.get(`/api/projects/${projectId}`);
        if (!mounted) return;
        setProject(pResp.data);

        const frameworkIds = (pResp.data?.frameworks || []).map((f) =>
          typeof f === "string" ? f : f._id
        );

        const fetches = frameworkIds.map((fid) =>
          api.get(`/api/frameworks/${fid}/controls`).then((r) => r.data || [])
        );

        const controlsByFramework = await Promise.all(fetches);
        if (!mounted) return;

        const flat = controlsByFramework.flatMap((arr, idx) =>
          (arr || []).map((c) => ({ ...c, frameworkId: frameworkIds[idx] }))
        );

        const respResp = await api.get(`/api/projects/${projectId}/gap-responses`);
        const existing = respResp.data || [];

        const map = {};
        existing.forEach((r) => {
          const controlRef = typeof r.controlId === "object" ? r.controlId._id : r.controlId;
          map[controlRef] = r;
        });

        setControls(flat);
        setResponsesMap(map);

        // also load summary upfront
        try {
          const sResp = await api.get(`/api/projects/${projectId}/gap-summary`);
          setSummary(sResp.data || null);
        } catch (e) {
          // summary is optional
          console.warn("Summary load failed", e);
        }
      } catch (e) {
        console.error("Gap load error", e);
        setError("Failed to load gap analysis data");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadAll();
    return () => {
      mounted = false;
    };
  }, [projectId]);

  const handleResponseChange = useCallback(
    async (controlId, partialUpdate) => {
      setResponsesMap((m) => ({ ...m, [controlId]: { ...(m[controlId] || {}), ...partialUpdate } }));
      setSavingMap((s) => ({ ...s, [controlId]: true }));

      try {
        const existing = responsesMap[controlId];
        if (existing && existing._id) {
          const patchBody = {};
          if (partialUpdate.response !== undefined) patchBody.response = partialUpdate.response;
          if (partialUpdate.notes !== undefined) patchBody.notes = partialUpdate.notes;
          if (partialUpdate.evidenceFiles !== undefined) patchBody.evidenceFiles = partialUpdate.evidenceFiles;

          const patchResp = await api.patch(
            `/api/projects/${projectId}/gap-responses/${existing._id}`,
            patchBody
          );
          setResponsesMap((m) => ({ ...m, [controlId]: patchResp.data.response || patchResp.data }));
        } else {
          const body = { responses: [{ controlId, response: partialUpdate.response || null, notes: partialUpdate.notes || "" }] };
          const postResp = await api.post(`/api/projects/${projectId}/gap-responses`, body);
          const created = postResp.data?.responses || [];
          if (created.length > 0) {
            setResponsesMap((m) => ({ ...m, [controlId]: created[0] }));
          }
        }
        // refresh summary after change
        try {
          const sResp = await api.get(`/api/projects/${projectId}/gap-summary`);
          setSummary(sResp.data || null);
        } catch (e) {
          // ignore
        }
      } catch (err) {
        console.error("Autosave error", err);
        setError((e) => e || "Autosave failed for some responses");
      } finally {
        setSavingMap((s) => {
          const copy = { ...s };
          delete copy[controlId];
          return copy;
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [projectId, responsesMap]
  );

  const handleUpload = async (controlId, file) => {
    setSavingMap((s) => ({ ...s, [controlId]: true }));
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("projectId", projectId);
      const upResp = await api.post("/api/uploads", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const files = upResp.data?.files || [];
      const fileIds = files.map((f) => f._id);

      const existing = responsesMap[controlId];
      if (existing && existing._id) {
        const newEvidence = [...(existing.evidenceFiles || []), ...fileIds];
        const patchResp = await api.patch(`/api/projects/${projectId}/gap-responses/${existing._id}`, {
          evidenceFiles: newEvidence,
        });
        setResponsesMap((m) => ({ ...m, [controlId]: patchResp.data.response || patchResp.data }));
      } else {
        const body = { responses: [{ controlId, response: null, notes: "", evidenceFiles: fileIds }] };
        const postResp = await api.post(`/api/projects/${projectId}/gap-responses`, body);
        const created = postResp.data?.responses || [];
        if (created.length > 0) setResponsesMap((m) => ({ ...m, [controlId]: created[0] }));
      }

      // refresh summary
      try {
        const sResp = await api.get(`/api/projects/${projectId}/gap-summary`);
        setSummary(sResp.data || null);
      } catch (e) {}
    } catch (err) {
      console.error("Upload error", err);
      setError("File upload failed");
    } finally {
      setSavingMap((s) => {
        const copy = { ...s };
        delete copy[controlId];
        return copy;
      });
    }
  };

  const handleDeleteFile = async (controlId, fileId) => {
    setSavingMap((s) => ({ ...s, [controlId]: true }));
    try {
      await api.delete(`/api/uploads/${fileId}`);
      const existing = responsesMap[controlId];
      if (existing && existing._id) {
        const newEvidence = (existing.evidenceFiles || []).filter((id) => id !== fileId);
        const patchResp = await api.patch(`/api/projects/${projectId}/gap-responses/${existing._id}`, {
          evidenceFiles: newEvidence,
        });
        setResponsesMap((m) => ({ ...m, [controlId]: patchResp.data.response || patchResp.data }));
      }

      // refresh summary
      try {
        const sResp = await api.get(`/api/projects/${projectId}/gap-summary`);
        setSummary(sResp.data || null);
      } catch (e) {}
    } catch (err) {
      console.error("Delete file error", err);
      setError("Failed to delete file");
    } finally {
      setSavingMap((s) => {
        const copy = { ...s };
        delete copy[controlId];
        return copy;
      });
    }
  };

  const fetchSummary = async () => {
    try {
      const resp = await api.get(`/api/projects/${projectId}/gap-summary`);
      setSummary(resp.data || null);
    } catch (err) {
      console.error("Summary load error", err);
    }
  };

  if (loading) return <div className="p-4">Loading gap analysis...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Gap Analysis</h1>
        <div className="text-sm text-gray-600">
          Project: {project?.title || projectId}
        </div>
      </div>

      <div className="mt-4 mb-6 flex items-center gap-3">
        <button onClick={fetchSummary} className="px-3 py-1 border rounded text-sm">Refresh Summary</button>
        <div className="text-sm text-gray-600">
          Answered: {summary?.answered ?? "—"} / {summary?.totalControls ?? controls.length}
        </div>
      </div>

      <div className="mb-6">
        <SummaryPanel projectId={projectId} summary={summary} />
      </div>

      <div className="space-y-4">
        {controls.map((c) => (
          <ControlCard
            key={c._id}
            control={c}
            response={responsesMap[c._id] || null}
            onChange={(partial) => handleResponseChange(c._id, partial)}
            onUpload={(file) => handleUpload(c._id, file)}
            onDeleteFile={(fileId) => handleDeleteFile(c._id, fileId)}
            saving={!!savingMap[c._id]}
          />
        ))}
      </div>
    </div>
  );
};

export default GapAnalysis;
