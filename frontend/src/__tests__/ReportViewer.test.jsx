import React from "react";
import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import ReportViewer from "../pages/ReportViewer";
import api from "../services/api";
import { MemoryRouter, Route, Routes } from "react-router-dom";

vi.mock("../services/api", () => ({
  default: {
    get: vi.fn(),
  }
}));

describe("ReportViewer", () => {
  beforeEach(() => vi.resetAllMocks());

  test("loads json report and displays sections", async () => {
    const mockReport = {
      executiveSummary: {
        title: "Exec",
        overview: "Overview text",
        keyFindings: ["Find A"],
        highlights: ["H1"]
      },
      metrics: {
        score: 42,
        byFramework: [{ name: "ISO27001", score: 42 }]
      },
      gapTables: {
        missing: [{ id: "m1", controlId: "C1", name: "Control 1" }],
        partial: []
      }
    };

    api.get.mockImplementation((path) => {
      if (path.endsWith("/json")) return Promise.resolve({ data: mockReport });
      return Promise.resolve({ data: {} });
    });

    render(
      <MemoryRouter initialEntries={["/reports/proj1"]}>
        <Routes>
          <Route path="/reports/:projectId" element={<ReportViewer />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => expect(api.get).toHaveBeenCalledWith("/api/reports/proj1/json"));
    expect(screen.getByText("Exec")).toBeTruthy();
    expect(screen.getByText("Overview text")).toBeTruthy();
    expect(screen.getByText("Control 1")).toBeTruthy();
  });
});
