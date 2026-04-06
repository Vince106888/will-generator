import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import Result from "../pages/Result";

const { getMock, postMock } = vi.hoisted(() => ({
  getMock: vi.fn(),
  postMock: vi.fn()
}));

vi.mock("../lib/api", () => {
  return {
    api: {
      get: getMock,
      post: postMock
    }
  };
});

describe("Result page", () => {
  beforeEach(() => {
    getMock.mockReset();
    postMock.mockReset();
    localStorage.clear();
    window.history.replaceState({}, "", "/drafting/review-result");
  });

  it("renders draft and checklist content", async () => {
    const stored = {
      id: "will-id",
      draft: "LAST WILL AND TESTAMENT\n\nSample draft",
      complexity: { score: 2, level: "MEDIUM", flags: ["MINORS_PRESENT"] },
      validity: ["Must be signed by the testator", "Must have at least 2 witnesses"]
    };
    localStorage.setItem("willResult", JSON.stringify(stored));
    localStorage.setItem(
      "esheriaDraftingSession",
      JSON.stringify({ sessionId: "session-id", resumeToken: "token", sourceMode: "AI" })
    );
    getMock.mockResolvedValue({
      data: {
        sessionId: "session-id",
        version: 1,
        draft: stored.draft,
        complexity: stored.complexity,
        validity: stored.validity,
        willId: "will-id"
      }
    });

    render(<Result />);

    await waitFor(() => {
      expect(screen.queryByText(/Refreshing your draft/i)).not.toBeInTheDocument();
    });
    expect(screen.getAllByText(/Review \+ result/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Draft preview/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Complexity check/i)).toBeInTheDocument();
  });
});
