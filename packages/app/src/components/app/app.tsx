import React from 'react';
import '@gemeente-denhaag/design-tokens-components';
import '@nl-portal/nl-portal-user-interface/dist/index.css';
import '../../styles/nl-portal-design-tokens.css';
import {KeycloakWrapper} from '@nl-portal/nl-portal-authentication';
import {LocalizationProvider} from '@nl-portal/nl-portal-localization';
import {ApiWrapper} from '@nl-portal/nl-portal-api';
import {
  AccountPage,
  CasePage,
  CasesPage,
  DocumentsPage,
  EditAccountPage,
  FormPage,
  FormsPage,
  Layout,
  NotificationsPage,
  OverviewPage,
  PortalFooter,
  PortalPage,
  TasksPage,
  TaskPage,
  ThemesPage,
} from '@nl-portal/nl-portal-user-interface';
import {ArchiveIcon, DocumentIcon, GridIcon, InboxIcon, UserIcon} from '@gemeente-denhaag/icons';
import {CUSTOM_MESSAGES} from '../../i18n';
import {ReactComponent as HeaderLogo} from '../../assets/header-logo.svg';
import {ReactComponent as HeaderLogoSmall} from '../../assets/header-logo-small.svg';
import Facet from '../../assets/facet.png';
import {config} from '../../config';
import StatusHistoryBackground from '../../assets/status-history-background.svg';

const pages: Array<PortalPage> = [
  {
    icon: <GridIcon />,
    pageComponent: <OverviewPage openFormsFormId={config.OPEN_FORMS_FORM_ID} />,
    path: '/',
    titleTranslationKey: 'overview',
    showInMenu: true,
    isHome: true,
  },
  {
    icon: <InboxIcon />,

    pageComponent: <NotificationsPage />,
    path: '/berichten',
    titleTranslationKey: 'notifications',
    showInMenu: true,
    showMessagesCount: true,
  },
  {
    icon: <ArchiveIcon />,
    pageComponent: <CasesPage />,
    path: '/zaken',
    titleTranslationKey: 'cases',
    showInMenu: true,
    children: [
      {
        icon: <ArchiveIcon />,
        pageComponent: (
          <CasePage
            statusHistoryFacet={<img src={Facet} alt="" />}
            statusHistoryBackground={<img src={StatusHistoryBackground} alt="" />}
          />
        ),
        path: '/zaak',
        titleTranslationKey: 'cases',
        showLinkToParent: true,
      },
      {
        icon: <ArchiveIcon />,
        pageComponent: <DocumentsPage />,
        path: '/zaak/documenten',
        titleTranslationKey: 'cases',
      },
    ],
  },
  {
    icon: <DocumentIcon />,
    pageComponent: <TasksPage />,
    path: '/taken',
    titleTranslationKey: 'tasks',
    showInMenu: true,
    children: [
      {
        icon: <DocumentIcon />,
        pageComponent: <TaskPage />,
        path: '/taak',
        titleTranslationKey: 'task',
        showLinkToParent: true,
      },
    ],
  },
  {
    icon: <DocumentIcon />,
    pageComponent: <ThemesPage />,
    path: '/themas',
    titleTranslationKey: 'themes',
    showInMenu: true,
  },
  {
    icon: <DocumentIcon />,
    pageComponent: <FormsPage />,
    path: '/formulieren',
    titleTranslationKey: 'forms',
    showInMenu: true,
  },
  {
    icon: <UserIcon />,
    pageComponent: (
      <AccountPage
        showInhabitantAmount={config.SHOW_INHABITANT_AMOUNT}
        addressResearchUrl={config.ADDRESS_RESEARCH_URL}
      />
    ),
    path: '/account',
    titleTranslationKey: 'account',
    showInMenu: true,
    children: [
      {
        icon: <UserIcon />,
        pageComponent: <EditAccountPage />,
        path: '/aanpassen',
        titleTranslationKey: 'account',
        showLinkToParent: true,
      },
    ],
  },
  {
    icon: <DocumentIcon />,
    pageComponent: (
      <FormPage
        openFormsBaseUrl={config.OPEN_FORMS_BASE_URL}
        openFormsEntryEnv={config.OPEN_FORMS_ENTRY_ENV}
        openFormsSdkUrl={config.OPEN_FORMS_SDK_URL}
        openFormsStylesUrl={config.OPEN_FORMS_STYLES_URL}
      />
    ),
    path: '/formulier',
    titleTranslationKey: 'form',
    showInMenu: false,
    children: [
      {
        titleTranslationKey: 'form',
        path: '/:slug',
        pageComponent: (
          <FormPage
            openFormsBaseUrl={config.OPEN_FORMS_BASE_URL}
            openFormsEntryEnv={config.OPEN_FORMS_ENTRY_ENV}
            openFormsSdkUrl={config.OPEN_FORMS_SDK_URL}
            openFormsStylesUrl={config.OPEN_FORMS_STYLES_URL}
          />
        ),
      },
    ],
  },
];

const footer: PortalFooter = [
  {
    titleTranslationKey: 'theHague',
    links: [
      {linkTranslationKey: 'goToTheHague', url: 'https://www.denhaag.nl/nl.htm', hrefLang: 'nl'},
      {linkTranslationKey: 'goToTheHague', url: 'https://www.denhaag.nl/en.htm', hrefLang: 'en'},
    ],
  },
  {
    titleTranslationKey: 'disclaimers',
    links: [
      {
        linkTranslationKey: 'accessibility',
        url: 'https://www.denhaag.nl/nl/toegankelijkheidsverklaring.htm',
        hrefLang: 'nl',
      },
      {
        linkTranslationKey: 'accessibility',
        url: 'https://www.denhaag.nl/en/toegankelijkheidsverklaring.htm',
        hrefLang: 'en',
      },
      {
        linkTranslationKey: 'dataProtection',
        url: 'https://www.denhaag.nl/nl/verklaring-inzake-gegevensbescherming.htm',
        hrefLang: 'nl',
      },
      {
        linkTranslationKey: 'dataProtection',
        url: 'https://www.denhaag.nl/en/data-protection-declaration.htm',
        hrefLang: 'en',
      },
      {
        linkTranslationKey: 'proclaimer',
        url: 'https://www.denhaag.nl/home/algemeen/proclaimer.htm',
        hrefLang: 'nl',
      },
      {
        linkTranslationKey: 'proclaimer',
        url: 'https://www.denhaag.nl/en/proclaimer.htm',
        hrefLang: 'en',
      },
    ],
  },
];

const App = () => (
  <div className={config.THEME_CLASS}>
    <KeycloakWrapper
      clientId={config.KEYCLOAK_CLIENT_ID}
      realm={config.KEYCLOAK_REALM}
      url={config.KEYCLOAK_URL}
      redirectUri={config.KEYCLOAK_REDIRECT_URI}
    >
      <ApiWrapper graphqlUri={config.GRAPHQL_URI} restUri={config.REST_URI}>
        <LocalizationProvider customMessages={CUSTOM_MESSAGES}>
          <Layout
            pages={pages}
            headerLogo={<HeaderLogo />}
            headerLogoSmall={<HeaderLogoSmall />}
            facet={<img src={Facet} alt="" />}
            footer={footer}
          />
        </LocalizationProvider>
      </ApiWrapper>
    </KeycloakWrapper>
  </div>
);

export {App};
