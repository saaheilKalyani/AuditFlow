import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import GapAnalysis from "../pages/GapAnalysis";
import api from "../services/api";
import { MemoryRouter, Route, Routes } from "react-router-dom";

vi.mock("../services/api", () => {
  return {
    default: {
      get: vi.fn(),
      post: vi.fn(),
      patch: vi.fn(),
      delete: vi.fn()
    }
  }
});

describe("GapAnalysis integration", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test("loads controls and existing responses and autosaves on change", async () => {
    const projectId = "proj1";
    // project response contains frameworks array of ids
    api.get.mockImplementation((path) => {
      if (path === `/api/projects/${projectId}`) {
        return Promise.resolve({ data: { _id: projectId, title: "P1", frameworks: ["fw1"] } });
      }
      if (path === `/api/frameworks/fw1/controls`) {
        return Promise.resolve({ data: [{ _id: "c1", name: "C1", requirement: "R1" }] });
      }
      if (path === `/api/projects/${projectId}/gap-responses`) {
        return Promise.resolve({ data: [] });
      }
      if (path === `/api/projects/${projectId}/gap-summary`) {
        return Promise.resolve({ data: { score: 0, totalControls: 1, answered: 0, missingControls: 1, recommendations: [] } });
      }
      return Promise.resolve({ data: null });
    });

    api.post.mockResolvedValueOnce({ data: { responses: [{ _id: "resp1", controlId: "c1", response: "YES", notes: "" }] } });

    render(
      <MemoryRouter initialEntries={[`/gap-analysis/${projectId}`]}>
        <Routes>
          <Route path="/gap-analysis/:projectId" element={<GapAnalysis />} />
        </Routes>
      </MemoryRouter>
    );

    // wait for controls to show
    await waitFor(() => expect(api.get).toHaveBeenCalledWith(`/api/projects/${projectId}`));
    await waitFor(() => expect(screen.getByText("C1")).toBeTruthy());

    // click YES - should call post to create response
    fireEvent.click(screen.getByText("YES"));
    await waitFor(() => expect(api.post).toHaveBeenCalled());
  });
});
