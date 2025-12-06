import React from "react";
import { render, fireEvent } from "@testing-library/react";
import MappingFilters from "../components/Mapping/MappingFilters";

test("filters update callback", () => {
  const onSearch = vi.fn();
  const onStatusChange = vi.fn();

  const { getByPlaceholderText, getByRole } = render(
    <MappingFilters
      search=""
      onSearch={onSearch}
      statusFilter="ALL"
      onStatusChange={onStatusChange}
    />
  );

  fireEvent.change(getByPlaceholderText("Search control name..."), {
    target: { value: "abc" },
  });
  expect(onSearch).toHaveBeenCalledWith("abc");

  // select dropdown by role
  const select = getByRole("combobox");
  fireEvent.change(select, { target: { value: "UNMAPPED" } });

  expect(onStatusChange).toHaveBeenCalledWith("UNMAPPED");
});
