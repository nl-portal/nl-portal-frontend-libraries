import { Paragraph } from "@gemeente-denhaag/typography";
import PageGrid from "../components/PageGrid";
import PageHeader from "../components/PageHeader";
import Link from "@gemeente-denhaag/link";
import { useOutletContext } from "react-router-dom";
import { RouterOutletContext } from "../interfaces/router-outlet-context";
import PortalLink from "../components/PortalLink";
import Heading from "../components/Heading";
import { FormattedMessage, useIntl } from "react-intl";
import { AnchorHTMLAttributes } from "react";

interface Props {
  contactLink?: AnchorHTMLAttributes<HTMLAnchorElement>;
}

const NoMatchPage = ({ contactLink }: Props) => {
  const intl = useIntl();
  const { paths } = useOutletContext<RouterOutletContext>();

  return (
    <PageGrid>
      <PageHeader title={<FormattedMessage id="noMatchPage.title" />}>
        <Paragraph>
          <FormattedMessage
            id="noMatchPage.text"
            values={{
              link: (chunks) => (
                <>
                  <br />
                  <br />
                  <Link Link={PortalLink} href={paths.overview}>
                    {chunks}
                  </Link>
                </>
              ),
            }}
          />
        </Paragraph>
      </PageHeader>
      {contactLink && (
        <section>
          <Heading as="h2" size="h3">
            <FormattedMessage id="noMatchPage.contact.title" />
          </Heading>
          <Paragraph>
            <FormattedMessage
              id="noMatchPage.contact.text"
              values={{
                link: (chunks) => (
                  <Link
                    href={intl.formatMessage({
                      id: "noMatchPage.contact.href",
                    })}
                    Link={PortalLink}
                    {...contactLink}
                  >
                    {chunks}
                  </Link>
                ),
              }}
            />
          </Paragraph>
        </section>
      )}
    </PageGrid>
  );
};

export default NoMatchPage;
