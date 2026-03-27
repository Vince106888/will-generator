import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import PersonalDetails from "../pages/drafting/PersonalDetails";

describe("Personal details step", () => {
  it("renders key fields", () => {
    render(<PersonalDetails />);
    expect(screen.getAllByText(/Personal details/i).length).toBeGreaterThan(0);
    expect(screen.getByPlaceholderText(/Wanjiku/i)).toBeInTheDocument();
  });
});
