import { OpenProductProduct } from "@nl-portal/nl-portal-api";
import { ReactNode } from "react";
import {
  DataMappingFn,
  DataMappingItem,
  DataObjectPath,
} from "../interfaces/product-types";

const isMappingFn = (m: DataMappingItem): m is DataMappingFn =>
  typeof m === "function";

const isDataObjectPath = (m: DataMappingItem): m is DataObjectPath =>
  typeof m === "string" && m.startsWith("dataobject.");

export const getProductValue = (
  product: OpenProductProduct,
  map: DataMappingItem,
): ReactNode => {
  if (isMappingFn(map)) {
    return map(product);
  }

  if (isDataObjectPath(map)) {
    const value = map
      .split(".")
      .slice(1)
      .reduce((acc, key) => acc?.[key], product.dataobject);

    return value == null ? null : String(value);
  }

  const value = product[map];
  return value == null ? null : String(value);
};
