import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import {
  MockFormsPage,
  MockFormsPageEmpty,
} from "../mock/pages/FormsPage.mock.tsx";

describe("FormsPage", () => {
  it("should render the get-forms query", async () => {
    render(MockFormsPage());
    await waitFor(() => {
      expect(screen.getByText("Forms")).toBeInTheDocument();
    });
    expect(screen.getByText("Available forms")).toBeInTheDocument();
    expect(screen.getByTestId(`forms-item-start1`)).toBeInTheDocument();
    expect(screen.getByTestId(`forms-item-start2`)).toBeInTheDocument();
    expect(screen.getByTestId(`forms-item-start3`)).toBeInTheDocument();
  });

  it("should render the get-forms query and show empty", async () => {
    render(MockFormsPageEmpty());
    await waitFor(() => {
      expect(screen.getByText("Forms")).toBeInTheDocument();
    });
    expect(screen.getByTestId(`empty-forms`)).toBeInTheDocument();
  });
});
