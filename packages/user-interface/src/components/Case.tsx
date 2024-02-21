import { useIntl } from "react-intl";
import { GetZakenQuery } from "@nl-portal/nl-portal-api";
import { CaseCard } from "@gemeente-denhaag/card";
import PortalLink from "./PortalLink";

interface Props {
  cs: GetZakenQuery["getZaken"][0];
}

const Case = ({ cs }: Props) => {
  const intl = useIntl();
  const getCaseUrl = (id: string) => `/zaken/zaak?id=${id}`;

  return (
    <CaseCard
      title={intl.formatMessage({
        id: `case.${cs.zaaktype.identificatie}.title`,
      })}
      subTitle={cs.omschrijving}
      date={new Date(cs.startdatum)}
      href={getCaseUrl(cs.uuid)}
      Link={PortalLink}
    />
  );
};

export default Case;
