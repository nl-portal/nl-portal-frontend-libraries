import { FormattedMessage, useIntl } from "react-intl";
import { Paragraph } from "@gemeente-denhaag/components-react";

const OfflinePage = () => {
  const intl = useIntl();

  return (
    <section>
      <Paragraph>
        <FormattedMessage
          id="offline.warning"
          values={{
            applicationName: intl.formatMessage({ id: "app.appName" }),
          }}
        />
      </Paragraph>
    </section>
  );
};
export { OfflinePage };
