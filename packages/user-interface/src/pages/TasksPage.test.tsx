import { MockTasksPage } from "./TasksPage.mock";
import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";

describe("TasksPage", () => {
  const taken = () =>
    screen.getAllByText("Aanleveren informatie");

  it("Shows an overview of all tasks", async () => {
    render(MockTasksPage());
    await waitFor(async () => {
      expect(taken()[0]).toBeVisible();
    });

    expect(screen.getAllByText("Aanleveren informatie")[0]).toHaveTextContent("Aanleveren informatie");
    expect(screen.getAllByText("Aanleveren informatie").length).toBe(2);
    expect(screen.getByText("Aanvullende informatie aanleveren")).toHaveTextContent("Aanvullende informatie aanleveren");
  });
});
