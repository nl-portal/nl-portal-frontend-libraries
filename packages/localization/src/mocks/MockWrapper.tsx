import { IntlProvider } from "react-intl";
import { DEFAULT_LOCALES } from "../i18n/default-locales";
import { DEFAULT_MESSAGES } from "../i18n/messages/messages";

interface Props {
  children: React.ReactNode;
}

const MockWrapper = ({ children }: Props) => {
  const locale = DEFAULT_LOCALES.ENGLISH;
  const messages = DEFAULT_MESSAGES[locale];

  return (
    <IntlProvider locale={locale} messages={messages}>
      {children}
    </IntlProvider>
  );
};

export default MockWrapper;
