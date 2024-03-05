export interface Paths {
  overview: string;
  cases: string;
  case: (id?: string | number) => string;
  tasks: string;
  task: (id?: string | number) => string;
  notifications: string;
  themes: string;
  account: string;
  editAccount: string;
  forms: string;
  form: (id?: string | number) => string;
  [key: string]: ((...args: any[]) => string) | string | undefined;
}
