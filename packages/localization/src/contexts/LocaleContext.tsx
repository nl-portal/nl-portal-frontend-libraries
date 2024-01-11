import React from "react";

interface LocaleContextInterface {
  currentLocale: string;
  supportedLocales: Array<string>;
  hrefLang: string;
  setCurrentLocale: (value: string) => void;
}

const LocaleContext = React.createContext<LocaleContextInterface>(
  {} as LocaleContextInterface
);

export default LocaleContext;
