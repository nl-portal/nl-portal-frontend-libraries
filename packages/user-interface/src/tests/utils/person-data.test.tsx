import { describe, it, expect } from "vitest";
import {
  getFullName,
  getNationalitiesString,
  getPostalCodeCityString,
  getStreetString,
} from "../../utils/person-data";

describe("getNationalitiesString", () => {
  it("should return empty string when input is null", () => {
    const nationalitiesString = getNationalitiesString(null);
    expect(nationalitiesString).toBe("");
  });

  it("should return empty string when input is empty array", () => {
    const nationalitiesString = getNationalitiesString([]);
    expect(nationalitiesString).toBe("");
  });

  it("should return correct string when input is single nationality", () => {
    const nationalitiesString = getNationalitiesString([
      { nationaliteit: { omschrijving: "Nederlandse" } },
    ]);
    expect(nationalitiesString).toBe("Nederlandse");
  });

  it("should return correct string when input is multiple nationalities", () => {
    const nationalitiesString = getNationalitiesString([
      { nationaliteit: { omschrijving: "Nederlandse" } },
      { nationaliteit: { omschrijving: "Britse" } },
      { nationaliteit: { omschrijving: "Chinese" } },
    ]);
    expect(nationalitiesString).toBe("Nederlandse, Britse, Chinese");
  });

  it("should return correct string when input is multiple nationalities with empty values", () => {
    const nationalitiesString = getNationalitiesString([
      { nationaliteit: { omschrijving: "Nederlandse" } },
      { nationaliteit: {} },
      { nationaliteit: { omschrijving: "Chinese" } },
      { nationaliteit: {} },
    ]);
    expect(nationalitiesString).toBe("Nederlandse, Chinese");
  });
});

describe("getStreetString", () => {
  it("should return empty string when all input is null", () => {
    const streetString = getStreetString(null, null, null, null);
    expect(streetString).toBe("");
  });

  it("should return only the street name when only street input is valid", () => {
    const streetString = getStreetString("Kerkweg", null, null, null);
    expect(streetString).toBe("Kerkweg");
  });

  it("should return street name and number when only street and number inputs are valid", () => {
    const streetString = getStreetString("Kerkweg", "1", null, null);
    expect(streetString).toBe("Kerkweg 1");
  });

  it("should return street name, number and letter when only street, number and letter inputs are valid", () => {
    const streetString = getStreetString("Kerkweg", "1", "A", null);
    expect(streetString).toBe("Kerkweg 1A");
  });

  it("should return street name, number, letter and addition when all inputs are valid", () => {
    const streetString = getStreetString("Kerkweg", "1", "A", "Bis");
    expect(streetString).toBe("Kerkweg 1A Bis");
  });
});

describe("getPostalCodeCityString", () => {
  it("should return empty string when all input is null", () => {
    const postalCodeCityString = getPostalCodeCityString(null, null);
    expect(postalCodeCityString).toBe("");
  });

  it("should return only city when postal code is null", () => {
    const postalCodeCityString = getPostalCodeCityString(null, "Amsterdam");
    expect(postalCodeCityString).toBe("Amsterdam");
  });

  it("should return string in correct format when all input is valid", () => {
    const postalCodeCityString = getPostalCodeCityString("0000AA", "Amsterdam");
    expect(postalCodeCityString).toBe("0000AA Amsterdam");
  });
});

describe("getFullName", () => {
  it("should return empty string when input all is null", () => {
    const nameString = getFullName();
    expect(nameString).toBe("");
  });

  it("should return correct string when all input is valid", () => {
    const nameString = getFullName({
      voornamen: "Jan",
      officialLastName: "de Vries",
    });
    expect(nameString).toBe("Jan de Vries");
  });

  it("should return correct string when first name is null and other input is valid", () => {
    const nameString = getFullName({
      officialLastName: "de Vries",
    });
    expect(nameString).toBe("de Vries");
  });

  it("should return correct string when only first name input is valid", () => {
    const nameString = getFullName({
      voornamen: "Jan",
    });
    expect(nameString).toBe("Jan");
  });
});
