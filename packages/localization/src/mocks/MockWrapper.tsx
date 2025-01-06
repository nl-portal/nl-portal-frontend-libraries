import { IntlProvider } from "react-intl";
import { DEFAULT_LOCALES } from "../i18n/default-locales";
import { DEFAULT_MESSAGES } from "../i18n/messages/messages";
import LocaleContext from "../contexts/LocaleContext";
import { ReactNode, useState } from "react";

interface Props {
  children: ReactNode;
}

const MockWrapper = ({ children }: Props) => {
  const [currentLocale, setCurrentLocale] = useState(DEFAULT_LOCALES.ENGLISH);
  const [supportedLocales] = useState(Object.values([DEFAULT_LOCALES.ENGLISH]));

  const hrefLang = "en";
  const messages = DEFAULT_MESSAGES[currentLocale];

  return (
    <LocaleContext.Provider
      value={{ currentLocale, supportedLocales, setCurrentLocale, hrefLang }}
    >
      <IntlProvider
        locale={currentLocale}
        messages={messages}
        onError={() => {}}
      >
        {children}
      </IntlProvider>
    </LocaleContext.Provider>
  );
};

export default MockWrapper;
