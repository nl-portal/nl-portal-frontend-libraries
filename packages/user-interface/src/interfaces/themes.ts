export type Themes<
  ThemeSlug extends string = string,
  ProductTypeSlug extends string = string,
  ProductTypeCodes extends string = string,
> = Record<
  ThemeSlug,
  {
    slug: ThemeSlug;
    productTypes: Partial<
      Record<ProductTypeSlug, { slug: ProductTypeSlug; code: ProductTypeCodes }>
    >;
  }
>;
