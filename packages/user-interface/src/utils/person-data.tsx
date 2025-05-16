import { PersoonNaam, PersoonNationaliteiten } from "@nl-portal/nl-portal-api";

const getNationalitiesString = (
  nationalities: Array<PersoonNationaliteiten> | undefined | null,
): string => {
  if (Array.isArray(nationalities)) {
    return nationalities
      .map((nationality) => nationality?.nationaliteit?.omschrijving)
      .filter((nationalityString) => nationalityString)
      .reduce((accumulatedString, currentNationalityString) => {
        if (accumulatedString === "") {
          return currentNationalityString;
        }
        return `${accumulatedString}, ${currentNationalityString}`;
      }, "") as string;
  }

  return "";
};

const getStreetString = (
  street?: string | null,
  number?: string | null,
  letter?: string | null,
  addition?: string | null,
): string => {
  const houseNr = number ? `${number}${letter ?? ""}` : null;
  return [street, houseNr, addition].filter(Boolean).join(" ");
};

const getPostalCodeCityString = (
  postalCode: string | null | undefined,
  city: string | null | undefined,
): string => {
  if (city) {
    if (postalCode) {
      return `${postalCode} ${city}`;
    }

    return city;
  }

  return "";
};

const capitalizeFirstLetter = (text: string): string =>
  text.charAt(0).toUpperCase() + text.slice(1);

const getFullName = (
  name?: Pick<PersoonNaam, "voornamen" | "officialLastName">,
) => {
  const firstNames = name?.voornamen;
  const officialLastName = name?.officialLastName;
  const fullName = `${firstNames} ${officialLastName}`;

  if (firstNames && officialLastName) return fullName;
  if (firstNames) return firstNames;
  if (officialLastName) return officialLastName;
  return "";
};

export {
  getNationalitiesString,
  getStreetString,
  getPostalCodeCityString,
  capitalizeFirstLetter,
  getFullName,
};
