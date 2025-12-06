// frontend/src/components/Reports/ReportToolbar.jsx
import React, { useState } from "react";
import api from "../../services/api";

/*
  Toolbar provides:
  - Download PDF (GET /api/reports/:projectId/pdf -> blob)
  - Download JSON (GET /api/reports/:projectId/json -> blob)
  - Print: open PDF in new tab and call window.print()
*/

const ReportToolbar = ({ projectId }) => {
  const [loading, setLoading] = useState({ pdf: false, json: false });
  const [err, setErr] = useState(null);

  const download = async (type) => {
    setErr(null);
    setLoading((s) => ({ ...s, [type]: true }));
    try {
      const endpoint = `/api/reports/${projectId}/${type}`;
      const resp = await api.get(endpoint, { responseType: "blob" });
      const blob = new Blob([resp.data], { type: resp.headers?.["content-type"] || undefined });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const ext = type === "json" ? "json" : type === "csv" ? "csv" : "pdf";
      a.download = `report-${projectId}.${ext}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (e) {
      console.error("Download report failed", e);
      setErr("Download failed");
    } finally {
      setLoading((s) => ({ ...s, [type]: false }));
    }
  };

  const openAndPrintPdf = async () => {
    setErr(null);
    setLoading((s) => ({ ...s, pdf: true }));
    try {
      const resp = await api.get(`/api/reports/${projectId}/pdf`, { responseType: "blob" });
      const blob = new Blob([resp.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const win = window.open(url, "_blank");
      if (win) {
        // attempt to print after load - some browsers block programmatic print for blob URLs
        win.focus();
        // give it a little time to load
        setTimeout(() => {
          try {
            win.print();
          } catch (e) {
            // ignore
          }
        }, 800);
      } else {
        // fallback to download
        const a = document.createElement("a");
        a.href = url;
        a.download = `report-${projectId}.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
      }
      // revoke later
      setTimeout(() => window.URL.revokeObjectURL(url), 2000);
    } catch (e) {
      console.error("Open/print failed", e);
      setErr("Open/print failed");
    } finally {
      setLoading((s) => ({ ...s, pdf: false }));
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => download("json")}
        disabled={loading.json}
        className="px-3 py-1 border rounded text-sm"
      >
        {loading.json ? "Downloading..." : "Export JSON"}
      </button>

      <button
        onClick={() => download("csv")}
        disabled={loading.csv}
        className="px-3 py-1 border rounded text-sm"
      >
        {loading.csv ? "Downloading..." : "Export CSV"}
      </button>

      <button
        onClick={openAndPrintPdf}
        disabled={loading.pdf}
        className="px-3 py-1 bg-indigo-600 text-white rounded text-sm"
      >
        {loading.pdf ? "Preparing..." : "Print / Download PDF"}
      </button>

      {err && <div className="text-sm text-red-600 ml-3">{err}</div>}
    </div>
  );
};

export default ReportToolbar;
