import { OpenProductProduct } from "@nl-portal/nl-portal-api";

export type DataObjectPath = `dataobject.${string}`;

export type DataMappingFn = (product: OpenProductProduct) => React.ReactNode;

export type DataMappingItem =
  | DataMappingFn
  | keyof OpenProductProduct
  | DataObjectPath;

export interface ProductSettings {
  productTypeSlug?: string;
  productTypeCodes: (string | undefined)[];
  titleTranslationId: string;
  headerTranslationIds: string[];
  dataMapping: DataMappingItem[];
}
