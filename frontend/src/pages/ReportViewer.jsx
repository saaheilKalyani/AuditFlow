// frontend/src/pages/ReportViewer.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import ReportToolbar from "../components/Reports/ReportToolbar";
import ExecutiveSummary from "../components/Reports/ExecutiveSummary";
import GapTables from "../components/Reports/GapTables";
import Charts from "../components/Reports/Charts";

/*
  ReportViewer page:
  - Fetches JSON report from GET /api/reports/:projectId/json
  - Renders Executive summary, gap tables, charts
  - Toolbar provides Print/Download PDF (GET /api/reports/:projectId/pdf)
*/

const ReportViewer = () => {
  const { projectId } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!projectId) return;
    let mounted = true;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const resp = await api.get(`/api/reports/${projectId}/json`);
        if (!mounted) return;
        // server may return { report: {...} } or raw object; handle both
        const data = resp.data?.report ?? resp.data ?? null;
        setReport(data);
      } catch (err) {
        console.error("Report load failed", err);
        setError("Failed to load report");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, [projectId]);

  if (loading) return <div className="p-4">Loading report...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;
  if (!report) return <div className="p-4">No report available.</div>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex items-start justify-between">
        <h1 className="text-2xl font-semibold">Project Report</h1>
        <ReportToolbar projectId={projectId} />
      </div>

      <div className="mt-6 space-y-6">
        <ExecutiveSummary data={report.executiveSummary ?? report.summary ?? {}} />
        <Charts data={report.charts ?? report.metrics ?? {}} />
        <GapTables data={report.gapTables ?? report.missing ?? {}} />
      </div>
    </div>
  );
};

export default ReportViewer;
