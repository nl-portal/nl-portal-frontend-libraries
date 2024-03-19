import { describe, it, expect } from "vitest";
import FormPage from "./FormPage.tsx";
import { render, screen } from "@testing-library/react";
import { IntlProvider } from "react-intl";
import { Routes, Route, MemoryRouter } from "react-router-dom";

describe("FormPage", () => {
  it("is truthy", () => {
    expect(FormPage).toBeTruthy();
  });

  it("should render form not found", () => {
    render(
      <IntlProvider locale={"nl"}>
        <FormPage forms={[]} />
      </IntlProvider>
    );
    expect(screen.getByTestId("form-not-found")).toBeInTheDocument();
  });

  it("should render form", () => {
    const formId = "form-1";
    render(
      <IntlProvider locale={"nl"}>
        <MemoryRouter initialEntries={[`/formulieren/formulier/${formId}`]}>
          <Routes>
            <Route path="/formulieren/formulier/:id"
                   element={<FormPage forms={[`${formId}`]} />} />
          </Routes>
        </MemoryRouter>
      </IntlProvider>
    );
    expect(screen.getByTestId(`form-${formId}`)).toBeInTheDocument();
  });
});
