import { Footer as DenhaagFooter } from "@gemeente-denhaag/footer";
import {
  FacebookIcon,
  TwitterXIcon,
  LinkedInIcon,
  InstagramIcon,
  YouTubeIcon,
} from "@gemeente-denhaag/icons";
import { useIntl } from "react-intl";

const Footer = () => {
  const intl = useIntl();

  const footerLegalData = [
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

  const footerSocialData = {
    title: intl.formatMessage({ id: "footer.social.title" }),
    links: [
      {
        icon: <FacebookIcon />,
        label: intl.formatMessage({ id: "footer.social.facebook" }),
        href: "https://www.facebook.com/gemeenteDH/",
      },
      {
        icon: <TwitterXIcon />,
        label: intl.formatMessage({ id: "footer.social.twitter" }),
        href: "https://twitter.com/gemeentedenhaag",
      },
      {
        icon: <LinkedInIcon />,
        label: intl.formatMessage({ id: "footer.social.linkedin" }),
        href: "https://nl.linkedin.com/company/gemeente-den-haag",
      },
      {
        icon: <InstagramIcon />,
        label: intl.formatMessage({ id: "footer.social.instagram" }),
        href: "https://www.instagram.com/gemeentedenhaag/",
      },
      {
        icon: <YouTubeIcon />,
        label: intl.formatMessage({ id: "footer.social.youtube" }),
        href: "https://www.youtube.com/channel/UC5_HpKvZl7Oxr_UimTfC2Jg",
      },
    ],
  };

  const newsletterData = {
    title: intl.formatMessage({ id: "footer.newsletter.title" }),
    text: intl.formatMessage({ id: "footer.newsletter.text" }),
    buttonLabel: intl.formatMessage({ id: "footer.newsletter.buttonlabel" }),
    href: intl.formatMessage({ id: "footer.newsletter.button.url" }),
  };

  const contactData = {
    title: intl.formatMessage({ id: "footer.contact.title" }),
    links: [
      {
        label: intl.formatMessage({ id: "footer.contact.telefoon" }),
        href: "tel:14070",
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
    <DenhaagFooter
      legalData={footerLegalData}
      newsletterData={newsletterData}
      contactData={contactData}
      socialData={footerSocialData}
    />
  );
};

export default Footer;
