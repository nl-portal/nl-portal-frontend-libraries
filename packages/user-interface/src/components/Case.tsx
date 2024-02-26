import { useIntl } from "react-intl";
import { GetZakenQuery } from "@nl-portal/nl-portal-api";
import { CaseCard } from "@gemeente-denhaag/card";
import PortalLink from "./PortalLink";
import { Action } from "@gemeente-denhaag/action";
import useActionLabels from "../hooks/useActionLabels";

interface Props {
  cs: GetZakenQuery["getZaken"][0];
  listView?: boolean;
}

const Case = ({ cs, listView }: Props) => {
  const intl = useIntl();
  const labels = useActionLabels();
  const getCaseUrl = (id: string) => `/zaken/zaak?id=${id}`;
  const title = intl.formatMessage({
    id: `case.${cs.zaaktype.identificatie}.title`,
  });

  if (listView)
    return (
      <Action labels={labels} link={getCaseUrl(cs.uuid)} Link={PortalLink}>
        {title}
      </Action>
    );

  return (
    <CaseCard
      active={!cs.status?.statustype.isEindstatus}
      title={title}
      subTitle={cs.omschrijving}
      date={new Date(cs.startdatum)}
      href={getCaseUrl(cs.uuid)}
      Link={PortalLink}
    />
  );
};

export default Case;
