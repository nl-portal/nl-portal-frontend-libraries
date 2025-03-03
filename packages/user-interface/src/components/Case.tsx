import { useIntl } from "react-intl";
import { Zaak } from "@nl-portal/nl-portal-api";
import { CaseCard } from "@gemeente-denhaag/card";
import PortalLink from "./PortalLink";
import { Action } from "@gemeente-denhaag/action";
import { useOutletContext } from "react-router";
import { RouterOutletContext } from "../interfaces/router-outlet-context";
import { useContext } from "react";
import {
  LocaleContext,
  useActionLabels,
} from "@nl-portal/nl-portal-localization";

interface Props {
  cs: Zaak;
  listView?: boolean;
}

const Case = ({ cs, listView }: Props) => {
  const intl = useIntl();
  const labels = useActionLabels();
  const { paths } = useOutletContext<RouterOutletContext>();
  const { currentLocale } = useContext(LocaleContext);
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
      date={cs.startdatum}
      locale={currentLocale}
      href={paths.case(cs.uuid)}
      Link={PortalLink}
    />
  );
};

export default Case;
