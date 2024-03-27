import { useIntl } from "react-intl";
import { Zaak } from "@nl-portal/nl-portal-api";
import { CaseCard } from "@gemeente-denhaag/card";
import PortalLink from "./PortalLink";
import { Action } from "@gemeente-denhaag/action";
import useActionLabels from "../hooks/useActionLabels";
import { useOutletContext } from "react-router-dom";
import { RouterOutletContext } from "../contexts/RouterOutletContext";

interface Props {
  cs: Zaak;
  listView?: boolean;
}

const Case = ({ cs, listView }: Props) => {
  const intl = useIntl();
  const labels = useActionLabels();
  const { paths } = useOutletContext<RouterOutletContext>();
  const title = intl.formatMessage({
    id: `case.${cs.zaaktype.identificatie}.title`,
  });

  if (listView)
    return (
      <Action labels={labels} link={paths.case(cs.uuid)} Link={PortalLink}>
        {title}
      </Action>
    );

  return (
    <CaseCard
      active={!cs.status?.statustype.isEindstatus}
      title={title}
      subTitle={cs.omschrijving}
      date={new Date(cs.startdatum)}
      href={paths.case(cs.uuid)}
      Link={PortalLink}
    />
  );
};

export default Case;
