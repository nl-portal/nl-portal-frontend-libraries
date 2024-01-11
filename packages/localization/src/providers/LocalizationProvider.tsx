import React from "react";
import { useState } from "react";
import { IntlProvider } from "react-intl";
import deepmerge from "deepmerge";
import { DEFAULT_LOCALES } from "../i18n/default-locales";
import LocaleContext from "../contexts/LocaleContext";
import { Locales } from "../interfaces/locales";
import { Messages } from "../interfaces/messages";
import { DEFAULT_MESSAGES } from "../i18n/messages/messages";

interface Props {
  children: React.ReactNode;
  customMessages?: Messages;
  customLocales?: Locales;
}

const LocalizationProvider = ({
  children,
  customMessages,
  customLocales,
}: Props) => {
  const LOCAL_STORAGE_LANG_KEY = "NL_PORTAL_LANG";
  const savedLocale = localStorage.getItem(LOCAL_STORAGE_LANG_KEY);

  const messages = customMessages
    ? deepmerge(DEFAULT_MESSAGES, customMessages)
    : DEFAULT_MESSAGES;
  const locales = customLocales || DEFAULT_LOCALES;

  const savedLocaleIndex = Object.values(locales).findIndex(
    (locale) => locale === savedLocale
  );
  const localeToUse =
    locales[
      Object.keys(locales)[savedLocaleIndex !== -1 ? savedLocaleIndex : 0]
    ];

  const [currentLocale, setCurrentLocale] = useState(localeToUse);
  const [supportedLocales] = useState(Object.values(locales));

  const hrefLang = currentLocale.toLocaleLowerCase().split("-")[0];

  localStorage.setItem(LOCAL_STORAGE_LANG_KEY, currentLocale);

  document.documentElement.lang = hrefLang;

  return (
    <LocaleContext.Provider
      value={{ currentLocale, supportedLocales, setCurrentLocale, hrefLang }}
    >
      <IntlProvider
        locale={currentLocale}
        messages={messages[currentLocale]}
        onError={(error) => {
          if (error.code === "MISSING_TRANSLATION") {
            console.log("Missing translation", error.message);
            return;
          }
          throw error;
        }}
      >
        {children}
      </IntlProvider>
    </LocaleContext.Provider>
  );
};

export default LocalizationProvider;
