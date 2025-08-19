import { ActionSingle } from "@gemeente-denhaag/action";
import { useActionLabels } from "@nl-portal/nl-portal-localization";
import { useIntl } from "react-intl";
import SectionHeader from "./SectionHeader";
import Skeleton from "react-loading-skeleton";
import PortalLink from "./PortalLink";

interface Props {
  loading: boolean;
  titleTranslationId?: string | null;
  decisions?: {
    type: {
      value: string;
    };
    action: {
      value: string;
    };
    text: {
      value: string;
    };
  }[];
}

const DecisionsList = ({
  loading,
  titleTranslationId = "decisionsList.title",
  decisions,
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
        <Skeleton height={60} />
        <Skeleton height={60} />
        <Skeleton height={60} />
      </section>
    );
  }

  if (!decisions || decisions.length === 0) {
    return null;
  }

  return (
    <section>
      <SectionHeader title={title} />
      {decisions.map((decision) => {
        if (decision.type.value === "LINK" || decision.type.value === "INTERN")
          return (
            <ActionSingle
              key={decision.action.value}
              labels={labels}
              link={decision.action.value}
              Link={PortalLink}
            >
              {decision.text.value}
            </ActionSingle>
          );
      })}
    </section>
  );
};

export default DecisionsList;
