import {
  AppContext,
  Layout,
  PortalLink,
} from "@nl-portal/nl-portal-user-interface";
import { paths } from "../constants/paths";
import { useIntl } from "react-intl";
import { HeaderLogo } from "./HeaderLogo";
import { useContext } from "react";
import { themes } from "../constants/themes";

const CustomLayout = () => {
  const intl = useIntl();
  const { logoUrl } = useContext(AppContext);

  const logo = {
    href: paths.overview,
    children: logoUrl ? <img src={logoUrl} alt="logo" /> : <HeaderLogo />,
    "aria-label": "NL Portal",
    Link: PortalLink,
  };

  const legalData = [
    {
      label: intl.formatMessage({ id: "footer.legal.privacy" }),
      href: intl.formatMessage({ id: "footer.legal.privacy.url" }),
    },
    {
      label: intl.formatMessage({ id: "footer.legal.voorwaarden" }),
      href: intl.formatMessage({ id: "footer.legal.voorwaarden.url" }),
    },
    {
      label: intl.formatMessage({ id: "footer.legal.proclaimer" }),
      href: intl.formatMessage({ id: "footer.legal.proclaimer.url" }),
    },
    {
      label: intl.formatMessage({ id: "footer.legal.toegankelijkheid" }),
      href: intl.formatMessage({ id: "footer.legal.toegankelijkheid.url" }),
    },
    {
      label: intl.formatMessage({ id: "footer.legal.cookies" }),
      href: intl.formatMessage({ id: "footer.legal.cookies.url" }),
    },
    {
      label: intl.formatMessage({ id: "footer.legal.vacatures" }),
      href: intl.formatMessage({ id: "footer.legal.vacatures.url" }),
    },
    {
      label: intl.formatMessage({ id: "footer.legal.pers" }),
      href: intl.formatMessage({ id: "footer.legal.pers.url" }),
    },
  ];

  const contactData = {
    title: intl.formatMessage({ id: "footer.contact.title" }),
    links: [
      {
        label: intl.formatMessage({ id: "footer.contact.telefoon" }),
        href: "#telefoonnummer",
      },
      {
        label: intl.formatMessage({ id: "footer.contact.formulier" }),
        href: intl.formatMessage({ id: "footer.contact.formulier.url" }),
      },
    ],
    buttonLabel: intl.formatMessage({ id: "footer.contact.buttonlabel" }),
    href: intl.formatMessage({ id: "footer.contact.button.url" }),
  };

  return (
    <Layout
      paths={paths}
      themes={themes}
      footerData={{ legalData, contactData }}
      headerLogo={logo}
    />
  );
};

export default CustomLayout;
