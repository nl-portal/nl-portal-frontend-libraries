import { useIntl } from "react-intl";
import Skeleton from "./Skeleton";
import SectionHeader from "./SectionHeader";
import { ActionSingle } from "@gemeente-denhaag/action";
import { useActionLabels } from "@nl-portal/nl-portal-localization";
import PortalLink from "./PortalLink";
import { listViewHeight } from "../constants/skeleton";

interface Props {
  loading?: boolean;
  titleTranslationId?: string | null;
  actions?: { title: string; href: string }[];
}

const ActionsList = ({
  loading,
  titleTranslationId = "actionList.title",
  actions,
}: Props) => {
  const intl = useIntl();
  const labels = useActionLabels();
  const title = titleTranslationId
    ? intl.formatMessage({ id: titleTranslationId })
    : undefined;

  if (loading) {
    return (
      <section>
        <SectionHeader title={title} />
        <Skeleton height={listViewHeight} />
        <Skeleton height={listViewHeight} />
        <Skeleton height={listViewHeight} />
      </section>
    );
  }

  if (!actions || actions.length === 0) {
    return null;
  }

  return (
    <section>
      <SectionHeader title={title} />
      {actions.map((action) => (
        <ActionSingle
          key={action.title}
          labels={labels}
          link={action.href}
          Link={PortalLink}
        >
          {action.title}
        </ActionSingle>
      ))}
    </section>
  );
};

export default ActionsList;
