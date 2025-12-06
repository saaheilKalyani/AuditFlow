// backend/src/controllers/reportController.js
import { parse as json2csvParse } from "json2csv";
import puppeteer from "puppeteer";
import Project from "../models/Project.js";
import User from "../models/User.js";
import Framework from "../models/Framework.js";
import Control from "../models/Control.js";
import GapResponse from "../models/GapResponse.js";
import EvidenceFile from "../models/EvidenceFile.js";
import { calculateScore } from "../utils/scoring.js";
import { generateRecommendations } from "../utils/recommendations.js";
import { findEquivalentControls } from "../utils/mappingLogic.js";

/**
 * Helper: build a report JSON following the REPORT STRUCTURE in the global spec.
 */
const buildReportJson = async (projectId, userId) => {
  // Load basic project, user
  const project = await Project.findById(projectId).populate("frameworks", "key name year description sector");
  if (!project) throw new Error("Project not found");

  const user = userId ? await User.findById(userId).select("name email") : null;

  // Get controls for project frameworks
  const controls = await Control.find({ frameworkId: { $in: project.frameworks.map(f => f._id) } });

  // Get gap responses for user/project
  const responses = await GapResponse.find({ projectId, userId }).populate("evidenceFiles");

  // Evidence summary
  const evidence = await EvidenceFile.find({ projectId });

  // Score calculation (use utilities)
  const score = calculateScore(responses, controls.length);

  // Missing/partial detection
  const missingControls = controls.filter(
    c => !responses.some(r => r.controlId.toString() === c._id.toString())
  );
  const partialControls = responses.filter(r => r.response === "PARTIAL")
    .map(r => controls.find(c => c._id.toString() === r.controlId.toString()))
    .filter(Boolean);

  const recommendations = generateRecommendations(missingControls, partialControls);

  // mapping sample: build pairwise mapping for first two frameworks (if >= 2)
  let mappingTable = [];
  if (project.frameworks.length >= 2) {
    const fwA = project.frameworks[0];
    const fwB = project.frameworks[1];
    const controlsA = controls.filter(c => c.frameworkId.toString() === fwA._id.toString());
    const controlsB = controls.filter(c => c.frameworkId.toString() === fwB._id.toString());
    const pairs = findEquivalentControls(controlsA, controlsB);
    mappingTable.push({
      frameworkA: { id: fwA._id, key: fwA.key, name: fwA.name },
      frameworkB: { id: fwB._id, key: fwB.key, name: fwB.name },
      pairs: pairs.map(p => ({
        sourceControlId: p.source.controlId,
        sourceName: p.source.name,
        targetControlId: p.target ? p.target.controlId : null,
        targetName: p.target ? p.target.name : null,
        matchScore: p.score
      }))
    });
  }

  // Flatten gap summary for charts
  const totalControls = controls.length;
  const yesCount = responses.filter(r => r.response === "YES").length;
  const partialCount = responses.filter(r => r.response === "PARTIAL").length;
  const noCount = responses.filter(r => r.response === "NO").length;

  // Risk analysis basic stub - based on missing controls count
  const riskScore = Math.min(100, Math.round((missingControls.length / Math.max(1, totalControls)) * 100));

  // Build final JSON report structure (matches global spec)
  const report = {
    generatedAt: new Date().toISOString(),
    executiveSummary: {
      title: project.title,
      summary: `Project ${project.title} for ${user ? user.name : "Unknown user"}. Overall compliance score: ${score}%.`,
    },
    organizationProfile: {
      user: user ? { id: user._id, name: user.name, email: user.email } : null,
      project: { id: project._id, title: project.title, frameworks: project.frameworks.map(f => ({ id: f._id, key: f.key, name: f.name })) }
    },
    gapAnalysisSummary: {
      totalControls,
      answered: responses.length,
      yes: yesCount,
      partial: partialCount,
      no: noCount,
      score
    },
    complianceScoreChartData: {
      score,
      totalControls,
      yes: yesCount,
      partial: partialCount,
      no: noCount
    },
    frameworkMappingTable: mappingTable,
    riskAnalysis: {
      missingControls: missingControls.length,
      riskScore,
      note: "Risk score is a simple heuristic based on proportion of missing controls."
    },
    recommendations,
    evidenceSummary: evidence.map(e => ({
      id: e._id,
      filename: e.filename,
      mimeType: e.mimeType,
      size: e.size,
      uploadedAt: e.createdAt
    })),
    conclusion: `This report was generated for project ${project.title}. Use recommendations to improve compliance.`
  };

  return report;
};

// ----------------- Controller handlers -----------------

