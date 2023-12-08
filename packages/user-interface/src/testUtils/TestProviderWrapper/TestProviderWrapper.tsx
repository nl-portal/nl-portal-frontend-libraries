import {Locales, LocalizationProvider} from '@nl-portal/nl-portal-localization';
import {ReactElement} from 'react';
import {UserInformationProvider} from '../../providers';
import {CUSTOM_MESSAGES} from '../custom-messages/custom-messages';
import React from 'react';

export const TestProviderWrapper = ({children}: {children: React.ReactNode}): ReactElement => {
  const LOCALES_TEST: Locales = {
    DUTCH: 'nl-NL',
  };

  return (
    <LocalizationProvider customMessages={CUSTOM_MESSAGES} customLocales={LOCALES_TEST}>
      <UserInformationProvider>{children}</UserInformationProvider>
    </LocalizationProvider>
  );
};
