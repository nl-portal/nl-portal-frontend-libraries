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
  street: string | null | undefined,
  number: string | null | undefined,
  letter: string | null | undefined,
  addition: string | null | undefined,
): string => {
  if (street && number && letter && addition) {
    return `${street} ${number}${letter} ${addition}`;
  }
  if (street && number && letter) {
    return `${street} ${number}${letter}`;
  }
  if (street && number) {
    return `${street} ${number}`;
  }
  if (street) {
    return street;
  }

  return "";
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
