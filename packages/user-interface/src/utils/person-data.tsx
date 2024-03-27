import {
  PersoonGeboorteDatum,
  PersoonNaam,
  PersoonNationaliteiten,
} from "@nl-portal/nl-portal-api";
import { ReactElement } from "react";
import LocaleDate from "../components/LocaleDate";
import { MockWrapper } from "@nl-portal/nl-portal-localization";

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

const getLocaleDateOfBirth = (
  dateOfBirth: PersoonGeboorteDatum | null | undefined,
): string | ReactElement => {
  if (dateOfBirth?.jaar && dateOfBirth?.maand && dateOfBirth?.dag) {
    return (
      <MockWrapper>
        <LocaleDate
          date={
            new Date(dateOfBirth.jaar, dateOfBirth.maand - 1, dateOfBirth.dag)
          }
        />
      </MockWrapper>
    );
  }

  return "";
};

const capitalizeFirstLetter = (text: string): string =>
  text.charAt(0).toUpperCase() + text.slice(1);

const getNameString = (
  name: PersoonNaam | null | undefined,
  returnType: "fullName" | "firstNames" | "lastName" = "fullName",
): string => {
  const returnFullName = returnType === "fullName";
  const returnLastName = returnType === "lastName";
  const returnFirstName = returnType === "firstNames";
  const firstNames = name?.voornamen;
  const prefix = name?.voorvoegsel;
  const lastName = name?.geslachtsnaam;
  const fullNameWithPrefix = `${firstNames} ${prefix} ${lastName}`;
  const fullName = `${firstNames} ${lastName}`;
  const lastNameWithPrefix = capitalizeFirstLetter(`${prefix} ${lastName}`);

  if (returnFullName || returnLastName) {
    if (returnFullName && firstNames && prefix && lastName) {
      return fullNameWithPrefix;
    }
    if (returnFullName && firstNames && lastName) {
      return fullName;
    }
    if (returnFullName && firstNames) {
      return firstNames;
    }
    if (prefix && lastName) {
      return lastNameWithPrefix;
    }
    if (lastName) {
      return lastName;
    }
  }

  if (returnFirstName && firstNames) {
    return firstNames;
  }

  return "";
};

export {
  getNationalitiesString,
  getStreetString,
  getPostalCodeCityString,
  getLocaleDateOfBirth,
  capitalizeFirstLetter,
  getNameString,
};