// GET /api/reports/:projectId/json
export const getReportJson = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const userId = req.userId; // report is user-specific where relevant

    const report = await buildReportJson(projectId, userId);
    res.json(report);
  } catch (err) {
    console.error("Report JSON error:", err);
    res.status(500).json({ message: err.message || "Server error" });
  }
};

// GET /api/reports/:projectId/csv
export const getReportCsv = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const userId = req.userId;

    // Build report and then transform into CSV rows
    const report = await buildReportJson(projectId, userId);

    // For CSV, we'll provide a flattened list of controls + response status + notes + evidence count
    // Build rows by combining controls with responses.
    const project = await Project.findById(projectId).populate("frameworks");
    const controls = await Control.find({ frameworkId: { $in: project.frameworks.map(f => f._id) } });
    const responses = await GapResponse.find({ projectId, userId });

    const rows = controls.map(c => {
      const resp = responses.find(r => r.controlId.toString() === c._id.toString());
      return {
        frameworkKey: controls.length ? (project.frameworks.find(f => f._id.toString() === c.frameworkId.toString())?.key || "") : "",
        controlId: c.controlId,
        controlName: c.name,
        requirement: c.requirement?.slice(0, 200) || "",
        response: resp ? resp.response : "UNANSWERED",
        notes: resp ? (resp.notes || "") : "",
        evidenceCount: resp ? (resp.evidenceFiles ? resp.evidenceFiles.length : 0) : 0
      };
    });

    const csv = json2csvParse(rows);
    res.header("Content-Type", "text/csv");
    res.attachment(`${project.title || "report"}-controls.csv`);
    res.send(csv);
  } catch (err) {
    console.error("Report CSV error:", err);
    res.status(500).json({ message: err.message || "Server error" });
  }
};

// GET /api/reports/:projectId/pdf
export const getReportPdf = async (req, res) => {
  let browser;
  try {
    const projectId = req.params.projectId;
    const userId = req.userId;
    const report = await buildReportJson(projectId, userId);

    // Build a simple HTML representation of the report
    const html = `
      <html>
        <head>
          <meta charset="utf-8" />
          <title>AuditFlow Report</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 24px; color:#111; }
            h1 { font-size: 22px; margin-bottom: 8px; }
            h2 { font-size: 16px; margin-top: 16px; }
            table { width: 100%; border-collapse: collapse; margin-top: 8px;}
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            .small { font-size: 12px; color: #444; }
          </style>
        </head>
        <body>
          <h1>Executive Summary</h1>
          <p>${report.executiveSummary.summary}</p>

          <h2>Organization Profile</h2>
          <p class="small">Project: ${report.organizationProfile.project.title}</p>
          ${report.organizationProfile.user ? `<p class="small">User: ${report.organizationProfile.user.name} (${report.organizationProfile.user.email})</p>` : ""}

          <h2>Gap Analysis Summary</h2>
          <table>
            <tr><th>Total Controls</th><td>${report.gapAnalysisSummary.totalControls}</td></tr>
            <tr><th>Answered</th><td>${report.gapAnalysisSummary.answered}</td></tr>
            <tr><th>YES</th><td>${report.gapAnalysisSummary.yes}</td></tr>
            <tr><th>PARTIAL</th><td>${report.gapAnalysisSummary.partial}</td></tr>
            <tr><th>NO</th><td>${report.gapAnalysisSummary.no}</td></tr>
            <tr><th>Score</th><td>${report.gapAnalysisSummary.score}%</td></tr>
          </table>

          <h2>Recommendations</h2>
          <ul>
            ${report.recommendations.map(r => `<li><strong>${r.type}</strong>: ${r.message}</li>`).join("")}
          </ul>

          <h2>Evidence Summary</h2>
          <table>
            <tr><th>Filename</th><th>Size (bytes)</th></tr>
            ${report.evidenceSummary.map(e => `<tr><td>${e.filename}</td><td>${e.size}</td></tr>`).join("")}
          </table>

          <h2>Conclusion</h2>
          <p>${report.conclusion}</p>
        </body>
      </html>
    `;

    // Launch puppeteer and create PDF
    browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });
    const pdfBuffer = await page.pdf({ format: "A4", printBackground: true, margin: { top: "20px", bottom: "20px" } });

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${report.organizationProfile.project.title}-report.pdf"`,
      "Content-Length": pdfBuffer.length
    });
    res.send(pdfBuffer);
  } catch (err) {
    console.error("Report PDF error:", err);
    if (browser) await browser.close();
    res.status(500).json({ message: err.message || "Server error" });
  } finally {
    if (browser) await browser.close();
  }
};
