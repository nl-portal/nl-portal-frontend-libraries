import { describe, it, expect } from "vitest";
import FormsPage from "./FormsPage.tsx";
import { render, screen } from "@testing-library/react";
import { RouterProvider } from "react-router-dom";
import { IntlProvider } from "react-intl";

describe("FormsPage", () => {
  it("is truthy", () => {
    expect(FormsPage).toBeTruthy();
  });

  it("should render empty states", () => {
    render(
      <IntlProvider locale={'nl'}>
        <FormsPage forms={[]} />
      </IntlProvider>
    );
    const emptyForms = screen.getByTestId('empty-forms');
    expect(emptyForms).toBeInTheDocument();
    // screen.debug();
  });

  it("should render forms list", () => {
    render(
      <IntlProvider locale={'nl'}>
        <FormsPage forms={["form"]} />
      </IntlProvider>
    );
    const listForms = screen.getByTestId('list-forms');
    const formsItem = screen.getByTestId('forms-item-form');
    expect(listForms).toBeInTheDocument();
    expect(formsItem).toBeInTheDocument();
    // screen.debug();
  });
});
