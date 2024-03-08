import { describe, it, expect } from "vitest";
import FormsPage from "./FormsPage.tsx";
import { render, screen } from "@testing-library/react";
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
    expect(screen.getByTestId('empty-forms')).toBeInTheDocument();
  });

  it("should render forms list", () => {
    render(
      <IntlProvider locale={'nl'}>
        <FormsPage forms={["form-1", "form-2"]} />
      </IntlProvider>
    );
    expect(screen.getByTestId('list-forms')).toBeInTheDocument();
    expect(screen.getByTestId('forms-item-form-1')).toBeInTheDocument();
    expect(screen.getByTestId('forms-item-form-2')).toBeInTheDocument();
    expect(screen.getByText("forms.form-1")).toBeVisible();
    expect(screen.getByText("forms.form-2")).toBeVisible();
    screen.debug();
  });
});
