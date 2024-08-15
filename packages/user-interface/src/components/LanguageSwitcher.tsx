import { Button } from "@gemeente-denhaag/button";
import { FormattedMessage } from "react-intl";
import { LocaleContext } from "@nl-portal/nl-portal-localization";
import { useContext } from "react";
import MobileMenuButton from "./MobileMenuButton";

interface LanguageSwitcherProps {
  mobileMenu?: boolean;
}

const LanguageSwitcher = ({ mobileMenu }: LanguageSwitcherProps) => {
  const { currentLocale, setCurrentLocale, supportedLocales } =
    useContext(LocaleContext);
  const currentLocaleIndex = supportedLocales.findIndex(
    (locale) => locale === currentLocale,
  );
  const nextLocale =
    supportedLocales[currentLocaleIndex + 1] || supportedLocales[0];
  const onClick = () => setCurrentLocale(nextLocale);
  const message = <FormattedMessage id={`locales.${nextLocale}`} />;

  return !mobileMenu ? (
    <Button variant="secondary-action" onClick={onClick}>
      {message}
    </Button>
  ) : (
    <MobileMenuButton onClick={onClick}>{message}</MobileMenuButton>
  );
};

export default LanguageSwitcher;
