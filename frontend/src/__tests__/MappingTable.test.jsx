import React from "react";
import { render, screen } from "@testing-library/react";
import MappingTable from "../components/Mapping/MappingTable";

const mockMapping = {
  mappings: [
    {
      frameworkA: { name: "ISO 9001" },
      frameworkB: { name: "ISO 27001" },
      pairs: [
        {
          source: { _id: "s1", name: "Control 1", controlId: "ISO9001_1" },
          target: { name: "Control 1", controlId: "ISO27001_1" },
          score: 60,
        },
        {
          source: { _id: "s2", name: "Control 2", controlId: "ISO9001_2" },
          target: null,
          score: null,
        },
      ],
    },
  ],
};

test("renders header and rows", () => {
  render(
    <MappingTable mapping={mockMapping} search="" statusFilter="ALL" />
  );

  expect(screen.getByText("ISO 9001 Controls")).toBeTruthy();
  expect(screen.getByText("Control 1")).toBeTruthy();
  expect(screen.getByText("Control 2")).toBeTruthy();
});
