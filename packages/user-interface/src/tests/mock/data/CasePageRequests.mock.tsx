import cloneDeep from "lodash.clonedeep";
import {
  getObjectContactMomenten,
  getPersoon,
  getTakenWithId,
  getZaak,
} from "./AllRequests.mock";

export const mocksRequestWithAll = [
  getZaak,
  getObjectContactMomenten,
  getTakenWithId,
  getPersoon,
];

const cloneZaken = () => {
  const clone = cloneDeep(getZaak);
  if (clone.result.data) {
    clone.result.data.getZaak.documenten = [];
  }
  return clone;
};

const cloneContactmomenten = () => {
  const cloneConctactmomenten = cloneDeep(getObjectContactMomenten);
  if (cloneConctactmomenten.result.data) {
    cloneConctactmomenten.result.data.getObjectContactMomenten.content = [];
  }
  return cloneConctactmomenten;
};

export const mocksRequestWithoutDocuments = [
  cloneZaken(),
  getObjectContactMomenten,
  getTakenWithId,
  getPersoon,
];

export const mocksRequestWithoutContactMomenten = [
  getZaak,
  cloneContactmomenten(),
  getTakenWithId,
  getPersoon,
];
