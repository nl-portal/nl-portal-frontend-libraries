import { describe, it, expect } from "vitest";
import FormPage from "./FormPage.tsx";
import { render, screen } from "@testing-library/react";
import { IntlProvider } from "react-intl";

describe("FormPage", () => {
  it("is truthy", () => {
    expect(FormPage).toBeTruthy();
  });

  it("should render form not found", () => {
    render(
      <IntlProvider locale={'nl'}>
        <FormPage forms={[]} />
      </IntlProvider>
    );
    const formNotFound = screen.getByTestId('form-not-found');
    expect(formNotFound).toBeInTheDocument();
  });
});
