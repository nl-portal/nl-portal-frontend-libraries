export interface Paths {
  noMatch: string;
  overview: string;
  cases: string;
  case: (id?: string | number) => string;
  tasks: string;
  task: (id?: string | number) => string;
  messages: string;
  message: (id?: string | number) => string;
  products: string;
  themeOverview: (themeSlug: string) => string;
  themeList: (themeSlug: string, productTypeSlug?: string) => string;
  themeDetails: (
    themeSlug: string,
    productSlug?: string,
    id?: string | number,
  ) => string;
  themeHistory: (
    themeSlug: string,
    productSlug?: string,
    id?: string | number,
  ) => string;
  themeMutate: (
    themeSlug: string,
    productSlug?: string,
    id?: string | number,
  ) => string;
  account: string;
  changeContactInfo: (type?: string) => string;
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: ((...args: any[]) => string) | string | undefined;
}
