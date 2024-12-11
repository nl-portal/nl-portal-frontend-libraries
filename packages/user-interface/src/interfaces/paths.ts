export interface Paths {
  noMatch: string;
  overview: string;
  cases: string;
  case: (id?: string | number) => string;
  tasks: string;
  task: (id?: string | number) => string;
  messages: string;
  message: (id?: string | number) => string;
  themeOverview: (type?: string) => string;
  themeDetails: (type?: string, id?: string | number) => string;
  themeSub: (type?: string, slug?: string) => string;
  account: string;
  editAccount: string;
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: ((...args: any[]) => string) | string | undefined;
}
