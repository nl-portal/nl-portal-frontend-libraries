export interface Paths {
  noMatch: string;
  overview: string;
  cases: string;
  case: (id?: string | number) => string;
  tasks: string;
  task: (id?: string | number) => string;
  messages: string;
  message: (id?: string | number) => string;
  themeOverview: (slug?: string) => string;
  themeList: (slug?: string, productTypeSlug?: string) => string;
  themeDetails: (slug?: string, id?: string | number) => string;
  themeHistory: (slug?: string, id?: string | number) => string;
  themeMutate: (slug?: string, id?: string | number) => string;
  account: string;
  changeContactInfo: string;
  changeNotifications: string;
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: ((...args: any[]) => string) | string | undefined;
}
