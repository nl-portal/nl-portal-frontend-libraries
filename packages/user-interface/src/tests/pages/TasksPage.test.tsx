import { MockTasksPage } from "../mock/pages/TasksPage.mock";
import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { testPaths as paths } from "../../providers/TestProvider";

describe("TasksPage", () => {
  const takenAlgemeneInformatie = () =>
    screen.getAllByText("Aanleveren informatie");
  const taakAanvullendeInformatie = () =>
    screen.getByText("Aanvullende informatie aanleveren");

  it("Shows an overview of all tasks", async () => {
    render(MockTasksPage());
    await waitFor(async () => {
      expect(takenAlgemeneInformatie()[0]).toBeVisible();
    });

    expect(takenAlgemeneInformatie().length).toBe(3);
    expect(taakAanvullendeInformatie()).toBeVisible();
  });

  it("Allows me to continue to a task", async () => {
    render(MockTasksPage());
    await waitFor(async () => {
      expect(taakAanvullendeInformatie()).toBeVisible();
    });

    expect(
      screen.getByRole("link", { name: "Aanvullende informatie aanleveren" }),
    ).toHaveAttribute(
      "href",
      paths.task("021118b9-bc59-11ee-b651-366634c97df6"),
    );
  });
});
