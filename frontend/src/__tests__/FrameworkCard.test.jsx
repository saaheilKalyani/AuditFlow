import React from "react";
import { render, fireEvent } from "@testing-library/react";
import FrameworkCard from "../components/Frameworks/FrameworkCard";

test("FrameworkCard displays name and triggers click", () => {
  const fw = { name: "ISO 27001", year: 2022, sector: "Security", description: "desc" };
  const onClick = vi.fn();

  const { getByText } = render(
    <FrameworkCard framework={fw} onClick={onClick} />
  );

  fireEvent.click(getByText("ISO 27001"));

  expect(onClick).toHaveBeenCalledTimes(1);
});
