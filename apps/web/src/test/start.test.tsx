import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Review from "../pages/drafting/Review";

const { postMock } = vi.hoisted(() => ({
  postMock: vi.fn()
}));

vi.mock("../lib/api", () => {
  return {
    api: {
      post: postMock,
      get: vi.fn()
    }
  };
});

describe("Review drafting flow", () => {
  beforeEach(() => {
    postMock.mockReset();
    localStorage.clear();
    window.history.replaceState({}, "", "/drafting/review");
  });

  it("submits payload from review", async () => {
    const user = userEvent.setup();
    postMock.mockResolvedValue({
      data: {
        id: "will-id",
        draft: "draft",
        complexity: { score: 1, level: "LOW", flags: [] },
        validity: ["check"]
      }
    });

    localStorage.setItem(
      "esheriaDraftingData",
      JSON.stringify({
        legalName: "Jane Doe",
        idNumber: "12345678",
        dateOfBirth: "1980-01-01",
        email: "jane@example.com",
        phone: "+254700000000",
        address: "Nairobi",
        county: "Nairobi",
        maritalStatus: "married",
        spouseName: "John Doe",
        dependantsNotes: "Guardian for minors",
        hasMinors: true,
        multipleHouseholds: false,
        executors: [{ name: "John Doe", relationship: "Spouse", phone: "+254700000001" }],
        beneficiaries: [{ name: "Alice", relationship: "Daughter", share: "50%" }],
        assets: [{ label: "House", location: "Nairobi", notes: "" }],
        distributionNotes: "Split equally",
        guardians: [{ name: "Mary", relationship: "Sister", notes: "" }],
        specialWishes: "Keep it simple",
        funeralWishes: "Private ceremony"
      })
    );

    render(<Review />);

    await user.click(screen.getAllByRole("button", { name: /generate draft/i })[0]);

    await waitFor(() => expect(postMock).toHaveBeenCalledTimes(1));

    const payload = postMock.mock.calls[0][1];
    expect(payload).toMatchObject({
      name: "Jane Doe",
      executor: "John Doe",
      assets: ["House: Nairobi"],
      beneficiaries: ["Alice"],
      hasMinors: true,
      multipleHouseholds: false,
      instructions: {
        funeralWishes: "Private ceremony"
      }
    });
    expect(payload.instructions.notes).toContain("Guardian for minors");
    expect(payload.instructions.notes).toContain("Keep it simple");

    expect(localStorage.getItem("willResult")).not.toBeNull();
    expect(window.location.pathname).toBe("/drafting/generated");
  });
});
