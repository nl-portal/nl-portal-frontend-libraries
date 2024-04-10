export interface Paths {
  overview: string;
  cases: string;
  case: (id?: string | number) => string;
  tasks: string;
  task: (id?: string | number) => string;
  notifications: string;
  themeOverview: (type?: string) => string;
  themeDetails: (type?: string, id?: string | number) => string;
  themeList: (type?: string) => string;
  account: string;
  editAccount: string;
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: ((...args: any[]) => string) | string | undefined;
}
