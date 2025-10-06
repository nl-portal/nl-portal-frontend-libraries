import { useIntl } from "react-intl";
import { Zaak } from "@nl-portal/nl-portal-api";
import { CaseCard } from "@gemeente-denhaag/card";
import PortalLink from "./PortalLink";
import { useOutletContext } from "react-router";
import { RouterOutletContext } from "../interfaces/router-outlet-context";

interface Props {
  cs: Zaak;
  listView?: boolean;
}

const Case = ({ cs, listView }: Props) => {
  const intl = useIntl();
  const { paths } = useOutletContext<RouterOutletContext>();
  const title = intl.formatMessage({
    id: `case.${cs.zaaktype.identificatie}.title`,
    defaultMessage: cs.zaaktype.omschrijvingGeneriek || "",
  });
  const appearance = listView
    ? "list"
    : cs.status?.statustype.isEindstatus
      ? "archived"
      : "default";

  return (
    <CaseCard
      appearance={appearance}
      title={title}
      subTitle={cs.omschrijving}
      href={paths.case(cs.uuid)}
      Link={PortalLink}
      context={cs.identificatie}
    />
  );
};

export default Case;
