import * as React from 'react';
import {Button} from '@gemeente-denhaag/components-react';
import {FormattedMessage} from 'react-intl';
import {LocaleContext} from '@nl-portal/nl-portal-localization';
import {FC, useContext} from 'react';
import {MobileMenuButton} from '../mobile-menu-button';

interface LanguageSwitcherProps {
  mobileMenu?: boolean;
}

const LanguageSwitcher: FC<LanguageSwitcherProps> = ({mobileMenu}) => {
  const {currentLocale, setCurrentLocale, supportedLocales} = useContext(LocaleContext);
  const currentLocaleIndex = supportedLocales.findIndex(locale => locale === currentLocale);
  const nextLocale = supportedLocales[currentLocaleIndex + 1] || supportedLocales[0];
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

export {LanguageSwitcher};
