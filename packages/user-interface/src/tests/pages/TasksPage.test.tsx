import { MockTasksPage } from "../mock/pages/TasksPage.mock";
import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { testPaths as paths } from "../../providers/TestProvider";

describe("TasksPage", () => {
  const takenAlgemeneInformatie = () => screen.getByText("OPEN TAAK 1");
  const taakAanvullendeInformatie = () => screen.getByText("OPEN TAAK 4");

  it("Shows an overview of all tasks", async () => {
    render(MockTasksPage());

    await waitFor(async () => {
      expect(takenAlgemeneInformatie()).toBeVisible();
    });

    expect(takenAlgemeneInformatie()).toBeVisible();
    expect(taakAanvullendeInformatie()).toBeVisible();
  });

  it("Allows me to continue to a task", async () => {
    render(MockTasksPage());

    await waitFor(async () => {
      expect(taakAanvullendeInformatie()).toBeVisible();
    });

    expect(screen.getByRole("link", { name: "OPEN TAAK 4" })).toHaveAttribute(
      "href",
      paths.case("66fecaa3-24b4-4739-a7c8-eb58f39e9aae"),
    );
  });
});
