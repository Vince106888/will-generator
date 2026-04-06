import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Review from "../pages/drafting/Review";

const { postMock, getMock } = vi.hoisted(() => ({
  postMock: vi.fn(),
  getMock: vi.fn()
}));

vi.mock("../lib/api", () => {
  return {
    api: {
      post: postMock,
      get: getMock
    }
  };
});

describe("Review drafting flow", () => {
  beforeEach(() => {
    postMock.mockReset();
    localStorage.clear();
    window.history.replaceState({}, "", "/drafting/review-result");
  });

  it("finalizes draft session from review", async () => {
    const user = userEvent.setup();
    postMock.mockResolvedValue({
      data: {
        id: "will-id",
        sessionId: "session-id",
        draft: "draft",
        complexity: { score: 1, level: "LOW", flags: [] },
        validity: ["check"]
      }
    });
    getMock.mockResolvedValue({
      data: {
        sessionId: "session-id",
        sourceMode: "AI",
        inputSnapshot: {
          draftingMode: "ai",
          draftingModeConfirmed: true
        },
        updatedAt: new Date().toISOString()
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

    localStorage.setItem(
      "esheriaDraftingSession",
      JSON.stringify({ sessionId: "session-id", resumeToken: "token", sourceMode: "AI" })
    );

    render(<Review />);

    await user.click(screen.getAllByRole("button", { name: /generate draft/i })[0]);

    await waitFor(() => expect(postMock).toHaveBeenCalledTimes(1));

    expect(postMock.mock.calls[0][0]).toBe("/api/v1/draft-sessions/session-id/finalize");

    expect(localStorage.getItem("willResult")).not.toBeNull();
    expect(window.location.pathname).toBe("/drafting/export-options");
  });
});
