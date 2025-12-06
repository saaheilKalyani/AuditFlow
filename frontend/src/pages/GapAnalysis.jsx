// frontend/src/pages/GapAnalysis.jsx
import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import ControlCard from "../components/GapAnalysis/ControlCard";

/*
  Flow:
  - Load project (GET /api/projects/:id) to get selected frameworks
  - For each framework, load controls (GET /api/frameworks/:id/controls)
  - Load existing gap responses (GET /api/projects/:id/gap-responses)
  - Combine controls list into a flat array
  - Render list (simple UI)
  - Autosave on every change: POST new response(s) or PATCH existing response
  - Evidence upload uses POST /api/uploads and DELETE /api/uploads/:fileId
  - Summary can be fetched from GET /api/projects/:id/gap-summary (optional button)
*/

const GapAnalysis = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [controls, setControls] = useState([]); // each control: { ...controlFields, frameworkId }
  const [responsesMap, setResponsesMap] = useState({}); // control._id -> response object
  const [loading, setLoading] = useState(true);
  const [savingMap, setSavingMap] = useState({}); // control._id -> saving boolean
  const [error, setError] = useState(null);
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    if (!projectId) return;
    let mounted = true;
    const loadAll = async () => {
      setLoading(true);
      setError(null);
      try {
        // 1. load project
        const pResp = await api.get(`/api/projects/${projectId}`);
        if (!mounted) return;
        setProject(pResp.data);

        // 2. fetch all controls for each framework
        const frameworkIds = (pResp.data?.frameworks || []).map((f) =>
          typeof f === "string" ? f : f._id
        );

        const fetches = frameworkIds.map((fid) =>
          
          api.get(`/api/frameworks/${fid}/controls`).then((r) => r.data || [])
        );

        const controlsByFramework = await Promise.all(fetches);
        if (!mounted) return;

        // flatten with frameworkId tag
        const flat = controlsByFramework.flatMap((arr, idx) =>
          (arr || []).map((c) => ({ ...c, frameworkId: frameworkIds[idx] }))
        );

        // 3. load existing responses for project (only answered ones)
        const respResp = await api.get(`/api/projects/${projectId}/gap-responses`);
        const existing = respResp.data || [];

        // Build map controlId -> response object (if control nested object in response, handle)
        const map = {};
        existing.forEach((r) => {
          const controlRef = typeof r.controlId === "object" ? r.controlId._id : r.controlId;
          map[controlRef] = r;
        });

        setControls(flat);
        setResponsesMap(map);
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
      // partialUpdate: { response?: 'YES'|'NO'|'PARTIAL', notes?: string, evidenceFiles?: [fileObj] }
      // set optimistic UI
      setResponsesMap((m) => ({ ...m, [controlId]: { ...(m[controlId] || {}), ...partialUpdate } }));
      setSavingMap((s) => ({ ...s, [controlId]: true }));

      try {
        const existing = responsesMap[controlId];
        if (existing && existing._id) {
          // PATCH existing response
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
          // POST new response - API expects { responses: [ { controlId, response, notes } ] }
          const body = { responses: [{ controlId, response: partialUpdate.response || null, notes: partialUpdate.notes || '' }] };
          const postResp = await api.post(`/api/projects/${projectId}/gap-responses`, body);
          // server returns responses array (created)
          const created = postResp.data?.responses || [];
          if (created.length > 0) {
            const createdOne = created[0];
            setResponsesMap((m) => ({ ...m, [controlId]: createdOne }));
          }
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

  // Evidence upload helper - appends projectId to formdata if needed
  const handleUpload = async (controlId, file) => {
    setSavingMap((s) => ({ ...s, [controlId]: true }));
    try {
      const fd = new FormData();
      fd.append("file", file);
      // include projectId so backend can attach
      fd.append("projectId", projectId);
      const upResp = await api.post("/api/uploads", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const files = upResp.data?.files || [];
      // If created file entry(s) exist, add their _id to evidenceFiles and save via PATCH or POST
      const fileIds = files.map((f) => f._id);

      const existing = responsesMap[controlId];
      if (existing && existing._id) {
        // append to evidenceFiles
        const newEvidence = [...(existing.evidenceFiles || []), ...fileIds];
        const patchResp = await api.patch(`/api/projects/${projectId}/gap-responses/${existing._id}`, {
          evidenceFiles: newEvidence,
        });
        setResponsesMap((m) => ({ ...m, [controlId]: patchResp.data.response || patchResp.data }));
      } else {
        // create new with evidenceFiles
        const body = { responses: [{ controlId, response: null, notes: '', evidenceFiles: fileIds }] };
        const postResp = await api.post(`/api/projects/${projectId}/gap-responses`, body);
        const created = postResp.data?.responses || [];
        if (created.length > 0) setResponsesMap((m) => ({ ...m, [controlId]: created[0] }));
      }
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
      // delete from server
      await api.delete(`/api/uploads/${fileId}`);
      const existing = responsesMap[controlId];
      if (existing && existing._id) {
        const newEvidence = (existing.evidenceFiles || []).filter((id) => id !== fileId);
        const patchResp = await api.patch(`/api/projects/${projectId}/gap-responses/${existing._id}`, {
          evidenceFiles: newEvidence,
        });
        setResponsesMap((m) => ({ ...m, [controlId]: patchResp.data.response || patchResp.data }));
      }
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

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Recommendations / Summary</h2>
        {summary ? (
          <div className="bg-white border p-4 rounded">
            <div className="text-sm mb-2">Score: {summary.score}</div>
            <div className="text-sm text-gray-700">
              Missing controls: {summary.missingControls}
            </div>
            <div className="mt-3">
              {summary.recommendations?.map((r, idx) => (
                <div key={idx} className="text-sm py-1 border-b last:border-b-0">{r.message}</div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-sm text-gray-600">No summary yet. Click "Refresh Summary".</div>
        )}
      </div>
    </div>
  );
};

export default GapAnalysis;
