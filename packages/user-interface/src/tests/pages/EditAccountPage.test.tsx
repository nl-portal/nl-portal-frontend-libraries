import { describe, it, expect, beforeEach } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MockEditAccountPage } from "../mock/pages/EditAccountPage.mock";

describe("EditAccountPage", () => {
  const errorText = "een geldig telefoonnummer bestaat uit 10 cijfers";
  const inputField = () => screen.getByRole("textbox");
  const errorTextP = () => screen.queryByText(errorText);
  const saveButton = () => screen.getByText("Opslaan");

  beforeEach(() => {
    render(MockEditAccountPage());
  });

  it("should have a disabled save button if nothing is entered", () => {
    expect(saveButton().closest("button")).toBeDisabled();
  });

  it("should give an error msg when tekst is entered as a phone number", () => {
    expect(errorTextP()).toBeNull();
    expect(inputField()).not.toBeNull();

    fireEvent.change(inputField(), { target: { value: "hoiDitIsNietGeldig" } });

    expect(errorTextP()).toBeVisible();
    expect(saveButton().closest("button")).toBeDisabled();
  });

  it("should give an error msg when too many number are entered", () => {
    expect(errorTextP()).toBeNull();
    expect(inputField()).not.toBeNull();

    fireEvent.change(inputField(), { target: { value: "12345678910" } });

    expect(errorTextP()).toBeVisible();
    expect(saveButton().closest("button")).toBeDisabled();
  });

  it("should not give an error msg when 10 numbers are entered", async () => {
    expect(errorTextP()).toBeNull();
    expect(inputField()).not.toBeNull();

    fireEvent.change(inputField(), { target: { value: "0123456789" } });

    await waitFor(() => {
      expect(errorTextP()).toBeNull();
      expect(saveButton().closest("button")).toBeEnabled();
    });
  });

  it("should give an error msg when a special character is entered", () => {
    expect(errorTextP()).toBeNull();
    expect(inputField()).not.toBeNull();

    fireEvent.change(inputField(), { target: { value: "-012345678" } });

    expect(errorTextP()).toBeVisible();
    expect(saveButton().closest("button")).toBeDisabled();
  });
});
