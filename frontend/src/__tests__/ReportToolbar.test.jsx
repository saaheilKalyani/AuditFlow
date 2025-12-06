import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import ReportToolbar from "../components/Reports/ReportToolbar";
import api from "../services/api";

vi.mock("../services/api", () => ({
  default: {
    get: vi.fn()
  }
}));

test("download pdf and json", async () => {
  api.get.mockResolvedValue({ data: new Blob(["x"]), headers: { "content-type": "application/pdf" } });

  const { getByText } = render(<ReportToolbar projectId="proj1" />);

  fireEvent.click(getByText("Export JSON"));
  await waitFor(() => expect(api.get).toHaveBeenCalledWith("/api/reports/proj1/json", { responseType: "blob" }));

  fireEvent.click(getByText("Print / Download PDF"));
  await waitFor(() => expect(api.get).toHaveBeenCalledWith("/api/reports/proj1/pdf", { responseType: "blob" }));
});
