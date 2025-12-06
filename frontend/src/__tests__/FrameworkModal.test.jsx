import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import FrameworkModal from "../components/Frameworks/FrameworkModal";

test("FrameworkModal renders data and closes", () => {
  const fw = { _id: "1", name: "ISO 27001", year: 2022, sector: "Security", description: "desc" };
  const onClose = vi.fn();

  const { getByText } = render(
    <MemoryRouter>
      <FrameworkModal framework={fw} onClose={onClose} />
    </MemoryRouter>
  );

  expect(getByText("ISO 27001")).toBeTruthy();

  fireEvent.click(getByText("Close"));
  expect(onClose).toHaveBeenCalled();
});
