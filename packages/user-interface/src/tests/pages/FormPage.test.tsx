import { describe, it, expect } from "vitest";
import {
  MockFormPage,
  MockFormPageEmpty,
} from "../mock/pages/FormPage.mock.tsx";
import { render, screen, waitFor } from "@testing-library/react";

describe("FormPage", () => {
  it("should render the get-forms query and show empty result", async () => {
    render(MockFormPageEmpty());
    await waitFor(() => {});
    expect(screen.getByTestId(`form-not-found-title`)).toBeInTheDocument();
    expect(screen.getByTestId(`form-not-found`)).toBeInTheDocument();
  });

  it("should render the get-forms query", async () => {
    render(MockFormPage());
    await waitFor(() => {});
    expect(screen.getByTestId(`form-title`)).toBeInTheDocument();
    expect(screen.getByTestId(`form-rendered`)).toBeInTheDocument();
  });
});
