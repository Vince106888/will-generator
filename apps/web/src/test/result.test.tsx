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
    window.history.replaceState({}, "", "/wills/result");
  });

  it("renders draft and checklist content", async () => {
    const stored = {
      id: "will-id",
      draft: "LAST WILL AND TESTAMENT\n\nSample draft",
      complexity: { score: 2, level: "MEDIUM", flags: ["MINORS_PRESENT"] },
      validity: ["Must be signed by the testator", "Must have at least 2 witnesses"]
    };
    localStorage.setItem("willResult", JSON.stringify(stored));
    getMock.mockResolvedValue({ data: stored });

    render(<Result />);

    await waitFor(() => {
      expect(screen.queryByText(/Refreshing your draft/i)).not.toBeInTheDocument();
    });
    expect(screen.getByText(/Review your will draft/i)).toBeInTheDocument();
    expect(screen.getByText(/LAST WILL AND TESTAMENT/i)).toBeInTheDocument();
    expect(screen.getByText(/Kenya validity checklist/i)).toBeInTheDocument();
  });
});
