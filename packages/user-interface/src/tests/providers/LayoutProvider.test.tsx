import { describe, it, expect } from "vitest";
import { LayoutProvider } from "../../contexts/LayoutContext";

describe("LayoutProvider", () => {
  it("is truthy", () => {
    expect(LayoutProvider).toBeTruthy();
  });
});
