import { useIntl } from "react-intl";

const useActionLabels = () => {
  const intl = useIntl();

  return {
    today: intl.formatMessage({ id: "actionLabels.today" }),
    yesterday: intl.formatMessage({ id: "actionLabels.yesterday" }),
    before: intl.formatMessage({ id: "actionLabels.before" }),
    approachingDeadline: (daysDifference: number) =>
      intl.formatMessage(
        {
          id:
            daysDifference === 1
              ? "actionLabels.approachingDeadlineDay"
              : "actionLabels.approachingDeadlineDays",
        },
        { days: daysDifference },
      ),
  };
};

export default useActionLabels;
